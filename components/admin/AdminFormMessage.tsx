"use client";

import type { AdminActionState } from "@/lib/admin/actions";

export function AdminFormMessage({ state }: { state: AdminActionState }) {
  if (state.error) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        {state.error}
      </p>
    );
  }
  if (state.success) {
    return (
      <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
        {state.message ?? "Saved."}
      </p>
    );
  }
  return null;
}
