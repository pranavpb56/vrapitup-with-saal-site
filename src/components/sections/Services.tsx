import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useApp } from "@/lib/context";
import { useMediaQuery } from "@/lib/hooks";
import { Eyebrow, FadeUp, Icon, Line } from "@/components/ui";
import { PosterDeck, VideoStudio, WebsitePreview } from "./ServicePreviews";

type Theme = "dark" | "light" | "cinema";
type Service = {
  n: string;
  title: string;
  short: string;
  tagline: string;
  desc: string;
  tags: string[];
  theme: Theme;
  preview: ReactNode;
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Websites",
    short: "website",
    tagline: "From outdated to unforgettable.",
    desc: "Fast, responsive websites with premium typography, fluid motion and interfaces your customers actually enjoy using.",
    tags: ["UI/UX Design", "Development", "Motion & Interaction", "E-commerce", "CMS", "SEO-ready"],
    theme: "dark",
    preview: <WebsitePreview />,
  },
  {
    n: "02",
    title: "Posters & Visuals",
    short: "visuals",
    tagline: "Make people stop scrolling.",
    desc: "Promotional posters, social creatives, campaign graphics and product visuals — designed to be noticed in a crowded feed.",
    tags: ["Posters", "Social Creatives", "Campaign Graphics", "Product Visuals", "Brand Artwork"],
    theme: "light",
    preview: <PosterDeck />,
  },
  {
    n: "03",
    title: "Video Ads",
    short: "video",
    tagline: "Turn attention into action.",
    desc: "Short, punchy ads built for Instagram, TikTok and YouTube — a hook in the first second, a story in ten, action by the end.",
    tags: ["Reels & TikTok", "YouTube Ads", "Product Videos", "Motion Graphics", "Captions & Sound"],
    theme: "cinema",
    preview: <VideoStudio />,
  },
];

const THEME: Record<Theme, string> = {
  dark: "bg-[#131313] text-bone",
  light: "bg-bone text-ink",
  cinema: "bg-[#07080c] text-bone",
};

function Panel({
  s,
  i,
  total,
  progress,
  sticky,
}: {
  s: Service;
  i: number;
  total: number;
  progress: MotionValue<number>;
  sticky: boolean;
}) {
  const { openDrawer } = useApp();
  const last = i === total - 1;
  const a = i / (total - 1);
  const b = (i + 1) / (total - 1);
  const scale = useTransform(progress, [a, b], [1, 0.9]);
  const dim = useTransform(progress, [a, b], [0, 0.65]);
  const light = s.theme === "light";

  return (
    <div className={cn("relative", sticky ? "sticky top-0 h-svh py-4" : "py-1.5")}>
      <motion.div
        style={sticky && !last ? { scale } : undefined}
        className={cn("relative h-full origin-top overflow-hidden rounded-[22px] md:rounded-[30px]", THEME[s.theme])}
      >
        {s.theme === "dark" && (
          <>
            <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_75%)]" />
            <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-volt/[0.08] blur-[120px]" />
          </>
        )}
        {s.theme === "light" && <div className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />}
        {s.theme === "cinema" && (
          <>
            <div className="pointer-events-none absolute -bottom-48 -left-32 size-[560px] rounded-full bg-[#ff3b3b]/[0.14] blur-[130px]" />
            <div className="pointer-events-none absolute -right-32 -top-48 size-[560px] rounded-full bg-[#3b5bff]/[0.16] blur-[130px]" />
          </>
        )}

        <div className="relative grid h-full gap-10 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
          <div className="flex flex-col lg:col-span-5">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] opacity-55">
              <span>({s.n}) Service</span>
              <span>{s.n} / 03</span>
            </div>
            <div className="mt-10 lg:mt-auto">
              <h3 className="text-[clamp(3rem,5.8vw,6.6rem)] font-medium leading-[0.9] tracking-[-0.055em]">{s.title}</h3>
              <p className="mt-4 font-serif text-[clamp(1.7rem,2.5vw,2.6rem)] italic leading-[1.05]">{s.tagline}</p>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed opacity-65 md:text-base">{s.desc}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-[13px] ring-1 ring-inset",
                      light ? "ring-ink/15" : "ring-white/15"
                    )}
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openDrawer(s.title)}
                className="group mt-9 inline-flex items-center gap-3 text-base font-medium"
              >
                <span className="relative">
                  Start a {s.short} project
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-expo group-hover:origin-left group-hover:scale-x-100" />
                </span>
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-full transition-all duration-500 ease-expo group-hover:translate-x-1",
                    light ? "bg-ink text-bone" : "bg-volt text-ink"
                  )}
                >
                  <Icon.ArrowRight className="size-4" />
                </span>
              </button>
            </div>
          </div>
          <div className="flex min-h-0 items-center justify-center lg:col-span-7">{s.preview}</div>
        </div>

        {sticky && !last && <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />}
      </motion.div>
    </div>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const sticky = useMediaQuery("(min-width: 1024px) and (min-height: 700px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="services" className="relative px-3 md:px-4">
      <header className="mx-auto max-w-[1600px] px-2 pb-14 pt-8 md:px-4 md:pb-20">
        <Eyebrow index="02">What we do</Eyebrow>
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(2.6rem,6.4vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.05em] md:col-span-8">
            <Line>Three ways we make</Line>
            <Line delay={0.08}>
              you <span className="font-serif font-normal italic tracking-[-0.02em]">impossible</span> to miss.
            </Line>
          </h2>
          <FadeUp className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-bone/60 md:ml-auto">
              One studio for everything your customers see — so your website, visuals and ads finally feel like the same brand.
            </p>
          </FadeUp>
        </div>
      </header>
      <div ref={ref} className="relative">
        {SERVICES.map((s, i) => (
          <Panel key={s.n} s={s} i={i} total={SERVICES.length} progress={scrollYProgress} sticky={sticky} />
        ))}
      </div>
    </section>
  );
}
