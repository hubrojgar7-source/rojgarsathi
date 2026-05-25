import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { isClerkConfigured } from "@/lib/supabase/env";

const hasClerkKeys = isClerkConfigured();

const clerkProxy = clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // Avoid recursive proxy invocation when checking ban status
  if (path.startsWith("/api/auth/banned")) {
    return NextResponse.next();
  }

  const { userId } = await auth();

  if (
    userId &&
    path !== "/banned" &&
    !path.startsWith("/api/")
  ) {
    const checkUrl = new URL("/api/auth/banned", req.url);
    try {
      const res = await fetch(checkUrl, {
        headers: { cookie: req.headers.get("cookie") ?? "" },
      });
      if (res.ok) {
        const { banned } = (await res.json()) as { banned?: boolean };
        if (banned) {
          return NextResponse.redirect(new URL("/banned", req.url));
        }
      }
    } catch {
      /* allow request if check fails */
    }
  }
});

/** Next.js 16+ proxy (replaces deprecated middleware.ts). */
export default hasClerkKeys
  ? clerkProxy
  : function proxy() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
