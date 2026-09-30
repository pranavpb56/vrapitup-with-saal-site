import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Eyebrow, FadeUp, Line } from "@/components/ui";

const STEPS = [
  { n: "01", title: "Discover", text: "Understand the business, audience, and goals.", time: "Week 1" },
  { n: "02", title: "Design", text: "Create the visual direction and experience.", time: "Week 1–2" },
  { n: "03", title: "Build", text: "Turn the concept into a polished digital product.", time: "Week 2–3" },
  { n: "04", title: "Launch", text: "Deliver, refine, and help the business go live.", time: "Week 3–4" },
];

function Step({ s, i, progress }: { s: (typeof STEPS)[number]; i: number; progress: MotionValue<number> }) {
  const fill = useTransform(progress, [i / 4, (i + 1) / 4], [0, 1]);
  const opacity = useTransform(progress, [i / 4 - 0.05, i / 4 + 0.08], [0.3, 1]);
  return (
    <div className="group relative">
      <div className="relative h-px w-full bg-white/12">
        <motion.div style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-volt" />
      </div>
      <motion.div style={{ opacity }}>
        <div className="mt-7 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">{s.time}</span>
          <span className="size-2 rounded-full bg-volt transition-transform duration-500 group-hover:scale-150" />
        </div>
        <div className="text-outline mt-10 text-[clamp(4.5rem,7.5vw,8rem)] font-medium leading-none tracking-[-0.06em] text-bone/70 transition-colors duration-500 group-hover:text-volt group-hover:[-webkit-text-fill-color:var(--color-volt)]">
          {s.n}
        </div>
        <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em] md:text-4xl">{s.title}</h3>
        <p className="mt-3 max-w-[17rem] leading-relaxed text-bone/55">{s.text}</p>
      </motion.div>
    </div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  return (
    <section id="process" className="relative z-20 -mt-12 rounded-t-[32px] bg-ink px-5 pb-40 pt-24 md:-mt-16 md:rounded-t-[48px] md:px-8 md:pb-56 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow index="06">How we work</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.6rem,6.4vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.055em]">
              <Line>From first call to</Line>
              <Line delay={0.08}>
                launch — in <span className="font-serif font-normal italic tracking-[-0.02em]">weeks.</span>
              </Line>
            </h2>
          </div>
          <FadeUp className="md:col-span-4">
            <p className="max-w-sm text-bone/60 md:ml-auto">
              A simple, transparent process. You always know what’s happening, what’s next, and when you go live.
            </p>
          </FadeUp>
        </div>
        <div ref={ref} className="mt-20 grid gap-14 sm:grid-cols-2 md:mt-28 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((s, i) => (
            <Step key={s.n} s={s} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
