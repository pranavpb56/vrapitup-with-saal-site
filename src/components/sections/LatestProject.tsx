import { useApp } from "@/lib/context";
import { LATEST } from "@/lib/data";
import { Eyebrow, FadeUp, Icon, Line } from "@/components/ui";

export function LatestProject() {
  const { openProject } = useApp();
  const p = LATEST;
  return (
    <section id="latest" className="px-5 py-24 md:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow index="06">Latest work</Eyebrow>
            <h2 className="mt-8 text-[clamp(3rem,8.4vw,8.8rem)] font-medium leading-[0.9] tracking-[-0.055em]">
              <Line><span className="text-volt">Saal</span> — Furniture</Line>
            </h2>
          </div>
          <FadeUp className="md:col-span-4">
            <p className="max-w-sm text-bone/60 md:ml-auto">Our latest website project — a premium furniture experience built around editorial storytelling, warm materials, and refined interaction.</p>
          </FadeUp>
        </div>

        <FadeUp className="mt-14 md:mt-20">
          <div className="overflow-hidden rounded-xl bg-[#101010] ring-1 ring-white/10">
            <div className="relative flex h-9 items-center gap-2 border-b border-white/[0.06] bg-[#1b1b1b] px-4">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white/[0.06] px-6 py-1 text-xs text-white/45">saal — latest project</span>
            </div>
            <div className="relative aspect-[4/5] w-full bg-white sm:aspect-[16/9]">
              <iframe src="/saal/index.html" title="Saal — Furniture website" className="absolute inset-0 size-full border-0 bg-white" loading="lazy" />
            </div>
          </div>
        </FadeUp>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <div>
            <h3 className="text-3xl font-medium tracking-[-0.045em] md:text-[2.6rem]">Saal</h3>
            <p className="mt-2 text-[15px] text-bone/55">Furniture · India · Website + Creative Direction · 2026</p>
          </div>
          <button type="button" onClick={() => openProject(p)} className="group inline-flex items-center gap-3 text-[15px] font-medium">
            <span className="relative">View Project<span className="absolute -bottom-0.5 left-0 h-px w-full bg-bone/25" /><span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-volt transition-transform duration-500 ease-expo group-hover:scale-x-100" /></span>
            <span className="grid size-8 place-items-center rounded-full bg-white/[0.08] transition-colors duration-300 group-hover:bg-volt group-hover:text-ink"><Icon.ArrowUpRight className="size-3.5" /></span>
          </button>
        </div>
      </div>
    </section>
  );
}
