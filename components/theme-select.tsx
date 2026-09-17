"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
import { PiCaretDown } from "react-icons/pi";

type Theme = "light" | "dark" | "system";
const key = "volotech-theme";
function readTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : "system";
}
function subscribe(callback: () => void) {
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== key && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system";
    callback();
  };
  window.addEventListener("volotech-theme-change", callback);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener("volotech-theme-change", callback);
    window.removeEventListener("storage", syncStorage);
  };
}
export function ThemeSelect() {
  const id = useId();
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system" as Theme);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.setAttribute("content", dark ? "#151713" : "#f5f1e8"));
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [theme]);
  return <div className="theme-select">
    <label className="sr-only" htmlFor={id}>Color scheme</label>
    <select id={id} value={theme} onChange={event => {
      const value = event.target.value as Theme;
      document.documentElement.dataset.theme = value;
      try { localStorage.setItem(key, value); } catch { /* Keep the selection for this page if storage is unavailable. */ }
      window.dispatchEvent(new Event("volotech-theme-change"));
    }}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System default</option>
    </select>
    <PiCaretDown aria-hidden="true" />
  </div>;
}
