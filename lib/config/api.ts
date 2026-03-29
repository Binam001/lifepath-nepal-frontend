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

const rawBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BACKEND_API_URL ||
  "";

export const API_PREFIX = normalizePrefix(
  process.env.NEXT_PUBLIC_API_PREFIX || DEFAULT_API_PREFIX,
);

export const API_BASE_URL = rawBase
  ? stripPrefixFromBase(rawBase, API_PREFIX)
  : "";
export const DIRECT_API_URL = API_BASE_URL
  ? `${API_BASE_URL}${API_PREFIX}`
  : "";

// Browser-side proxy config is retained as a reference path for environments
// where the frontend and API are served from the same origin again.
const DEFAULT_BROWSER_API_PROXY_PREFIX = "/api";
const shouldUseBrowserProxy = () => {
  if (typeof window === "undefined") return false;

  const explicit = process.env.NEXT_PUBLIC_USE_API_PROXY;
  if (explicit === "true") return true;
  if (explicit === "false") return false;

  return process.env.NODE_ENV === "development";
};
export const BROWSER_API_PROXY_PREFIX = normalizePrefix(
  process.env.NEXT_PUBLIC_BROWSER_API_PREFIX ||
    DEFAULT_BROWSER_API_PROXY_PREFIX,
);
export const USE_BROWSER_PROXY = shouldUseBrowserProxy();

export const API_URL = DIRECT_API_URL;
export const EVENT_REGISTRATION_ENDPOINT = "/event/create";
export const CONTACT_CREATE_ENDPOINT = "/contact/create";
