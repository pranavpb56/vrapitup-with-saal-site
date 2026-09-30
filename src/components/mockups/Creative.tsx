import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/utils/cn";
import { IMG } from "@/lib/data";
import { EASE, useCycle } from "@/lib/hooks";
import { Icon, LazyVideo } from "@/components/ui";

type PosterProps = { className?: string };

/* ------------------------------------------------------------------ */
/* Posters                                                             */
/* ------------------------------------------------------------------ */
export function AeroPoster({ className }: PosterProps) {
  return (
    <div className={cn("@container relative isolate aspect-[3/4] w-full select-none overflow-hidden bg-black text-volt", className)}>
      <div className="absolute inset-x-0 top-[7cqw] text-center font-poster text-[44cqw] leading-[0.8] tracking-[-0.01em]">AERO</div>
      <img
        src={IMG.sneaker}
        alt=""
        className="absolute inset-0 size-full translate-y-[6%] scale-[1.18] object-cover mix-blend-screen"
      />
      <div className="absolute inset-x-[5cqw] top-[3.6cqw] flex justify-between font-mono text-[2.5cqw] uppercase tracking-[0.1em] text-white/70">
        <span>Aero Run Co.</span>
        <span>Drop 06.14</span>
      </div>
      <div className="absolute inset-x-[5cqw] bottom-[5cqw]">
        <div className="font-poster text-[10.5cqw] uppercase leading-[0.92] text-white">
          Run lighter
          <br />
          than <span className="text-volt">air.</span>
        </div>
        <div className="mt-[3cqw] flex items-center justify-between border-t border-white/25 pt-[2.4cqw] font-mono text-[2.4cqw] uppercase text-white/70">
          <span>Aero/01</span>
          <span>€180</span>
          <span className="text-volt">aerorun.co</span>
        </div>
      </div>
    </div>
  );
}

export function NightShiftPoster({ className }: PosterProps) {
  return (
    <div className={cn("@container relative isolate aspect-[3/4] w-full select-none overflow-hidden bg-black text-white", className)}>
      <img src={IMG.chrome} alt="" className="absolute inset-0 size-full scale-110 object-cover mix-blend-screen" />
      <div className="absolute inset-x-[5cqw] top-[4.5cqw] flex justify-between font-mono text-[2.5cqw] uppercase tracking-[0.12em] text-white/70">
        <span>Live Sessions</span>
        <span>Vol. 04</span>
      </div>
      <div className="absolute inset-x-0 top-[13cqw] text-center font-serif text-[31cqw] italic leading-[0.8] tracking-[-0.03em] mix-blend-difference">
        Night
        <br />
        Shift
      </div>
      <div className="absolute inset-x-[5cqw] bottom-[5cqw] flex items-end justify-between">
        <div className="font-mono text-[2.5cqw] uppercase leading-[1.55] text-white/80">
          22.08.26
          <br />
          Warehouse 9
          <br />
          Doors 22:00
        </div>
        <div className="rounded-full bg-volt px-[3.4cqw] py-[1.7cqw] font-sans text-[2.9cqw] font-semibold text-black">Tickets →</div>
      </div>
    </div>
  );
}

export function KoyaPoster({ className }: PosterProps) {
  const id = "koya" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div className={cn("@container relative isolate aspect-[3/4] w-full select-none overflow-hidden bg-[#EDE3D3] text-[#3A2618]", className)}>
      <div className="absolute inset-x-[6cqw] top-[5cqw] flex justify-between font-mono text-[2.4cqw] uppercase tracking-[0.12em]">
        <span>Kōya Coffee</span>
        <span>Est. 2016</span>
      </div>
      <div className="absolute left-1/2 top-[12cqw] h-[72cqw] w-[54cqw] -translate-x-1/2 overflow-hidden rounded-t-full">
        <img src={IMG.coffee} alt="" className="size-full object-cover" />
      </div>
      <div className="absolute right-[5cqw] top-[56cqw] grid size-[19cqw] place-items-center rounded-full bg-[#C4622D] text-[#EDE3D3]">
        <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full">
          <defs>
            <path id={id} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text fontSize="10" letterSpacing="2.4" fill="currentColor" fontFamily="JetBrains Mono, monospace">
            <textPath href={`#${id}`}>NEW ROAST · ETHIOPIA GUJI ·</textPath>
          </text>
        </svg>
        <span className="font-serif text-[5.4cqw] italic">new</span>
      </div>
      <div className="absolute inset-x-[6cqw] bottom-[5.5cqw]">
        <div className="font-serif text-[15cqw] leading-[0.85] tracking-[-0.02em]">
          Slow <em>mornings,</em>
          <br />
          strong coffee.
        </div>
        <div className="mt-[3cqw] flex justify-between font-mono text-[2.3cqw] uppercase">
          <span>Single origin</span>
          <span>Roasted weekly</span>
        </div>
      </div>
    </div>
  );
}

