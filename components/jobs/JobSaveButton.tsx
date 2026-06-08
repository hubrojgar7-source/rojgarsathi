"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "rojgarsathi_saved_jobs";
const STORAGE_EVENT = "rojgarsathi_saved_jobs_change";

let snapshotRaw: string | null | undefined;
let snapshotCache: string[] = [];

function getSavedSnapshot(): string[] {
  if (typeof window === "undefined") return snapshotCache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === snapshotRaw) return snapshotCache;
    snapshotRaw = raw;
    snapshotCache = raw ? (JSON.parse(raw) as string[]) : [];
    return snapshotCache;
  } catch {
    snapshotRaw = null;
    snapshotCache = [];
    return snapshotCache;
  }
}

function invalidateSnapshot() {
  snapshotRaw = undefined;
}

function subscribeSaved(callback: () => void) {
  const onChange = () => {
    invalidateSnapshot();
    callback();
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(STORAGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(STORAGE_EVENT, onChange);
  };
}

function useSavedJobIds() {
  return useSyncExternalStore(
    subscribeSaved,
    getSavedSnapshot,
    () => snapshotCache,
  );
}

type Props = { jobId: string; className?: string };

export function JobSaveButton({ jobId, className = "" }: Props) {
  const savedIds = useSavedJobIds();
  const saved = savedIds.includes(jobId);

  function toggle() {
    const list = getSavedSnapshot();
    const next = list.includes(jobId)
      ? list.filter((id) => id !== jobId)
      : [...list, jobId];
    const raw = JSON.stringify(next);
    localStorage.setItem(STORAGE_KEY, raw);
    snapshotRaw = raw;
    snapshotCache = next;
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
