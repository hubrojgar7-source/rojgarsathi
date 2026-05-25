"use client";

import { useActionState } from "react";

import type { AdminActionState } from "@/lib/admin/actions";

const initial: AdminActionState = {};

type Props = {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  idField: string;
  id: string;
  label: string;
  confirmMessage: string;
};

export function AdminDeleteButton({
  action,
  idField,
  id,
  label,
  confirmMessage,
}: Props) {
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
      className="inline"
    >
      <input type="hidden" name={idField} value={id} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
      >
        {pending ? "…" : label}
      </button>
      {state.error ? (
        <span className="ml-2 text-xs text-red-600">{state.error}</span>
      ) : null}
    </form>
  );
}
