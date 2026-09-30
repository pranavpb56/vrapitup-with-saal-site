import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { EASE } from "@/lib/hooks";
import { Eyebrow, FadeUp, Line } from "@/components/ui";

const TEXT =
  "Most businesses are brilliant at what they do — but online, they look outdated. Clunky websites, forgettable posters, ads nobody finishes watching. We fix that. We design digital experiences that make you look as good as you actually are.";

const SERIF = new Set(["outdated."]);
const VOLT = new Set(["We", "fix", "that."]);

function Word({
  children,
  progress,
  range,
  className,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("mr-[0.24em] inline-block", className)}>
      {children}
    </motion.span>
  );
}

function Strike({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="relative inline-block font-serif font-normal italic tracking-[-0.02em] text-bone/55">
      {children}
      <motion.span
        className="absolute left-[-6%] right-[-6%] top-[54%] h-[0.075em] origin-left bg-volt"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
      />
    </span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = TEXT.split(" ");
  let volt = 0;

  return (
    <section className="px-5 py-24 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow index="01">Our belief</Eyebrow>
          <FadeUp className="mt-12 hidden md:block">
            <div className="text-7xl font-medium tracking-[-0.06em] lg:text-8xl">
              0.05<span className="text-volt">s</span>
            </div>
            <p className="mt-4 max-w-[15rem] text-sm leading-relaxed text-bone/50">
              That’s how long people take to judge a business by its website.
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-9">
          <h2 className="text-[clamp(2.2rem,5vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.05em]">
            <Line>Your business shouldn’t look</Line>
            <Line delay={0.08}>
              like it’s still in <Strike>2010</Strike>.
            </Line>
          </h2>
          <p
            ref={ref}
            className="mt-12 max-w-[62rem] text-[clamp(1.45rem,2.7vw,2.7rem)] font-medium leading-[1.14] tracking-[-0.035em] md:mt-16"
          >
            {words.map((w, i) => {
              const isVolt = VOLT.has(w) && volt < 3 && i > 20 && i < 30 ? (volt++, true) : false;
              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                  className={cn(
                    SERIF.has(w) && "font-serif font-normal italic tracking-[-0.01em]",
                    isVolt && "text-volt"
                  )}
                >
                  {w}
                </Word>
              );
            })}
          </p>
          <FadeUp className="mt-14 flex items-end gap-5 md:hidden">
            <div className="text-6xl font-medium tracking-[-0.06em]">
              0.05<span className="text-volt">s</span>
            </div>
            <p className="max-w-[12rem] pb-1 text-sm leading-snug text-bone/50">
              That’s how long people take to judge a business by its website.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
