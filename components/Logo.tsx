import Image from "next/image";
import Link from "next/link";

const sizes = {
  xs: { width: 32, height: 32, className: "h-8 w-8" },
  sm: { width: 40, height: 40, className: "h-10 w-10" },
  md: { width: 48, height: 48, className: "h-12 w-12" },
  lg: { width: 64, height: 64, className: "h-16 w-16" },
  xl: { width: 88, height: 88, className: "h-[5.5rem] w-[5.5rem]" },
} as const;

type LogoSize = keyof typeof sizes;

type LogoProps = {
  href?: string;
  size?: LogoSize;
  /** Logo + "ROJGAR SATHI" wordmark (navbar style). */
  showLabel?: boolean;
  tagline?: string;
  className?: string;
  priority?: boolean;
};

export function Logo({
  href = "/",
  size = "md",
  showLabel = false,
  tagline = "Dream big!",
  className = "",
  priority = false,
}: LogoProps) {
  const dim = sizes[size];

  const mark = (
    <Image
      src="/logo.png"
      alt={showLabel ? "" : "Rojgar Sathi — रोजगार साथी"}
      width={dim.width}
      height={dim.height}
      className={`shrink-0 object-contain ${showLabel ? (className || "h-11 w-11 sm:h-12 sm:w-12") : `${dim.className} ${className}`}`}
      priority={priority}
      aria-hidden={showLabel}
    />
  );

  const content = showLabel ? (
    <span className="inline-flex min-w-0 items-center gap-2 sm:gap-3">
      {mark}
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-sm font-extrabold tracking-wide text-slate-800 sm:text-base lg:text-lg">
          ROJGAR SATHI
        </span>
        {tagline ? (
          <span className="hidden text-[10px] font-bold uppercase tracking-wider text-blue-500 sm:block sm:text-xs">
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  ) : (
    mark
  );

  if (!href) {
    return <span className="inline-flex shrink-0 items-center">{content}</span>;
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center rounded-lg outline-offset-2 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-blue-500"
    >
      {content}
    </Link>
  );
}
