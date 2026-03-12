"use client";

import { useEffect, useState } from "react";
import CommandPalette from "@/components/CommandPalette";
import type { SearchItem } from "@/lib/search-index";

type ControlsProps = {
  searchItems: SearchItem[];
};

function getInitialScale() {
  if (typeof window === "undefined") {
    return 1;
  }

  const storedScale = Number(window.localStorage.getItem("fontScale") ?? "1");
  if (Number.isFinite(storedScale) && storedScale >= 0.9 && storedScale <= 1.2) {
    return storedScale;
  }

  return 1;
}

function getInitialNightShift() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem("nightShift") === "1";
}

const Controls = ({ searchItems }: ControlsProps) => {
  const [fontScale, setFontScale] = useState(getInitialScale);
  const [nightShift, setNightShift] = useState(getInitialNightShift);

  useEffect(() => {
    document.documentElement.style.setProperty("--reader-font-scale", fontScale.toString());
    window.localStorage.setItem("fontScale", fontScale.toString());
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("night-shift", nightShift);
    window.localStorage.setItem("nightShift", nightShift ? "1" : "0");
  }, [nightShift]);

  const updateScale = (next: number) => {
    const normalized = Math.min(1.2, Math.max(0.9, Number(next.toFixed(2))));
    setFontScale(normalized);
  };

  return (
    <div className="flex items-center gap-3 text-zinc-400 text-sm font-sans">
      <button onClick={() => updateScale(fontScale - 0.05)} className="hover:text-green-400" aria-label="Decrease text size">
        A-
      </button>
      <button onClick={() => updateScale(fontScale + 0.05)} className="hover:text-green-400" aria-label="Increase text size">
        A+
      </button>
      <button onClick={() => setNightShift((prev) => !prev)} className="hover:text-green-400" aria-label="Toggle night shift contrast">
        {nightShift ? "☀" : "☾"}
      </button>
      <CommandPalette items={searchItems} />
    </div>
  );
};

export default Controls;
