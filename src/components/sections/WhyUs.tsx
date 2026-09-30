import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/hooks";
import { Eyebrow, FadeUp, Icon, Line } from "@/components/ui";

const REASONS = [
  { icon: Icon.Spark, title: "Modern-first design", text: "Built for how people browse today — not how they did in 2010." },
  { icon: Icon.Pen, title: "Custom experiences", text: "No templates. Every layout, visual and interaction is made for you." },
  { icon: Icon.Phone, title: "Mobile-first development", text: "Flawless on the phone in your customer’s hand — where most visits happen." },
  { icon: Icon.Target, title: "Attention-grabbing visuals", text: "Creative that stops the scroll and makes people look twice." },
  { icon: Icon.Bolt, title: "Fast execution", text: "Most projects go live in 2–4 weeks. Not months. Not ‘soon’." },
  { icon: Icon.Chart, title: "Business-focused design", text: "Every decision tied to leads, bookings and sales — not just looks." },
];

const STATS = [
  { to: 150, decimals: 0, suffix: "+", label: "Projects launched" },
  { to: 3.2, decimals: 1, suffix: "×", label: "Avg. engagement lift" },
  { to: 14, decimals: 0, suffix: " days", label: "Avg. time to launch" },
  { to: 4.9, decimals: 1, suffix: "/5", label: "Client rating" },
];

function Relevant() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="relative inline-block font-serif font-normal italic tracking-[-0.02em]">
      <motion.span
        className="absolute inset-x-[-0.05em] bottom-[0.12em] h-[0.36em] origin-left bg-volt"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
      />
      <span className="relative">relevant.</span>
    </span>
  );
}

function Counter({ to, decimals, suffix }: { to: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(decimals)}
      <span className="text-ink/35">{suffix}</span>
    </span>
  );
}

export function WhyUs() {
  return (
    <section id="about" className="relative z-10 rounded-t-[32px] bg-bone px-5 pb-40 pt-24 text-ink md:rounded-t-[48px] md:px-8 md:pb-56 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow index="05" dotClass="bg-ink">
          Why vrapitup
        </Eyebrow>
        <h2 className="mt-10 text-[clamp(2.4rem,6.4vw,6.8rem)] font-medium leading-[0.95] tracking-[-0.055em]">
          <Line>
            <span className="text-ink/30">We don’t just make</span>
          </Line>
          <Line delay={0.06}>
            <span className="text-ink/30">things look good.</span>
          </Line>
          <Line delay={0.12}>We make businesses</Line>
          <Line delay={0.18}>
            look <Relevant />
          </Line>
        </h2>

        <div className="mt-20 grid gap-px overflow-hidden border-y border-ink/15 bg-ink/15 sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
          {REASONS.map((r, i) => {
            const I = r.icon;
            return (
              <div key={r.title} className="group relative bg-bone p-8 md:p-10">
                <div className="absolute inset-0 origin-bottom scale-y-0 bg-volt transition-transform duration-700 ease-expo group-hover:scale-y-100" />
                <FadeUp delay={(i % 3) * 0.08} className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-full ring-1 ring-ink/15 transition-all duration-500 ease-expo group-hover:rotate-[20deg] group-hover:bg-ink group-hover:text-volt group-hover:ring-ink">
                      <I className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-ink/40">0{i + 1}</span>
                  </div>
                  <h3 className="mt-14 text-2xl font-medium tracking-[-0.035em] md:mt-20 md:text-[1.8rem]">{r.title}</h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink/60">{r.text}</p>
                </FadeUp>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-28 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08} className="border-t border-ink/15 pt-6">
              <div className="text-[clamp(2.8rem,5.4vw,5.6rem)] font-medium leading-none tracking-[-0.06em]">
                <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">{s.label}</div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-24 grid gap-10 md:mt-36 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow dotClass="bg-ink">Client words</Eyebrow>
          </div>
          <blockquote className="md:col-span-9">
            <p className="font-serif text-[clamp(1.9rem,3.7vw,3.8rem)] leading-[1.05] tracking-[-0.01em]">
              “Customers now tell us they chose us <em className="text-ink/45">because of the website.</em> In twenty-five years, that had
              never happened before.”
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-ink font-serif text-lg italic text-volt">MB</span>
              <div>
                <div className="font-medium">Marco Bellini</div>
                <div className="text-sm text-ink/55">Owner, Ember &amp; Oak</div>
              </div>
            </footer>
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}
