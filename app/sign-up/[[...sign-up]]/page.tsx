import { SignUp } from "@clerk/nextjs";

import { Logo } from "@/components/Logo";

export default function SignUpPage() {
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
