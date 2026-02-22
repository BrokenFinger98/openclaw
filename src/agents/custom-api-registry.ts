import type { StreamFn } from "@mariozechner/pi-agent-core";
import { getApiProvider, registerApiProvider } from "@mariozechner/pi-ai";

/**
 * Ensure a custom (non-built-in) API type is registered in the SDK's global
 * API provider registry so that `completeSimple()` — used by compaction,
 * TTS summarization, and branch summarization — can resolve it.
 *
 * No-op when the API type is already known to the registry.  This is
 * provider-agnostic: any non-built-in API type can be registered through
 * the same path.
 */
export function ensureCustomApiRegistered(api: string, streamFn: StreamFn): void {
  // getApiProvider is typed for the built-in Api union; cast to accept
  // custom strings that are not part of the union.
  if ((getApiProvider as (api: string) => unknown)(api)) {
    return;
  }
  (registerApiProvider as (p: { api: string; stream: StreamFn; streamSimple: StreamFn }) => void)({
    api,
    stream: streamFn,
    streamSimple: streamFn,
  });
}
