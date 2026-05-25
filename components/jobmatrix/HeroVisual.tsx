import Image from "next/image";

export function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[min(100%,380px)] lg:max-w-[440px]"
      aria-hidden
    >
      <div className="pointer-events-none absolute -left-8 top-8 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-6 bottom-12 h-56 w-56 rounded-full bg-sky-300/25 blur-3xl" />

      <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
        <Image
          src="/hero.png"
          alt="Professional exploring career opportunities with Rojgar Sathi"
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 1024px) 85vw, 440px"
        />
      </div>
    </div>
  );
}
