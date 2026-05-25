"use client";

import { useActionState } from "react";

import { type AdminActionState, banUserByEmail } from "@/lib/admin/actions";

import { AdminFormMessage } from "./AdminFormMessage";

const initial: AdminActionState = {};

export function BanByEmailForm() {
  const [state, formAction, pending] = useActionState(banUserByEmail, initial);

  return (
    <form action={formAction} className="space-y-4">
      <AdminFormMessage state={state} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="text-sm font-medium text-slate-700">User email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="user@example.com"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="text-sm font-medium text-slate-700">Reason (optional)</span>
          <input
            type="text"
            name="reason"
            placeholder="Spam, abuse, etc."
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
      >
        {pending ? "Banning…" : "Ban by email"}
      </button>
    </form>
  );
}
