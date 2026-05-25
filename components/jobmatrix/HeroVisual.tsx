import Image from "next/image";

type HeroVisualProps = {
  /** Tall mobile column beside heading + copy */
  compact?: boolean;
};

export function HeroVisual({ compact = false }: HeroVisualProps) {
  if (compact) {
    return (
      <div
        className="relative h-full min-h-[240px] w-full sm:min-h-[270px]"
        aria-hidden
      >
        <Image
          src="/founder.png"
          alt=""
          priority
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 46vw, 220px"
        />
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto flex w-full max-w-[min(100%,340px)] items-end justify-center sm:max-w-[380px] lg:max-w-[420px]"
      aria-hidden
    >
      <div className="pointer-events-none absolute -left-8 top-8 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-6 bottom-12 h-56 w-56 rounded-full bg-sky-300/25 blur-3xl" />

      <Image
        src="/founder.png"
        alt="Rojgar Sathi founder"
        width={1000}
        height={1000}
        priority
        className="block h-auto w-full max-h-[min(72vw,420px)] object-contain object-bottom sm:max-h-[460px] lg:max-h-[500px]"
        sizes="(max-width: 1024px) 85vw, 420px"
      />
    </div>
  );
}
