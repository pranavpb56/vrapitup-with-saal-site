import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { EASE_IO } from "@/lib/hooks";

const ERAS = [
  { from: 2010, font: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', label: "Clip-art & Comic Sans" },
  { from: 2014, font: '"Times New Roman", Times, serif', label: "Stock photos everywhere" },
  { from: 2018, font: "Arial, Helvetica, sans-serif", label: "Template season" },
  { from: 2026, font: "var(--font-sans)", label: "Upgrade complete" },
];

export function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [year, setYear] = useState(2010);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    const finish = () => {
      setExit(true);
      onReveal();
    };
    if (reduce) {
      setYear(2026);
      t = window.setTimeout(finish, 250);
      return () => window.clearTimeout(t);
    }
    let y = 2010;
    const tick = () => {
      y += 1;
      setYear(y);
      if (y < 2026) t = window.setTimeout(tick, y < 2021 ? 62 : 62 + (y - 2020) * 30);
      else t = window.setTimeout(finish, 520);
    };
    t = window.setTimeout(tick, 380);
    return () => window.clearTimeout(t);
  }, [onReveal]);

  const era = [...ERAS].reverse().find((e) => year >= e.from) ?? ERAS[0];
  const done = year === 2026;
  const pct = Math.round(((year - 2010) / 16) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-5 text-bone md:p-8"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={exit ? { clipPath: "inset(0% 0% 100% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.1, ease: EASE_IO }}
      onAnimationComplete={() => {
        if (exit) onDone();
      }}
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone/55">
        <span>vrapitup® Studio</span>
        <span>Loading the present</span>
      </div>

      <motion.div
        animate={exit ? { y: -140, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_IO }}
        className="flex flex-col items-center"
      >
        <div
          className={cn(
            "text-[27vw] leading-[0.82] tabular-nums tracking-[-0.04em] md:text-[19vw]",
            done ? "font-semibold text-volt" : "font-normal text-bone"
          )}
          style={{ fontFamily: era.font }}
        >
          {year}
        </div>
        <div className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-bone/55">
          {done ? "✦ " : ""}
          {era.label}
        </div>
      </motion.div>

      <div>
        <div className="mb-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone/55">
          <span>Upgrading your first impression</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
        <div className="h-px w-full bg-bone/15">
          <div className="h-full bg-volt transition-[width] duration-150" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
