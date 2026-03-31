import type { NextRequest } from "next/server";

const DEFAULT_API_PREFIX = "/api/v1/lifepath";

const trimTrailingSlash = (value: string) =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const normalizePrefix = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_API_PREFIX;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const stripPrefixFromBase = (base: string, prefix: string) => {
  const normalizedBase = trimTrailingSlash(base);
  const normalizedPrefix = trimTrailingSlash(prefix);

  if (normalizedBase.endsWith(normalizedPrefix)) {
    return normalizedBase.slice(0, -normalizedPrefix.length);
  }

  return normalizedBase;
};

const API_PREFIX = normalizePrefix(
  process.env.NEXT_PUBLIC_API_PREFIX ||
    process.env.API_PREFIX ||
    DEFAULT_API_PREFIX,
);

const rawBase =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "";

function buildTargetUrl(path: string[], request: NextRequest) {
  if (!rawBase) {
    throw new Error("BACKEND_API_URL is not configured.");
  }

  const baseUrl = stripPrefixFromBase(rawBase, API_PREFIX);
  const targetUrl = new URL(
    `${trimTrailingSlash(baseUrl)}${API_PREFIX}/${path.join("/")}`,
  );

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  return targetUrl;
}

function buildHeaders(request: NextRequest) {
  const headers = new Headers(request.headers);

  // Strip hop-by-hop and origin-specific headers before forwarding upstream.
  headers.delete("host");
  headers.delete("origin");
  headers.delete("referer");
  headers.delete("content-length");
  headers.delete("x-forwarded-for");
  headers.delete("x-forwarded-host");
  headers.delete("x-forwarded-port");
  headers.delete("x-forwarded-proto");

  return headers;
}

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  // This catch-all route mirrors the incoming request to BACKEND_API_URL while
  // preserving method, query string, headers, and request body.
  const targetUrl = buildTargetUrl(path, request);
  const method = request.method;
  const headers = buildHeaders(request);

  const init: RequestInit = {
    method,
    headers,
    redirect: "manual",
  };

  if (method !== "GET" && method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(targetUrl, init);
  const responseHeaders = new Headers(response.headers);

  responseHeaders.delete("content-encoding");
  responseHeaders.delete("transfer-encoding");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function OPTIONS(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}
