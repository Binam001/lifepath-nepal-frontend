import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PREFIX = "/api/v1/lifepath";

const normalize = (value: string) =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const ensureLeadingSlash = (value: string) =>
  value.startsWith("/") ? value : `/${value}`;

const stripPrefixFromBase = (base: string, prefix: string) => {
  const normalizedBase = normalize(base);
  const normalizedPrefix = normalize(prefix);

  if (normalizedBase.endsWith(normalizedPrefix)) {
    return normalizedBase.slice(0, -normalizedPrefix.length);
  }

  return normalizedBase;
};

const rawPrefix =
  process.env.NEXT_PUBLIC_API_PREFIX ||
  process.env.API_PREFIX ||
  DEFAULT_PREFIX;
const prefix = ensureLeadingSlash(rawPrefix);
const rawBase =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "";
const base = stripPrefixFromBase(rawBase, prefix);

const buildUrl = (path: string, search = "") => {
  if (!base) {
    throw new Error("Backend API base URL is not configured.");
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${normalizedPath}${search}`;
};

type ProxyMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function proxyToBackend(
  req: NextRequest,
  path: string,
  method: ProxyMethod,
  body?: BodyInit,
) {
  const recaptchaToken =
    req.headers.get("x-recaptcha-token") ??
    req.headers.get("X-Recaptcha-Token") ??
    "";

  const headers: Record<string, string> = {
    Accept: "application/json",
    cookie: req.headers.get("cookie") ?? "",
  };

  const isFormDataBody =
    typeof FormData !== "undefined" && body instanceof FormData;

  if (body !== undefined && !isFormDataBody) {
    headers["content-type"] =
      req.headers.get("content-type") ?? "application/json";
  }

  if (recaptchaToken) {
    headers["X-Recaptcha-Token"] = recaptchaToken;
  }

  const upstream = await fetch(buildUrl(path, req.nextUrl.search), {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const text = await upstream.text();
  const response = new NextResponse(text, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });

  const getSetCookie = (upstream.headers as Headers & {
    getSetCookie?: () => string[];
  }).getSetCookie;

  if (typeof getSetCookie === "function") {
    const cookies = getSetCookie.call(upstream.headers);
    for (const cookie of cookies) {
      response.headers.append("set-cookie", cookie);
    }
  } else {
    const setCookie = upstream.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }
  }

  return response;
}

export async function proxyJson(
  req: NextRequest,
  path: string,
  method: Exclude<ProxyMethod, "GET">,
) {
  const body = await req.text();
  return proxyToBackend(req, path, method, body);
}
