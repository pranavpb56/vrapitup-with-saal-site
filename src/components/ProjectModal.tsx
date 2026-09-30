import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useApp } from "@/lib/context";
import { FEATURED, MORE } from "@/lib/data";
import { EASE, EASE_IO } from "@/lib/hooks";
import { Button, Eyebrow, Icon } from "@/components/ui";
import { ProjectVisual } from "@/components/ProjectVisual";

const ALL = [...FEATURED, ...MORE];

export function ProjectModal() {
  const { project, closeProject, openDrawer, openProject } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, closeProject]);

  const next = project ? ALL[(ALL.findIndex((p) => p.id === project.id) + 1) % ALL.length] : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.name}`}
          className="fixed inset-0 z-[85] bg-ink"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: EASE_IO }}
        >
          <div ref={scrollRef} data-lenis-prevent className="h-full overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-ink/75 px-5 py-3.5 backdrop-blur-xl md:px-8">
              <button type="button" onClick={closeProject} className="group flex items-center gap-3 text-sm">
                <span className="grid size-10 place-items-center rounded-full bg-white/[0.07] transition-colors duration-300 group-hover:bg-bone group-hover:text-ink">
                  <Icon.ArrowLeft className="size-4" />
                </span>
                Back to work
              </button>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">Case study — {project.year}</span>
            </div>

            <div className="mx-auto max-w-[1600px] px-5 pb-24 md:px-8">
              <motion.div key={project.id + "-head"} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.35 }}>
                <div className="mt-10 flex flex-wrap gap-2 md:mt-14">
                  {project.services.map((s) => (
                    <span key={s} className="rounded-full px-3 py-1 text-xs text-bone/75 ring-1 ring-inset ring-white/15">
                      {s}
                    </span>
                  ))}
                </div>
                <h1 className="mt-6 text-[clamp(3rem,9vw,9.5rem)] font-medium leading-[0.88] tracking-[-0.06em]">{project.name}</h1>
                <p className="mt-6 max-w-3xl text-xl leading-snug text-bone/65 md:text-2xl">{project.description}</p>
              </motion.div>

              <motion.div
                key={project.id + "-visual"}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
                className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[18px] md:mt-16 md:aspect-[16/8]"
                style={{ background: project.bg }}
              >
                <ProjectVisual p={project} />
              </motion.div>

              <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
                <div className="md:col-span-4">
                  <Eyebrow>The challenge</Eyebrow>
                  <p className="mt-5 text-xl leading-snug">{project.challenge}</p>
                </div>
                <div className="md:col-span-4 md:col-start-6">
                  <Eyebrow>What we did</Eyebrow>
                  <p className="mt-5 text-xl leading-snug">{project.solution}</p>
                </div>
                <div className="md:col-span-2 md:col-start-11">
                  <Eyebrow>Industry</Eyebrow>
                  <p className="mt-5 text-xl">{project.industry}</p>
                </div>
              </div>

              <div className="mt-16 grid gap-px overflow-hidden rounded-[18px] bg-white/10 sm:grid-cols-3 md:mt-24">
                {project.results.map((r) => (
                  <div key={r.label} className="bg-ink-2 p-8 md:p-10">
                    <div className="text-6xl font-medium tracking-[-0.055em] text-volt md:text-7xl">{r.value}</div>
                    <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-bone/55">{r.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center">
                <p className="text-3xl font-medium tracking-[-0.045em] md:text-5xl">
                  Want results <span className="font-serif font-normal italic">like these?</span>
                </p>
                <Button size="lg" onClick={() => openDrawer(project.services[0])}>
                  Start a similar project
                </Button>
              </div>

              {next && (
                <button type="button" onClick={() => openProject(next)} className="group mt-20 block w-full border-t border-white/10 pt-10 text-left">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/45">Next project</span>
                  <span className="mt-5 flex items-center justify-between gap-6 text-[clamp(2.4rem,7vw,7rem)] font-medium leading-none tracking-[-0.055em] transition-colors duration-500 group-hover:text-volt">
                    {next.name}
                    <Icon.ArrowRight className="size-[0.55em] shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-3" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
