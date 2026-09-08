"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const storageKey = "volo-ai-theme:v1";
const themeEvent = "volo-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(themeEvent, callback);
  return () => window.removeEventListener(themeEvent, callback);
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#090d16" : "#f7f8fb");
    localStorage.setItem(storageKey, next);
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`} aria-pressed={theme === "dark"}>
      <svg className="sun-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" /></svg>
      <svg className="moon-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.5A8 8 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" /></svg>
    </button>
  );
}
