import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const path = req.nextUrl.pathname;

  if (
    userId &&
    path !== "/banned" &&
    !path.startsWith("/api/auth/banned")
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

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
