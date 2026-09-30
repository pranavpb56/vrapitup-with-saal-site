import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { IMG, VIDEO } from "@/lib/data";
import { EASE, EASE_IO, useCycle, useElementSize, useMediaQuery, useVisible } from "@/lib/hooks";
import { Icon } from "@/components/ui";
import { AdScreen, POSTERS, type AdFormat } from "@/components/mockups/Creative";

/* ================================================================== */
/* 01 — Website preview (responsive demo)                              */
/* ================================================================== */
type Mode = "desktop" | "tablet" | "mobile";
const MODES: { id: Mode; label: string; Icon: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element }[] = [
  { id: "desktop", label: "Desktop", Icon: Icon.Monitor },
  { id: "tablet", label: "Tablet", Icon: Icon.Tablet },
  { id: "mobile", label: "Mobile", Icon: Icon.Phone },
];
const FRAME_W: Record<Mode, string> = { desktop: "100%", tablet: "45%", mobile: "27%" };
const FRAME_CLS: Record<Mode, string> = {
  desktop: "rounded-[1.1cqw] border-0",
  tablet: "rounded-[2.4cqw] border-[0.9cqw] border-[#1e1e1e]",
  mobile: "rounded-[3.6cqw] border-[0.75cqw] border-[#1e1e1e]",
};

const ROASTS = [
  { name: "Ethiopia Guji", notes: "Peach · Jasmine · Honey", price: "€16", bg: "#C4622D", short: "Guji" },
  { name: "Colombia Huila", notes: "Cherry · Cocoa nib", price: "€15", bg: "#6B7F4E", short: "Huila" },
  { name: "Kenya Nyeri", notes: "Blackcurrant · Citrus", price: "€17", bg: "#3F4D6B", short: "Nyeri" },
  { name: "House Espresso", notes: "Caramel · Hazelnut", price: "€14", bg: "#8A5A3C", short: "House" },
];

function KoyaSite({ mode }: { mode: Mode }) {
  const src = mode === "desktop" ? "/saal/" : "https://gharhome-qgw2sbkx.manus.space/";
  const title = mode === "desktop" ? "Saal — Furniture website" : "GHAR — Home Food / Hyderabad";
  return (
    <div className="relative min-h-[52cqw] bg-white">
      <iframe src={src} title={title} className="absolute inset-0 h-full min-h-[52cqw] w-full border-0 bg-white" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
    </div>
  );
}

