import type { StaffRole } from "./types";

export function canManageTeam(role: StaffRole): boolean {
  return role === "admin";
}

export function canRemoveUserFromSite(role: StaffRole): boolean {
  return role === "admin";
}

export function canBanUsers(role: StaffRole): boolean {
  return role === "admin" || role === "manager";
}

export function roleLabel(role: StaffRole): string {
  return role === "admin" ? "Admin" : "Manager";
}
