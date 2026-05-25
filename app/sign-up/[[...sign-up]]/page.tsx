import { SignUp } from "@clerk/nextjs";

import { AuthConfigFallback } from "@/components/auth/AuthConfigFallback";
import { Logo } from "@/components/Logo";
import { hasClerkPublishableKey } from "@/lib/supabase/env";

export default function SignUpPage() {
  if (!hasClerkPublishableKey()) {
    return (
      <AuthConfigFallback
        title="Sign-up unavailable"
        description="Authentication is not configured yet. Add Clerk environment variables in Vercel (or .env.local locally), then redeploy."
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <Logo href="/" size="xl" className="mb-8 h-24 w-24" />
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}