export function WebsitePreview() {
  const [mode, setMode] = useState<Mode>("desktop");
  const [touched, setTouched] = useState(false);
  const [hover, setHover] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const [visRef, visible] = useVisible<HTMLDivElement>();
  const viewportRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (touched || !visible || hover) return;
    const id = window.setInterval(
      () => setMode((m) => (m === "desktop" ? "tablet" : m === "tablet" ? "mobile" : "desktop")),
      4200
    );
    return () => window.clearInterval(id);
  }, [touched, visible, hover]);

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current && pageRef.current) {
        setMaxScroll(Math.max(0, pageRef.current.scrollHeight - viewportRef.current.clientHeight));
      }
    };
    const t = window.setTimeout(measure, 1000);
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (pageRef.current) ro.observe(pageRef.current);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
    };
  }, [mode]);

  const idx = MODES.findIndex((m) => m.id === mode);

  return (
    <div ref={visRef} className="w-full max-w-[calc((100svh-15rem)*1.6)]">
      <div className="@container w-full">
        <div className="relative flex h-[58cqw] items-center justify-center">
          <div
            data-cursor="Explore"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={cn(
              "relative flex h-full flex-col overflow-hidden bg-[#0d0d0d] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-[width,border-radius,border-width] duration-[900ms] ease-quart",
              FRAME_CLS[mode]
            )}
            style={{ width: FRAME_W[mode] }}
          >
            <div className="relative flex h-[2.8cqw] shrink-0 items-center gap-[0.6cqw] bg-[#1b1b1b] px-[1.2cqw]">
              {mode === "desktop" ? (
                <>
                  <span className="size-[0.8cqw] rounded-full bg-[#ff5f57]" />
                  <span className="size-[0.8cqw] rounded-full bg-[#febc2e]" />
                  <span className="size-[0.8cqw] rounded-full bg-[#28c840]" />
                  <span className="absolute left-1/2 top-1/2 flex h-[1.7cqw] w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[0.5cqw] bg-white/[0.06] text-[1cqw] text-white/45">
                    koyacoffee.com
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[0.95cqw] font-medium text-white/80">9:41</span>
                  {mode === "mobile" && (
                    <span className="absolute left-1/2 top-1/2 h-[1.5cqw] w-[7cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                  )}
                  <span className="ml-auto flex items-center gap-[0.4cqw]">
                    <i className="block h-[0.8cqw] w-[1.4cqw] rounded-[0.2cqw] border border-white/60" />
                  </span>
                </>
              )}
            </div>
            <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden bg-[#F1E9DD]">
              <motion.div
                ref={pageRef}
                animate={{ y: hover ? -maxScroll : 0 }}
                transition={hover ? { duration: Math.max(2.5, maxScroll / 80), ease: "easeInOut" } : { duration: 1.1, ease: EASE }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: EASE } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    <KoyaSite mode={mode} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="relative grid grid-cols-3 rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
          <span
            className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-bone transition-transform duration-500 ease-expo"
            style={{ transform: `translateX(${idx * 100}%)` }}
          />
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setTouched(true);
                setMode(m.id);
              }}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300",
                mode === m.id ? "text-ink" : "text-bone/65 hover:text-bone"
              )}
            >
              <m.Icon className="size-4" />
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone/45">Hover the site to scroll ↓</span>
      </div>
    </div>
  );
}

/* ================================================================== */
/* 02 — Poster deck                                                    */
/* ================================================================== */
const POSTER_NAMES = ["Aero Run — Launch", "Night Shift — Event", "Kōya — Café series", "Solène — Summer sale"];

