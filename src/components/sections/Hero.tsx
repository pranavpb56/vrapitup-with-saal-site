import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useApp } from "@/lib/context";
import { IMG, VIDEO } from "@/lib/data";
import { EASE, useCycle } from "@/lib/hooks";
import { Button, Line, Magnetic } from "@/components/ui";
import { BrowserFrame, PhoneFrame } from "@/components/mockups/Sites";

const THUMBS = [IMG.skincare, IMG.sneaker, IMG.architecture, IMG.fashion, IMG.coffee, IMG.chrome];

function ThumbPill({ show }: { show: boolean }) {
  const [i] = useCycle(THUMBS.length, 1500, show);
  return (
    <motion.span
      initial={{ width: 0, opacity: 0 }}
      animate={show ? { width: "1.72em", opacity: 1 } : { width: 0, opacity: 0 }}
      transition={{ duration: 1.3, ease: EASE, delay: 0.75 }}
      className="relative ml-[0.14em] inline-block h-[0.72em] overflow-hidden rounded-full bg-ink-3 align-baseline"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={i}
          src={THUMBS[i]}
          alt=""
          className="absolute inset-0 size-full object-cover"
          initial={{ opacity: 0, scale: 1.25 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </AnimatePresence>
    </motion.span>
  );
}

function Scribble({ show }: { show: boolean }) {
  return (
    <svg
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.04em] left-[2%] h-[0.13em] w-[96%] overflow-visible text-volt"
      aria-hidden
    >
      <motion.path
        d="M3 14 C 55 3, 110 19, 165 9 S 262 5, 297 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: show ? 1 : 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 1.15 }}
      />
    </svg>
  );
}

const HERO_SITE = { url: "gharhome-qgw2sbkx.manus.space", src: "https://gharhome-qgw2sbkx.manus.space/", title: "GHAR — Home Food / Hyderabad" };

function HeroBrowser() {
  return (
    <BrowserFrame url={HERO_SITE.url}>
      <div className="absolute inset-0 bg-white">
        <iframe src={HERO_SITE.src} title={HERO_SITE.title} className="absolute inset-0 size-full border-0" loading="eager" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen" />
      </div>
    </BrowserFrame>
  );
}

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "animate-float rounded-2xl bg-ink-2/80 px-4 py-3 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function Showcase({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);

  const bx = useTransform(sx, (v) => v * -16);
  const by = useTransform(sy, (v) => v * -10);
  const px = useTransform(sx, (v) => v * 36);
  const py = useTransform(sy, (v) => v * 24);
  const qx = useTransform(sx, (v) => v * 28);
  const qy = useTransform(sy, (v) => v * 18);
  const cx = useTransform(sx, (v) => v * 52);
  const cy = useTransform(sy, (v) => v * 34);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div ref={ref} className="relative mx-auto mt-14 w-full max-w-[1360px] md:mt-14" style={{ perspective: 1600 }}>
      <motion.div
        initial={{ opacity: 0, y: 140 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 140 }}
        transition={{ duration: 1.7, ease: EASE, delay: 0.5 }}
      >
        <motion.div
          style={{ rotateX, scale, transformOrigin: "50% 0%" }}
          className="relative aspect-[4/4.35] md:aspect-[16/8.8]"
        >
          <div className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[80%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/[0.07] blur-[110px]" />

          <motion.div style={{ x: bx, y: by }} className="absolute left-[3%] top-0 w-[94%] md:left-[13%] md:w-[74%]">
            <HeroBrowser />
          </motion.div>

          <motion.div
            style={{ x: qx, y: qy, rotate: -7 }}
            className="absolute left-[1%] top-[47%] w-[40%] md:left-[1.5%] md:top-[31%] md:w-[20%]"
          >
            <motion.div
              initial={{ opacity: 0, x: -90, rotate: -18 }}
              animate={ready ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -90, rotate: -18 }}
              transition={{ duration: 1.5, ease: EASE, delay: 1.05 }}
              className="shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="overflow-hidden rounded-[6px] bg-white ring-1 ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
                <iframe src="https://gharhome-qgw2sbkx.manus.space/" title="GHAR — Home Food / Hyderabad" className="block aspect-[4/5] w-full border-0" loading="eager" referrerPolicy="strict-origin-when-cross-origin" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ x: px, y: py, rotate: 6 }}
            className="absolute right-[3%] top-[35%] w-[31%] md:right-[2%] md:top-[17%] md:w-[16%]"
          >
            <motion.div
              initial={{ opacity: 0, x: 90, rotate: 18 }}
              animate={ready ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 90, rotate: 18 }}
              transition={{ duration: 1.5, ease: EASE, delay: 1.15 }}
            >
              <PhoneFrame>
                <iframe src="/saal/" title="Saal — Furniture website" className="absolute inset-0 size-full border-0 bg-white" loading="eager" referrerPolicy="strict-origin-when-cross-origin" />
              </PhoneFrame>
            </motion.div>
          </motion.div>

          <motion.div style={{ x: cx, y: cy }} className="absolute right-[15%] top-[-5%] hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 1, ease: EASE, delay: 1.6 }}
            >
              <Chip className="flex items-center gap-3">
                <span className="relative grid size-11 place-items-center">
                  <svg viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90">
                    <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                    <circle cx="22" cy="22" r="19" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span className="text-[13px] font-semibold text-[#4ade80]">100</span>
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-medium">Performance</span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-bone/50">Lighthouse score</span>
                </span>
              </Chip>
            </motion.div>
          </motion.div>

          <motion.div style={{ x: cx, y: cy }} className="absolute bottom-[4%] left-[23%] hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 1, ease: EASE, delay: 1.75 }}
            >
              <Chip className="[animation-delay:-3s]">
                <span className="block text-2xl font-semibold tracking-[-0.04em] text-volt">↑ 184%</span>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-bone/50">GHAR · Live project</span>
              </Chip>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const { openDrawer, scrollTo } = useApp();
  return (
    <section id="top" className="relative overflow-x-clip px-5 pb-20 pt-24 md:px-8 md:pb-28 md:pt-28">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
      <div className="relative mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="mb-7 flex flex-wrap items-center justify-between gap-4 md:mb-9"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-white/[0.03] py-1.5 pl-1.5 pr-4 text-[13px] text-bone/70 ring-1 ring-white/10 md:text-sm">
            <span className="rounded-full bg-volt px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink">2026</span>
            <span>
              Your business shouldn’t look like it’s still in{" "}
              <span className="font-serif text-[1.1em] italic text-bone line-through decoration-volt decoration-2">2010</span>.
            </span>
          </div>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-bone/45 md:block">
            Websites — Posters — Video Ads
          </div>
        </motion.div>

        <h1 className="text-[clamp(2.5rem,9.4vw,10.5rem)] font-medium leading-[0.9] tracking-[-0.055em]">
          <Line show={ready} delay={0.12}>
            Your business
            <ThumbPill show={ready} />
          </Line>
          <Line show={ready} delay={0.22}>
            deserves a{" "}
            <span className="relative inline-block pr-[0.04em] font-serif font-normal italic tracking-[-0.02em]">
              better
              <Scribble show={ready} />
            </span>
          </Line>
          <Line show={ready} delay={0.32}>
            first impression<span className="text-volt">.</span>
          </Line>
        </h1>

        <div className="mt-9 grid items-end gap-8 md:mt-10 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
            className="max-w-md text-lg leading-snug text-bone/65 md:col-span-5 md:text-xl"
          >
            We build modern websites, striking visuals, and high-impact video ads that make businesses impossible to overlook.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.72 }}
            className="flex flex-wrap gap-3 md:col-span-7 md:justify-end"
          >
            <Magnetic>
              <Button size="lg" onClick={() => openDrawer()}>
                Start a Project
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="ghost" icon="down" onClick={() => scrollTo("#work")}>
                View Our Work
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <Showcase ready={ready} />
      </div>
    </section>
  );
}
