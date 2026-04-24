"use client";

import { useEffect, useState } from "react";

type ViewMode = "agent" | "human";

const STORAGE_KEY = "ai-future-ready:view-mode";

function isViewMode(value: string | null): value is ViewMode {
  return value === "agent" || value === "human";
}

function applyViewMode(mode: ViewMode) {
  document.documentElement.dataset.viewMode = mode;
}

function updateModeQuery(mode: ViewMode) {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

export default function ModeToggle() {
  const [mode, setMode] = useState<ViewMode>("agent");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryMode = params.get("mode");
    const storedMode = window.localStorage.getItem(STORAGE_KEY);
    const initialMode = isViewMode(queryMode)
      ? queryMode
      : isViewMode(storedMode)
        ? storedMode
        : "agent";

    applyViewMode(initialMode);
    window.localStorage.setItem(STORAGE_KEY, initialMode);

    const frame = window.requestAnimationFrame(() => setMode(initialMode));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function chooseMode(nextMode: ViewMode) {
    setMode(nextMode);
    applyViewMode(nextMode);
    window.localStorage.setItem(STORAGE_KEY, nextMode);
    updateModeQuery(nextMode);
  }

  return (
    <div className="mode-toggle" aria-label="View mode">
      <span className="mode-label">
        <span className="agent-label">view: </span>
        <span className="human-label">Mode</span>
      </span>
      <span className="mode-option">
        [
        <button
          type="button"
          className="mode-button"
          aria-pressed={mode === "agent"}
          onClick={() => chooseMode("agent")}
        >
          agent
        </button>
        ]
      </span>{" "}
      <span className="mode-option">
        [
        <button
          type="button"
          className="mode-button"
          aria-pressed={mode === "human"}
          onClick={() => chooseMode("human")}
        >
          human
        </button>
        ]
      </span>
    </div>
  );
}
