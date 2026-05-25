"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rojgarsathi_saved_jobs";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

type Props = { jobId: string; className?: string };

export function JobSaveButton({ jobId, className = "" }: Props) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(jobId));
    setReady(true);
  }, [jobId]);

  function toggle() {
    const list = readSaved();
    const next = list.includes(jobId)
      ? list.filter((id) => id !== jobId)
      : [...list, jobId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next.includes(jobId));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-60 ${className}`}
    >
      {saved ? "Saved" : "Save job"}
    </button>
  );
}
