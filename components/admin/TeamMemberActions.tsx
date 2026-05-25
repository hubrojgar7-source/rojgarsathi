"use client";

import { useActionState } from "react";

import {
  type AdminActionState,
  removeStaffMember,
  updateStaffMemberRole,
} from "@/lib/admin/actions";
import type { StaffRow } from "@/lib/admin/types";

import { AdminFormMessage } from "./AdminFormMessage";

const initial: AdminActionState = {};

type Props = {
  member: StaffRow;
  currentStaffId: string;
};

export function TeamMemberActions({ member, currentStaffId }: Props) {
  const [roleState, roleAction, rolePending] = useActionState(
    updateStaffMemberRole,
    initial,
  );
  const [removeState, removeAction, removePending] = useActionState(
    removeStaffMember,
    initial,
  );

  const isSelf = member.id === currentStaffId;

  return (
    <div className="flex flex-col items-end gap-2">
      <AdminFormMessage state={roleState.error || roleState.success ? roleState : removeState} />

      <form action={roleAction} className="flex flex-wrap items-center justify-end gap-2">
        <input type="hidden" name="staff_id" value={member.id} />
        <select
          name="role"
          defaultValue={member.role}
          disabled={isSelf || rolePending}
          className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>
        <button
          type="submit"
          disabled={isSelf || rolePending}
          className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
        >
          {rolePending ? "…" : "Update role"}
        </button>
      </form>

      <form
        action={removeAction}
        onSubmit={(e) => {
          if (!confirm(`Remove ${member.email} from the team?`)) e.preventDefault();
        }}
      >
        <input type="hidden" name="staff_id" value={member.id} />
        <button
          type="submit"
          disabled={isSelf || removePending}
          className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
        >
          {removePending ? "…" : "Remove"}
        </button>
      </form>

    </div>
  );
}