export function SummerPoster({ className }: PosterProps) {
  return (
    <div className={cn("@container relative isolate aspect-[3/4] w-full select-none overflow-hidden bg-[#ED3A11] text-[#F6EBDD]", className)}>
      <img
        src={IMG.fashion}
        alt=""
        className="absolute bottom-0 left-1/2 h-[86%] w-auto max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
      />
      <div className="absolute inset-x-[5cqw] top-[4cqw] flex justify-between font-mono text-[2.4cqw] uppercase tracking-[0.12em]">
        <span>Studio Solène</span>
        <span>SS/26</span>
      </div>
      <div className="absolute inset-x-0 top-[8cqw] text-center font-poster text-[12.6cqw] uppercase leading-none tracking-[0.01em]">
        The Summer Edit
      </div>
      <div className="absolute inset-x-[5cqw] bottom-[4.5cqw] flex items-end justify-between">
        <div className="text-outline font-poster text-[25cqw] leading-[0.8]">−40%</div>
        <div className="mb-[1cqw] text-right font-mono text-[2.3cqw] uppercase leading-[1.5]">
          Linen collection
          <br />
          48 hours only
        </div>
      </div>
    </div>
  );
}

export const POSTERS = [AeroPoster, NightShiftPoster, KoyaPoster, SummerPoster];

/* ------------------------------------------------------------------ */
/* Video ad screen (needs a size container parent → uses cqmin)        */
/* ------------------------------------------------------------------ */
export type AdFormat = "9:16" | "1:1" | "16:9";

