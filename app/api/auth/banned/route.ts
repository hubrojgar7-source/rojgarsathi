import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { isUserBanned } from "@/lib/admin/users-queries";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ banned: false });
  }

  const banned = await isUserBanned(userId);
  return NextResponse.json({ banned });
}
