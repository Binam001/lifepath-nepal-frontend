import type { NextRequest } from "next/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

function buildTargetUrl(path: string[], request: NextRequest) {
  if (!BACKEND_API_URL) {
    throw new Error("BACKEND_API_URL is not configured.");
  }

  const baseUrl = BACKEND_API_URL.endsWith("/")
    ? BACKEND_API_URL.slice(0, -1)
    : BACKEND_API_URL;
  const targetUrl = new URL(`${baseUrl}/${path.join("/")}`);

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