function Highlight({ text, accent }: { text: string; accent: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? (
          <span key={i} style={{ color: accent }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function AdScreen({
  format = "9:16",
  video,
  poster,
  brand,
  handle,
  site,
  captions,
  cta,
  accent = "#D4FF3F",
  step,
  interval = 2200,
  topInset = true,
}: {
  format?: AdFormat;
  video: string;
  poster: string;
  brand: string;
  handle: string;
  site: string;
  captions: string[];
  cta: string;
  accent?: string;
  step?: number;
  interval?: number;
  topInset?: boolean;
}) {
  const [auto] = useCycle(captions.length, interval, step === undefined);
  const idx = step ?? auto;
  const capSize = format === "9:16" ? "text-[15cqmin]" : format === "1:1" ? "text-[12cqmin]" : "text-[12.5cqmin]";

  return (
    <div className="absolute inset-0 overflow-hidden bg-black font-sans text-white">
      <LazyVideo src={video} poster={poster} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/75" />

      <div className="absolute inset-x-[7cqmin] top-1/2 -translate-y-1/2 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, scale: 0.86, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, scale: 1.06, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: EASE }}
            className={cn("font-poster uppercase leading-[0.92] [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]", capSize)}
          >
            <Highlight text={captions[idx]} accent={accent} />
          </motion.div>
        </AnimatePresence>
      </div>

      {format === "9:16" && (
        <>
          <div className={cn("absolute inset-x-[4cqmin] flex gap-[1cqmin]", topInset ? "top-[12.5cqmin]" : "top-[4cqmin]")}>
            {captions.map((_, i) => (
              <div key={i} className="h-[0.9cqmin] flex-1 overflow-hidden rounded-full bg-white/30">
                {i < idx && <div className="h-full w-full bg-white" />}
                {i === idx && (
                  <div key={`f${idx}`} className="story-fill h-full w-full bg-white" style={{ animationDuration: `${interval}ms` }} />
                )}
              </div>
            ))}
          </div>
          <div className={cn("absolute inset-x-[4cqmin] flex items-center gap-[2.4cqmin]", topInset ? "top-[16.5cqmin]" : "top-[8cqmin]")}>
            <span className="grid size-[8cqmin] place-items-center rounded-full text-[3.6cqmin] font-bold text-black" style={{ background: accent }}>
              {brand[0]}
            </span>
            <div className="leading-tight">
              <div className="text-[3.6cqmin] font-semibold">{brand}</div>
              <div className="text-[2.8cqmin] opacity-70">Sponsored</div>
            </div>
            <span className="ml-auto text-[4.4cqmin] leading-none opacity-80">···</span>
          </div>
          <div className="absolute bottom-[30cqmin] right-[3.5cqmin] flex flex-col items-center gap-[4.5cqmin] text-[2.8cqmin]">
            <div className="flex flex-col items-center gap-[1cqmin]">
              <Icon.Heart className="size-[7.5cqmin]" />
              24.1K
            </div>
            <div className="flex flex-col items-center gap-[1cqmin]">
              <Icon.Comment className="size-[7cqmin]" />
              812
            </div>
            <div className="flex flex-col items-center gap-[1cqmin]">
              <Icon.Send className="size-[7cqmin]" />
              3.2K
            </div>
          </div>
          <div className="absolute inset-x-[4cqmin] bottom-[5cqmin]">
            <div className="text-[3.4cqmin] font-semibold">{handle}</div>
            <div className="mt-[0.8cqmin] text-[3cqmin] opacity-80">Tap to see more · {site}</div>
            <div
              className="shimmer relative mt-[3cqmin] flex items-center justify-between overflow-hidden rounded-[2.4cqmin] px-[4cqmin] py-[3cqmin] text-[3.6cqmin] font-semibold text-black"
              style={{ background: accent }}
            >
              {cta}
              <Icon.ArrowRight className="size-[4cqmin]" />
            </div>
          </div>
        </>
      )}

      {format === "1:1" && (
        <>
          <div className="absolute inset-x-0 top-0 flex items-center gap-[2.4cqmin] bg-gradient-to-b from-black/60 to-transparent p-[4cqmin]">
            <span className="grid size-[7cqmin] place-items-center rounded-full text-[3.2cqmin] font-bold text-black" style={{ background: accent }}>
              {brand[0]}
            </span>
            <div className="leading-tight">
              <div className="text-[3.4cqmin] font-semibold">{brand}</div>
              <div className="text-[2.6cqmin] opacity-70">Sponsored</div>
            </div>
            <span className="ml-auto text-[4cqmin] leading-none opacity-80">···</span>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 flex items-center justify-between px-[4cqmin] py-[3.4cqmin] text-[3.4cqmin] font-semibold text-black"
            style={{ background: accent }}
          >
            {cta}
            <Icon.ArrowRight className="size-[4cqmin]" />
          </div>
        </>
      )}

      {format === "16:9" && (
        <>
          <div className="absolute left-[3.5cqmin] top-[3.5cqmin] flex items-center gap-[2cqmin]">
            <span className="grid size-[8cqmin] place-items-center rounded-full text-[3.6cqmin] font-bold text-black" style={{ background: accent }}>
              {brand[0]}
            </span>
            <div className="leading-tight">
              <div className="text-[3.6cqmin] font-semibold">{brand} — Official</div>
              <div className="text-[2.8cqmin] opacity-70">{site}</div>
            </div>
          </div>
          <div className="absolute bottom-[6.5cqmin] left-[3.5cqmin] flex items-center gap-[2cqmin] text-[3cqmin]">
            <span className="rounded-[0.6cqmin] bg-[#F7C600] px-[1.2cqmin] py-[0.3cqmin] font-bold text-black">Ad</span>
            <span className="opacity-90">0:{String(Math.min(idx * 3, 14)).padStart(2, "0")} · {site}</span>
            <span className="rounded-full bg-[#3EA6FF] px-[3cqmin] py-[1cqmin] font-semibold text-black">{cta}</span>
          </div>
          <div className="absolute bottom-[6.5cqmin] right-0 flex items-center gap-[1.6cqmin] border border-white/30 bg-black/65 px-[3cqmin] py-[1.6cqmin] text-[3.2cqmin]">
            Skip Ad <Icon.Play className="size-[3cqmin]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[1cqmin] bg-white/25">
            <div
              className="h-full bg-[#F7C600] transition-[width] duration-700"
              style={{ width: `${((idx + 1) / captions.length) * 100}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
