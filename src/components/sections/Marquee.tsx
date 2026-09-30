import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { Fragment, useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function VelocityRow({ children, base = -2, className }: { children: ReactNode; base?: number; className?: string }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_t, delta) => {
    let move = dir.current * base * (Math.min(delta, 64) / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <motion.div style={{ x }} className="flex shrink-0 whitespace-nowrap">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const A = ["Websites", "posters", "Video Ads", "social", "Campaigns", "motion", "Brand Visuals", "launches"];
const B = ["No templates", "Mobile-first", "Built to convert", "Zero 2010 vibes", "Launch in weeks", "Obsessively detailed"];

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("mx-[0.45em] size-[0.55em] shrink-0", className)} aria-hidden>
      <path d="M12 0c.8 6.3 4.9 10.6 12 12-7.1 1.4-11.2 5.7-12 12-.8-6.3-4.9-10.6-12-12C7.1 10.6 11.2 6.3 12 0Z" fill="currentColor" />
    </svg>
  );
}

export function Marquee() {
  return (
    <section aria-label="What we make" className="relative overflow-hidden py-10 md:py-16">
      <div className="relative h-[150px] md:h-[250px]">
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] border-y border-white/10 bg-ink-2 py-3 md:py-5">
          <VelocityRow base={1.6} className="text-[clamp(1.6rem,4vw,3.6rem)] font-medium tracking-[-0.04em] text-bone/35">
            {B.map((w) => (
              <Fragment key={w}>
                <span className="text-outline">{w}</span>
                <Star className="text-bone/30" />
              </Fragment>
            ))}
          </VelocityRow>
        </div>
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2.5deg] bg-volt py-3 text-ink shadow-[0_30px_80px_-20px_rgba(212,255,63,0.3)] md:py-5">
          <VelocityRow base={-2} className="text-[clamp(1.8rem,4.6vw,4.2rem)] leading-none">
            {A.map((w, i) => (
              <Fragment key={w}>
                <span
                  className={
                    i % 2 ? "font-serif italic tracking-[-0.02em]" : "font-semibold uppercase tracking-[-0.045em]"
                  }
                >
                  {w}
                </span>
                <Star />
              </Fragment>
            ))}
          </VelocityRow>
        </div>
      </div>
    </section>
  );
}
