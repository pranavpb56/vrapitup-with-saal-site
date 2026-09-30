import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";
import { Eyebrow, FadeUp, Icon, Line } from "@/components/ui";
import { EmberSite, OldSite } from "@/components/mockups/Sites";

const BEFORE = ["Old-fashioned website", "Basic typography", "Static layouts", "Poor mobile experience"];
const AFTER = ["Modern interface", "Premium typography", "Dynamic interactions", "Mobile-first experience"];

export function BeforeAfter() {
  const frameRef = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(50);
  const [dragging, setDragging] = useState(false);
  const [now, setNow] = useState(50);
  const touched = useRef(false);
  const hint = useRef<ReturnType<typeof animate> | null>(null);
  const compact = useMediaQuery("(max-width: 640px)");
  const inView = useInView(frameRef, { once: true, amount: 0.55 });

  const clip = useTransform(pos, (v) => `inset(0% 0% 0% ${v}%)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const beforeOpacity = useTransform(pos, [0, 100], [0.35, 1]);
  const afterOpacity = useTransform(pos, [0, 100], [1, 0.35]);
  useMotionValueEvent(pos, "change", (v) => setNow(Math.round(v)));

  useEffect(() => {
    if (!inView || touched.current) return;
    hint.current = animate(pos, [50, 18, 80, 38], { duration: 3.2, ease: "easeInOut", times: [0, 0.35, 0.75, 1], delay: 0.3 });
    return () => hint.current?.stop();
  }, [inView, pos]);

  const stopHint = () => {
    touched.current = true;
    hint.current?.stop();
  };
  const setFromX = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section id="transformation" className="px-5 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow index="03">The transformation</Eyebrow>
            <h2 className="mt-8 text-[clamp(3rem,8.4vw,8.8rem)] font-medium leading-[0.9] tracking-[-0.055em]">
              <Line>
                <span
                  className="font-normal tracking-[-0.02em] text-bone/40 underline decoration-[0.04em] underline-offset-[0.12em]"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Before
                </span>{" "}
                <span className="text-volt">→</span> After
              </Line>
            </h2>
          </div>
          <FadeUp className="md:col-span-4">
            <p className="max-w-sm text-bone/60 md:ml-auto">
              Same restaurant. Same food. Same owners. Drag the handle to see what a modern first impression looks like.
            </p>
          </FadeUp>
        </div>

        <FadeUp className="mt-14 md:mt-20">
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="text-bone/50">● Before — 2009</span>
            <span className="text-volt">After — 2025 ●</span>
          </div>
          <div className="overflow-hidden rounded-xl bg-[#101010] ring-1 ring-white/10">
            <div className="relative flex h-9 items-center gap-2 border-b border-white/[0.06] bg-[#1b1b1b] px-4">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white/[0.06] px-6 py-1 text-xs text-white/45">
                emberandoak.com
              </span>
            </div>
            <div
              ref={frameRef}
              data-cursor="Drag"
              className="@container relative aspect-[4/5] w-full touch-pan-y select-none sm:aspect-[16/10]"
              onPointerDown={(e) => {
                stopHint();
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragging(true);
                setFromX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (dragging) setFromX(e.clientX);
              }}
              onPointerUp={() => setDragging(false)}
              onPointerCancel={() => setDragging(false)}
            >
              <OldSite />
              <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
                <EmberSite compact={compact} />
              </motion.div>

              <span className="pointer-events-none absolute bottom-3 left-3 z-[5] hidden rounded-full sm:block bg-black/75 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                Before
              </span>
              <span className="pointer-events-none absolute bottom-3 right-3 z-[5] hidden rounded-full sm:block bg-volt px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
                After
              </span>

              <motion.div className="absolute inset-y-0 z-10 w-0" style={{ left }}>
                <div className="absolute inset-y-0 -left-px w-0.5 bg-volt shadow-[0_0_24px_rgba(212,255,63,0.7)]" />
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Compare before and after"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={now}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                      e.preventDefault();
                      stopHint();
                      const d = e.key === "ArrowLeft" ? -5 : 5;
                      pos.set(Math.min(100, Math.max(0, pos.get() + d)));
                    }
                  }}
                  className="absolute left-0 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-volt text-ink shadow-[0_10px_40px_rgba(0,0,0,0.5)] outline-none ring-4 ring-black/20 transition-transform duration-300 hover:scale-110 focus-visible:ring-bone md:size-16"
                >
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-14">
          <motion.div style={{ opacity: beforeOpacity }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">Before</div>
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {BEFORE.map((b) => (
                <li key={b} className="flex items-center justify-between py-4 text-xl text-bone/55 md:text-2xl">
                  <span className="line-through decoration-bone/30 decoration-1">{b}</span>
                  <Icon.Close className="size-5 text-bone/30" />
                </li>
              ))}
            </ul>
          </motion.div>
          <div className="flex justify-center">
            <div className="grid size-16 place-items-center rounded-full bg-volt text-ink md:size-20">
              <Icon.ArrowRight className="size-6 rotate-90 md:rotate-0" />
            </div>
          </div>
          <motion.div style={{ opacity: afterOpacity }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-volt">After</div>
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {AFTER.map((a) => (
                <li key={a} className="flex items-center justify-between py-4 text-xl font-medium tracking-[-0.02em] md:text-2xl">
                  <span>{a}</span>
                  <span className="grid size-7 place-items-center rounded-full bg-volt text-ink">
                    <Icon.Check className="size-4" />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
