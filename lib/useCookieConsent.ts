"use client";

import { useSyncExternalStore } from "react";

const COOKIE_KEY = "kale-kilit-cookie-consent";
const CONSENT_EVENT = "kale-cookie-accepted";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(COOKIE_KEY) !== null;
  } catch {
    return false;
  }
}

/** Matches the pre-hydration default: assume consent so nothing flashes on first paint. */
function getServerSnapshot() {
  return true;
}

/** Reads cookie-consent state without setState-in-effect (see react-hooks/set-state-in-effect). */
export function useHasCookieConsent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
