import Link from "next/link";
import type { ReactNode } from "react";

import { IconFacebook, IconTikTok } from "@/components/icons/SocialIcons";
import { Logo } from "@/components/Logo";
import {
  SITE_FACEBOOK_URL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_TIKTOK_URL,
} from "@/lib/site/contact";

const columns = [
  {
    title: "About Us",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Find Jobs", href: "/#categories" },
      { label: "Contact", href: `tel:${SITE_PHONE_TEL}` },
    ],
  },
  {
    title: "Job Seekers",
    links: [
      { label: "Browse Jobs", href: "/#categories" },
      { label: "Build CV", href: "#" },
      { label: "Career Advice", href: "#" },
      { label: "Salary Guide", href: "#" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Job", href: "/post-job" },
      { label: "Pricing", href: "#" },
      { label: "Enterprise", href: "#" },
      { label: "Support", href: `tel:${SITE_PHONE_TEL}` },
    ],
  },
];

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-slate-600 bg-slate-800/50 text-slate-200 transition-colors hover:border-blue-400 hover:bg-slate-800 hover:text-white"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_2fr_1fr]">
          <div>
            <Logo href="/" size="lg" className="h-14 w-14" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Rojgar Sathi is a job agency that connects people with real
              opportunities and helps employers hire with confidence.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              <span className="font-medium text-slate-300">Call us: </span>
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="font-semibold text-white hover:text-blue-300"
              >
                {SITE_PHONE_DISPLAY}
              </a>
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink href={SITE_FACEBOOK_URL} label="Facebook">
                <IconFacebook className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={SITE_TIKTOK_URL} label="TikTok">
                <IconTikTok className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          <div className="grid gap-8 sm:col-span-2 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-white">{col.title}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="hover:text-white">
                        {l.label}
                        {l.label === "Contact" ? ` · ${SITE_PHONE_DISPLAY}` : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Follow us</p>
            <div className="mt-4 flex items-center gap-3">
              <SocialLink href={SITE_FACEBOOK_URL} label="Facebook">
                <IconFacebook className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={SITE_TIKTOK_URL} label="TikTok">
                <IconTikTok className="h-5 w-5" />
              </SocialLink>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="font-medium text-white hover:text-blue-300"
              >
                {SITE_PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()}. All Rights Reserved Rojgar Sathi.
        </div>
      </div>
    </footer>
  );
}
