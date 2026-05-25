import { createClerkClient } from "@clerk/backend";

export function getClerkAdmin() {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing CLERK_SECRET_KEY");
  }
  return createClerkClient({ secretKey });
}

export async function findClerkUserByEmail(email: string) {
  const clerk = getClerkAdmin();
  const list = await clerk.users.getUserList({
    emailAddress: [email.toLowerCase()],
    limit: 5,
  });
  return list.data[0] ?? null;
}

export async function banClerkUser(userId: string) {
  const clerk = getClerkAdmin();
  await clerk.users.banUser(userId);
}

export async function unbanClerkUser(userId: string) {
  const clerk = getClerkAdmin();
  await clerk.users.unbanUser(userId);
}

export async function deleteClerkUser(userId: string) {
  const clerk = getClerkAdmin();
  await clerk.users.deleteUser(userId);
}
