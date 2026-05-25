"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "rojgarsathi_saved_jobs";
const STORAGE_EVENT = "rojgarsathi_saved_jobs_change";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function subscribeSaved(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function useSavedJobIds() {
  return useSyncExternalStore(subscribeSaved, readSaved, () => [] as string[]);
}

type Props = { jobId: string; className?: string };

export function JobSaveButton({ jobId, className = "" }: Props) {
  const savedIds = useSavedJobIds();
  const saved = savedIds.includes(jobId);

  function toggle() {
    const list = readSaved();
    const next = list.includes(jobId)
      ? list.filter((id) => id !== jobId)
      : [...list, jobId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 ${className}`}
    >
      {saved ? "Saved" : "Save job"}
    </button>
  );
}
