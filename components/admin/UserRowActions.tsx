"use client";

import { useActionState } from "react";

import {
  type AdminActionState,
  banSiteUser,
  removeUserFromSite,
  unbanSiteUser,
} from "@/lib/admin/actions";
import type { SiteUserRow } from "@/lib/admin/types";
import type { StaffRole } from "@/lib/admin/types";

import { AdminFormMessage } from "./AdminFormMessage";

const initial: AdminActionState = {};

type Props = {
  user: SiteUserRow;
  viewerRole: StaffRole;
};

export function UserRowActions({ user, viewerRole }: Props) {
  const [banState, banAction, banPending] = useActionState(banSiteUser, initial);
  const [unbanState, unbanAction, unbanPending] = useActionState(
    unbanSiteUser,
    initial,
  );
  const [removeState, removeAction, removePending] = useActionState(
    removeUserFromSite,
    initial,
  );

  const feedback = banState.error || banState.success
    ? banState
    : unbanState.error || unbanState.success
      ? unbanState
      : removeState;

  if (user.is_staff) {
    return (
      <span className="text-xs text-slate-400">Team member — manage in Team</span>
    );
  }

  const canBan = viewerRole === "admin" || viewerRole === "manager";
  const canRemove = viewerRole === "admin";

  return (
    <div className="flex flex-col items-end gap-2">
      {feedback.error || feedback.success ? (
        <AdminFormMessage state={feedback} />
      ) : null}

      {user.is_banned ? (
        canBan ? (
          <form action={unbanAction}>
            <input type="hidden" name="clerk_user_id" value={user.clerk_user_id} />
            <button
              type="submit"
              disabled={unbanPending}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              {unbanPending ? "…" : "Unban"}
            </button>
          </form>
        ) : (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">
            Banned
          </span>
        )
      ) : canBan ? (
        <form
          action={banAction}
          onSubmit={(e) => {
            if (
              !confirm(
                "Ban this user? Their jobs and reviews will be removed and they cannot sign in.",
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="clerk_user_id" value={user.clerk_user_id} />
          <button
            type="submit"
            disabled={banPending}
            className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-50"
          >
            {banPending ? "…" : "Ban"}
          </button>
        </form>
      ) : null}

      {canRemove && !user.is_banned ? (
        <form
          action={removeAction}
          onSubmit={(e) => {
            if (
              !confirm(
                "Permanently remove this user from the website? Their Clerk account will be deleted.",
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="clerk_user_id" value={user.clerk_user_id} />
          <button
            type="submit"
            disabled={removePending}
            className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
          >
            {removePending ? "…" : "Remove from site"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
