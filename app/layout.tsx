import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { hasClerkPublishableKey } from "@/lib/supabase/env";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rojgar Sathi — Discover Your Dream Job",
  description:
    "Explore opportunities, connect with employers, and grow your career with Rojgar Sathi.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const app =
    hasClerkPublishableKey() && clerkKey ? (
      <ClerkProvider publishableKey={clerkKey}>{children}</ClerkProvider>
    ) : (
      children
    );

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{app}</body>
    </html>
  );
}
