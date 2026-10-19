import { API_URL } from "../constants/api";

/**
 * True when the backend answers its health check quickly. The API runs on a free host that
 * sleeps when idle and takes up to a minute to wake; checking first lets the layout show a
 * wake-up screen instead of hanging the whole server render.
 */
export async function isBackendAwake(timeoutMs = 3500): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/`, {
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
    });
    return res.ok;
  } catch {
    return false;
  }
}
