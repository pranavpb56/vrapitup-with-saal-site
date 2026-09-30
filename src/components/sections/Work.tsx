import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useApp } from "@/lib/context";
import { FEATURED, MORE, type Project } from "@/lib/data";
import { EASE } from "@/lib/hooks";
import { Eyebrow, FadeUp, Icon, Line } from "@/components/ui";
import { ProjectVisual } from "@/components/ProjectVisual";

function ProjectCard({ p, index, className, aspect }: { p: Project; index: number; className?: string; aspect: string }) {
  const { openProject } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const light = p.bg === "#D4FF3F" || p.bg === "#D8C3A4";

  return (
    <FadeUp className={className}>
      <article className="group">
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          aria-label={`View project: ${p.name}`}
          data-cursor="View"
          onClick={() => openProject(p)}
          onKeyDown={(e) => {
            if (e.key === "Enter") openProject(p);
          }}
          className={cn("relative overflow-hidden rounded-[14px] outline-none focus-visible:ring-2 focus-visible:ring-volt", aspect)}
          style={{ background: p.bg }}
        >
          <motion.div style={{ y }} className="absolute inset-x-0 inset-y-[-6%]">
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.045]">
              <ProjectVisual p={p} />
            </div>
          </motion.div>
          <div
            className={cn(
              "absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] md:left-5 md:top-5",
              light ? "text-ink/60" : "text-white/60"
            )}
          >
            ({String(index + 1).padStart(2, "0")}) — {p.year}
          </div>
          <div className="absolute bottom-4 left-4 flex translate-y-0 items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-sm text-bone opacity-100 backdrop-blur-md transition-all duration-500 ease-expo md:bottom-5 md:left-5 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            View Project <Icon.ArrowUpRight className="size-4" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
          <h3 className="text-3xl font-medium tracking-[-0.045em] md:text-[2.6rem] md:leading-none">{p.name}</h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {p.services.map((s) => (
              <span key={s} className="rounded-full px-3 py-1 text-xs text-bone/70 ring-1 ring-inset ring-white/15">
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-bone/55">{p.description}</p>
        <button type="button" onClick={() => openProject(p)} className="group/btn mt-5 inline-flex items-center gap-3 text-[15px] font-medium">
          <span className="relative">
            View Project
            <span className="absolute -bottom-0.5 left-0 h-px w-full bg-bone/25" />
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-volt transition-transform duration-500 ease-expo group-hover/btn:scale-x-100" />
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-white/[0.08] transition-colors duration-300 group-hover/btn:bg-volt group-hover/btn:text-ink">
            <Icon.ArrowUpRight className="size-3.5" />
          </span>
        </button>
      </article>
    </FadeUp>
  );
}

function MoreIndex() {
  const { openProject } = useApp();
  const [active, setActive] = useState<number | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 24, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 24, mass: 0.5 });

  return (
    <div className="mt-28 md:mt-40">
      <FadeUp>
        <div className="grid grid-cols-12 gap-4 border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/45">
          <span className="col-span-7 md:col-span-6">More projects</span>
          <span className="col-span-5 text-right md:col-span-4 md:text-left">Service</span>
          <span className="hidden text-right md:col-span-2 md:block">Year</span>
        </div>
      </FadeUp>
      <div
        ref={areaRef}
        className="relative"
        onMouseMove={(e) => {
          const r = areaRef.current?.getBoundingClientRect();
          if (!r) return;
          x.set(e.clientX - r.left - 130);
          y.set(e.clientY - r.top - 170);
        }}
        onMouseLeave={() => setActive(null)}
      >
        {MORE.map((p, i) => (
          <FadeUp key={p.id} delay={i * 0.05}>
            <button
              type="button"
              data-cursor="View"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => openProject(p)}
              className="group grid w-full grid-cols-12 items-center gap-4 border-b border-white/10 py-6 text-left md:py-9"
            >
              <span className="col-span-7 flex items-center gap-4 text-[1.75rem] font-medium leading-none tracking-[-0.045em] transition-all duration-500 ease-expo group-hover:translate-x-3 group-hover:text-volt md:col-span-6 md:text-6xl">
                <Icon.ArrowRight className="hidden size-[0.6em] -translate-x-4 opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100 md:block" />
                {p.name}
              </span>
              <span className="col-span-5 text-right text-sm text-bone/55 md:col-span-4 md:text-left">{p.services.join(" · ")}</span>
              <span className="hidden text-right font-mono text-sm text-bone/40 md:col-span-2 md:block">{p.year}</span>
            </button>
          </FadeUp>
        ))}

        <motion.div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[340px] w-[260px] md:block" style={{ x, y }}>
          <motion.div
            className="relative size-full overflow-hidden rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            animate={{ scale: active === null ? 0.3 : 1, opacity: active === null ? 0 : 1, rotate: active === null ? -8 : 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {MORE.map((p, i) => (
              <img
                key={p.id}
                src={p.image}
                alt=""
                className={cn(
                  "absolute inset-0 size-full object-cover transition-all duration-700 ease-expo",
                  active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                )}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="px-5 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow index="04">Selected work</Eyebrow>
            <h2 className="mt-8 text-[clamp(3.4rem,10vw,10rem)] font-medium leading-[0.86] tracking-[-0.06em]">
              <Line>Selected</Line>
              <Line delay={0.08}>
                <span className="font-serif font-normal italic tracking-[-0.03em]">work</span>
                <span className="ml-3 inline-block translate-y-[0.9em] align-top font-mono text-[0.13em] font-normal leading-none tracking-normal text-bone/45">
                  ({String(FEATURED.length).padStart(2, "0")})
                </span>
              </Line>
            </h2>
          </div>
          <FadeUp>
            <p className="max-w-xs text-bone/60">
              The two live websites we actually built — open them, explore them, and see the work in context.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-12 md:gap-y-28">
          {FEATURED.map((p, index) => (
            <ProjectCard
              key={p.id}
              p={p}
              index={index}
              className={index === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-48"}
              aspect={index === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}
            />
          ))}
        </div>

        {MORE.length > 0 && <MoreIndex />}
      </div>
    </section>
  );
}
