import { useId, useState } from "react";
import { cn } from "@/utils/cn";
import { useApp } from "@/lib/context";
import { EMAIL } from "@/lib/data";
import { Eyebrow, Icon, Line, Magnetic } from "@/components/ui";

function Outdated() {
  const [modern, setModern] = useState(false);
  const [k, setK] = useState(0);
  const flip = (v: boolean) => {
    setModern(v);
    setK((n) => n + 1);
  };
  return (
    <button
      type="button"
      data-cursor="Upgrade"
      aria-label="outdated"
      onMouseEnter={() => flip(true)}
      onMouseLeave={() => flip(false)}
      onClick={() => flip(!modern)}
      className="relative inline-block align-baseline"
    >
      <span
        key={k}
        className={cn("inline-block", k > 0 && "glitch")}
        style={
          modern
            ? { fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em" }
            : {
                fontFamily: '"Times New Roman", Times, serif',
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#0000EE",
                textDecoration: "underline",
                textDecorationThickness: "0.05em",
                textUnderlineOffset: "0.1em",
              }
        }
      >
        outdated
      </span>
    </button>
  );
}

export function FinalCTA() {
  const { openDrawer } = useApp();
  const id = "cta" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <section
      id="contact"
      className="relative z-30 -mt-12 overflow-hidden rounded-[32px] bg-volt px-5 py-24 text-ink md:-mt-16 md:rounded-[48px] md:px-8 md:py-36"
    >
      <div className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex items-center justify-between gap-4">
          <Eyebrow index="07" dotClass="bg-ink">
            Let’s talk
          </Eyebrow>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">Replies within 24h</span>
        </div>

        <h2 className="mt-12 text-[clamp(3rem,10.6vw,11.5rem)] font-medium leading-[0.88] tracking-[-0.06em] md:mt-16">
          <Line>Ready to stop</Line>
          <Line delay={0.08}>
            looking <Outdated />?
          </Line>
        </h2>

        <div className="mt-14 grid items-end gap-12 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="max-w-md text-xl leading-snug md:text-2xl">Let’s build something your customers actually remember.</p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-10 inline-flex items-center gap-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl md:text-5xl"
            >
              <span className="relative">
                {EMAIL}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-ink/20" />
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-expo group-hover:scale-x-100" />
              </span>
              <Icon.ArrowUpRight className="size-7 transition-transform duration-500 ease-expo group-hover:rotate-45 md:size-10" />
            </a>
          </div>
          <div className="flex md:col-span-5 md:justify-end">
            <Magnetic strength={0.35}>
              <button
                type="button"
                onClick={() => openDrawer()}
                className="group relative grid size-44 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 ease-expo hover:scale-105 md:size-60"
              >
                <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-2 text-bone/55" aria-hidden>
                  <defs>
                    <path id={id} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                  </defs>
                  <text fontSize="13" letterSpacing="5" fill="currentColor" fontFamily="JetBrains Mono, monospace">
                    <textPath href={`#${id}`}>START A PROJECT · START A PROJECT · START A PROJECT ·</textPath>
                  </text>
                </svg>
                <span className="flex flex-col items-center gap-2 text-base font-medium md:text-lg">
                  Start a Project
                  <span className="grid size-10 place-items-center rounded-full bg-volt text-ink transition-transform duration-500 ease-expo group-hover:rotate-[-45deg] md:size-12">
                    <Icon.ArrowRight className="size-5" />
                  </span>
                </span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
