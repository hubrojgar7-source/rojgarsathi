/** Line-art category icons (24×24, stroke) — use with currentColor */

import type { ComponentType } from "react";

import type { CategoryIconKey } from "@/lib/jobs/categories";

export function IconCatUiUx({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" />
      <rect x="3" y="13" width="18" height="8" rx="1.5" stroke="currentColor" />
      <circle cx="8" cy="7" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCatCode({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 9 4 12l4 3M16 9l4 3-4 3" stroke="currentColor" />
      <path d="m14 6-4 12" stroke="currentColor" />
    </svg>
  );
}

export function IconCatBank({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10h18L12 4 3 10Z" stroke="currentColor" />
      <path d="M5 10v9M9 10v9M15 10v9M19 10v9" stroke="currentColor" />
      <path d="M3 21h18" stroke="currentColor" />
      <path d="M12 4v2" stroke="currentColor" />
    </svg>
  );
}

export function IconCatHealth({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" />
    </svg>
  );
}

export function IconCatWriting({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3h4v4" stroke="currentColor" />
      <path d="M6 18 18 6l4 4L10 22H6v-4Z" stroke="currentColor" />
      <path d="M9 15 6 18" stroke="currentColor" />
    </svg>
  );
}

export function IconCatMarketing({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11v4l2 2h0l2-2v-4" stroke="currentColor" />
      <path d="M6 13h4" stroke="currentColor" />
      <path d="M18 4c0 4-2 6-6 8l-2 1" stroke="currentColor" />
      <path d="M14 4h4v4" stroke="currentColor" />
    </svg>
  );
}

export function IconCatSecurity({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" />
    </svg>
  );
}

export function IconCatVideo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="15" height="14" rx="2" stroke="currentColor" />
      <path d="m17 10 5-3v10l-5-3" stroke="currentColor" />
    </svg>
  );
}

export function IconCatSales({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" stroke="currentColor" />
      <path d="M7 15 11 11l4 4 5-6" stroke="currentColor" />
      <circle cx="7" cy="15" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="11" cy="11" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="20" cy="9" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCatHotel({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h16v10H4zM8 10V6h8v4" stroke="currentColor" />
      <path d="M9 14h2M13 14h2M9 17h6" stroke="currentColor" />
    </svg>
  );
}

export function IconCatTeacher({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" />
      <path d="M6 10v5c0 2 2.5 4 6 4s6-2 6-4v-5" stroke="currentColor" />
    </svg>
  );
}

export function IconCatDriver({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14l-1-5H6l-1 5Z" stroke="currentColor" />
      <circle cx="7.5" cy="17" r="1.5" stroke="currentColor" />
      <circle cx="16.5" cy="17" r="1.5" stroke="currentColor" />
      <path d="M6 12h12l1-4H5l1 4Z" stroke="currentColor" />
    </svg>
  );
}

export function IconCatConstruction({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V9l7-5 7 5v12" stroke="currentColor" />
      <path d="M9 13h6v8H9z" stroke="currentColor" />
    </svg>
  );
}

export function IconCatOffice({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" />
      <path d="M7 8h4M7 12h10M7 16h6" stroke="currentColor" />
    </svg>
  );
}

export function IconCatFactory({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M6 20V10l4-2v12M14 20V6l4-2v16" stroke="currentColor" />
      <path d="M10 8h1M18 4h1" stroke="currentColor" />
    </svg>
  );
}

export function IconCatSupport({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 18a6 6 0 100-12 6 6 0 000 12Z" stroke="currentColor" />
      <path d="M12 14v-2M12 10h.01" stroke="currentColor" />
    </svg>
  );
}

export function IconCatBeauty({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-2 3-6 4-6 9a6 6 0 1012 0c0-5-4-6-6-9Z" stroke="currentColor" />
    </svg>
  );
}

export function IconCatFarm({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16M6 20V10l6-4 6 4v10" stroke="currentColor" />
      <path d="M9 14h6v6H9z" stroke="currentColor" />
    </svg>
  );
}

export function IconCatCleaning({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M8 7h8l-1 14H9L8 7Z" stroke="currentColor" />
      <path d="M10 11h4" stroke="currentColor" />
    </svg>
  );
}

export function IconCatWarehouse({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-5 9 5v11H3V9Z" stroke="currentColor" />
      <path d="M9 14h6v6H9z" stroke="currentColor" />
    </svg>
  );
}

export function IconCatEngineering({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" stroke="currentColor" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" />
    </svg>
  );
}

export function IconCatGovernment({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V9l7-4 7 4v12" stroke="currentColor" />
      <path d="M9 13h2v8H9zM13 13h2v8h-2z" stroke="currentColor" />
    </svg>
  );
}

export function IconCatRealEstate({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11 12 4l9 7v9H3v-9Z" stroke="currentColor" />
      <path d="M9 20v-6h6v6" stroke="currentColor" />
    </svg>
  );
}

export function IconCatLabor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4h4v4M10 20H6v-4M20 8l-8 8M6 6l4 4" stroke="currentColor" />
    </svg>
  );
}

const CATEGORY_ICON_MAP: Record<
  CategoryIconKey,
  ComponentType<{ className?: string }>
> = {
  hotel: IconCatHotel,
  teacher: IconCatTeacher,
  driver: IconCatDriver,
  tech: IconCatCode,
  bank: IconCatBank,
  health: IconCatHealth,
  sales: IconCatSales,
  hr: IconCatCode,
  marketing: IconCatMarketing,
  construction: IconCatConstruction,
  factory: IconCatFactory,
  office: IconCatOffice,
  guard: IconCatSecurity,
  support: IconCatSupport,
  beauty: IconCatBeauty,
  farm: IconCatFarm,
  cleaning: IconCatCleaning,
  warehouse: IconCatWarehouse,
  engineering: IconCatEngineering,
  design: IconCatUiUx,
  media: IconCatVideo,
  government: IconCatGovernment,
  realestate: IconCatRealEstate,
  labor: IconCatLabor,
};

export function getCategoryIcon(icon: CategoryIconKey) {
  return CATEGORY_ICON_MAP[icon] ?? IconCatCode;
}
