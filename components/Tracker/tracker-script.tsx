/**
 * tracker-script.ts
 * Add this to your lifepathnepal.com frontend (Next.js layout or _app)
 *
 * Required env var in lifepathnepal.com .env:
 *   BACKEND_API_URL=https://api.lifepathnepal.com/api/v1/lifepath
 *   NEXT_PUBLIC_HEARTBEAT_INTERVAL=30000
 */

const API_PROXY_PATH = "/backend";
const HEARTBEAT_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_HEARTBEAT_INTERVAL ?? "30000",
  10
);

function initTracker(): void {
  // Only run in browser
  if (typeof window === "undefined") return;

  // Generate or retrieve a persistent session ID
  let sessionId = sessionStorage.getItem("_lp_sid");
  if (!sessionId) {
    sessionId =
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("_lp_sid", sessionId);
  }

  function sendHeartbeat(): void {
    fetch(`${API_PROXY_PATH}/api/track/heartbeat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        page: window.location.pathname,
      }),
      keepalive: true,
    }).catch(() => {}); // silent fail — never block the user
  }

  // Send immediately on load
  sendHeartbeat();

  // Then on interval
  setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);

  // Update page on Next.js route change (pushState)
  const _pushState = history.pushState.bind(history);
  history.pushState = function (
    ...args: Parameters<typeof history.pushState>
  ): void {
    _pushState(...args);
    setTimeout(sendHeartbeat, 100);
  };

  window.addEventListener("popstate", sendHeartbeat);
}

export default initTracker;
