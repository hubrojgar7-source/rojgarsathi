"use client";

import { useActionState } from "react";

import {
  type AdminActionState,
  inviteStaffMember,
} from "@/lib/admin/actions";

import { AdminFormMessage } from "./AdminFormMessage";

const initial: AdminActionState = {};

export function InviteStaffForm() {
  const [state, formAction, pending] = useActionState(inviteStaffMember, initial);

  return (
    <form action={formAction} className="space-y-4">
      <AdminFormMessage state={state} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email address</span>
          <input
            type="email"
            name="email"
            required
            placeholder="colleague@example.com"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Role</span>
          <select
            name="role"
            defaultValue="manager"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="manager">Manager — jobs, reviews, ban users</option>
            <option value="admin">Admin — full access including team</option>
          </select>
        </label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Adding…" : "Add to team"}
      </button>
    </form>
  );
}