export function PosterDeck() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [spread, setSpread] = useState(false);
  const [visRef, visible] = useVisible<HTMLDivElement>();
  const small = useMediaQuery("(max-width: 640px)");

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);

  useEffect(() => {
    if (spread || !visible) return;
    const id = window.setInterval(next, 2600);
    return () => window.clearInterval(id);
  }, [spread, visible]);

  return (
    <div ref={visRef} className="w-full">
      <div
        data-cursor="Shuffle"
        role="button"
        tabIndex={0}
        aria-label="Shuffle posters"
        onMouseEnter={() => setSpread(true)}
        onMouseLeave={() => setSpread(false)}
        onClick={next}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            next();
          }
        }}
        className="relative h-[420px] w-full outline-none sm:h-[min(60svh,560px)]"
      >
        {order.map((pi, depth) => {
          const P = POSTERS[pi];
          const c = depth - 1.5;
          const target = spread
            ? { x: `${c * (small ? 30 : 50)}%`, y: Math.abs(c) * 16 - 10, rotate: c * 7, scale: 0.92 }
            : { x: `${depth * 5}%`, y: depth * -12, rotate: depth * 3.5 - 3, scale: 1 - depth * 0.05 };
          return (
            <motion.div
              key={pi}
              className="absolute left-1/2 top-1/2 w-[52%] max-w-[300px] sm:w-[40%]"
              style={{ zIndex: 10 - depth }}
              animate={target}
              transition={{ type: "spring", stiffness: 140, damping: 19, mass: 0.9 }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <P className="rounded-[4px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]" />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em] opacity-55">
        <span>Hover to fan · Click to shuffle</span>
        <span>
          0{order[0] + 1}/04 — {POSTER_NAMES[order[0]]}
        </span>
      </div>
    </div>
  );
}

/* ================================================================== */
/* 03 — Video ad studio                                                */
/* ================================================================== */
const FORMATS: { id: AdFormat; label: string; sub: string }[] = [
  { id: "9:16", label: "Reels", sub: "TikTok · Stories" },
  { id: "1:1", label: "Feed", sub: "Instagram · Facebook" },
  { id: "16:9", label: "YouTube", sub: "Pre-roll · In-stream" },
];
const CAPTIONS = ["Stop *scrolling.*", "Your best shape", "starts *today.*", "First week *free*", "Join *Pulse* →"];
const PHASES = [
  { label: "Hook", from: 0, to: 1 },
  { label: "Story", from: 1, to: 3 },
  { label: "Offer", from: 3, to: 4 },
  { label: "CTA", from: 4, to: 5 },
];
const STEP_MS = 2400;

export function VideoStudio() {
  const [format, setFormat] = useState<AdFormat>("9:16");
  const [stageRef, size] = useElementSize<HTMLDivElement>();
  const [visRef, visible] = useVisible<HTMLDivElement>();
  const [step] = useCycle(CAPTIONS.length, STEP_MS, visible);

  const ratio = format === "9:16" ? 9 / 16 : format === "1:1" ? 1 : 16 / 9;
  let h = size.height;
  let w = h * ratio;
  if (w > size.width) {
    w = size.width;
    h = w / ratio;
  }
  if (format === "1:1") {
    h = Math.min(h, size.height * 0.86);
    w = h;
  }

  return (
    <div ref={visRef} className="w-full">
      <div ref={stageRef} className="relative h-[380px] w-full sm:h-[min(48svh,480px)]">
        <motion.div
          className="cq-size absolute left-1/2 top-1/2 overflow-hidden rounded-[16px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)] ring-1 ring-white/15"
          initial={false}
          animate={{ width: w, height: h, x: "-50%", y: "-50%" }}
          transition={{ duration: 0.9, ease: EASE_IO }}
        >
          <AdScreen
            format={format}
            video={VIDEO.boxer}
            poster={IMG.fitness}
            brand="Pulse Fitness"
            handle="@pulse.boxing"
            site="pulsefit.club"
            captions={CAPTIONS}
            cta="Claim your free week"
            accent="#FF4D3D"
            step={step}
            interval={STEP_MS}
            topInset={false}
          />
        </motion.div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFormat(f.id)}
            className={cn(
              "rounded-xl px-3 py-2.5 text-left ring-1 ring-inset transition-colors duration-300 sm:px-4 sm:py-3",
              format === f.id ? "bg-bone text-ink ring-bone" : "text-bone/70 ring-white/12 hover:ring-white/30"
            )}
          >
            <div className="flex items-center justify-between text-sm font-medium">
              {f.label}
              <span className="font-mono text-[10px] opacity-60">{f.id}</span>
            </div>
            <div className="mt-0.5 hidden text-[11px] opacity-60 sm:block">{f.sub}</div>
          </button>
        ))}
      </div>

      <div className="relative mt-4 flex h-9 gap-1">
        {PHASES.map((p) => {
          const active = step >= p.from && step < p.to;
          return (
            <div
              key={p.label}
              className={cn(
                "flex items-center overflow-hidden rounded-md px-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500",
                active ? "bg-volt text-ink" : "bg-white/[0.06] text-bone/50"
              )}
              style={{ flex: p.to - p.from }}
            >
              {p.label}
              <span className="ml-auto hidden opacity-60 sm:inline">
                {p.from * 3}–{p.to * 3}s
              </span>
            </div>
          );
        })}
        {visible && (
          <div
            className="pointer-events-none absolute -inset-y-1 left-0 w-full"
            style={{ animation: `playhead ${STEP_MS * CAPTIONS.length}ms linear infinite` }}
          >
            <span className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-bone shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
          </div>
        )}
      </div>
    </div>
  );
}
