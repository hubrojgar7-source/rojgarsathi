export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Client + ClerkProvider — publishable key only. */
export function hasClerkPublishableKey(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

/** Server proxy / API — needs secret key too. */
export function isClerkConfigured(): boolean {
  return hasClerkPublishableKey() && Boolean(process.env.CLERK_SECRET_KEY);
}
