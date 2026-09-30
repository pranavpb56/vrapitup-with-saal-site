import type { Project } from "@/lib/data";

function LiveSite({ src, title, external = false }: { src: string; title: string; external?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#111]">
      <iframe src={src} title={title} className="absolute inset-0 size-full border-0 bg-white" loading="eager" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
      <a href={src} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="absolute bottom-5 right-5 z-10 rounded-full bg-ink/90 px-4 py-2 text-sm text-bone backdrop-blur-md transition-transform duration-300 hover:scale-105">
        Open live site ↗
      </a>
    </div>
  );
}

export function ProjectVisual({ p }: { p: Project }) {
  if (p.visual === "live-ghar") return <LiveSite src={p.liveUrl ?? "https://gharhome-qgw2sbkx.manus.space/"} title="GHAR — Home Food / Hyderabad" external />;
  if (p.visual === "live-saal") return <LiveSite src={p.liveUrl ?? "/saal/index.html"} title="Saal — Furniture made for the way you live" />;
  return (
    <div className="@container absolute inset-0 overflow-hidden">
      <img src={p.image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-[5cqw] left-[5cqw] right-[5cqw] flex items-end justify-between text-white">
        <div className="text-[7cqw] font-medium leading-none tracking-[-0.05em]">{p.name}</div>
        <div className="hidden font-mono text-[1.4cqw] uppercase tracking-[0.18em] opacity-70 sm:block">{p.industry}</div>
      </div>
    </div>
  );
}
