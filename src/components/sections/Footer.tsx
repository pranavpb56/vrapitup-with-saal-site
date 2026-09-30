import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/context";
import { EMAIL, PHONES, SOCIALS } from "@/lib/data";
import { EASE } from "@/lib/hooks";
import { Logo } from "@/components/Nav";

type LinkItem = { label: string; href: string; external?: boolean };

function Col({ title, items }: { title: string; items: LinkItem[] }) {
  const { scrollTo } = useApp();
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/40">{title}</div>
      <ul className="mt-5 space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noreferrer" : undefined}
              onClick={(e) => {
                if (it.external) return;
                e.preventDefault();
                scrollTo(it.href);
              }}
              className="group inline-flex items-center gap-1.5 text-[15px] text-bone/80 transition-colors hover:text-volt"
            >
              {it.label}
              {it.external && <span className="text-bone/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { scrollTo } = useApp();
  const [time, setTime] = useState("");
  useEffect(() => {
    const f = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    f();
    const id = window.setInterval(f, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="relative overflow-hidden px-5 pb-6 pt-24 md:px-8 md:pt-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-2xl" />
            <p className="mt-5 max-w-xs leading-relaxed text-bone/55">
              A creative studio for businesses that refuse to look outdated. Websites, visuals and video ads.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/60 ring-1 ring-white/10">
              <span className="size-1.5 animate-pulse rounded-full bg-volt" />
              Booking projects for Q3
            </div>
          </div>
          <div className="lg:col-span-2">
            <Col
              title="Services"
              items={[
                { label: "Websites", href: "#services" },
                { label: "Posters & Visuals", href: "#services" },
                { label: "Video Ads", href: "#services" },
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <Col
              title="Studio"
              items={[
                { label: "Latest", href: "#latest" },
                { label: "About", href: "#about" },
                { label: "Process", href: "#process" },
                { label: "Contact", href: "#contact" },
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <Col title="Social" items={SOCIALS.map((s) => ({ ...s, external: true }))} />
          </div>
          <div className="lg:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/40">Contact</div>
            <a href={`mailto:${EMAIL}`} className="mt-5 block text-[15px] text-bone/80 transition-colors hover:text-volt">
              {EMAIL}
            </a>
            <div className="mt-4 space-y-1.5">
              {PHONES.map((phone) => (
                <a
                  key={phone}
                  href={`tel:+91${phone}`}
                  className="block text-[15px] text-bone/70 transition-colors hover:text-volt"
                >
                  +91 {phone}
                </a>
              ))}
            </div>
            <p className="mt-3 text-[15px] text-bone/50">Remote-first · Worldwide</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/40">
              Local time <span className="text-bone/70">{time}</span>
            </p>
          </div>
        </div>

        <div className="mt-24 select-none md:mt-32" aria-hidden>
          <motion.div
            className="flex items-start overflow-hidden text-[22.5vw] font-semibold leading-[0.8] tracking-[-0.075em]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          >
            {"vrapitup".split("").map((l, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { y: "100%" },
                  show: { y: "0%", transition: { duration: 1.2, ease: EASE, delay: i * 0.05 } },
                }}
              >
                {l}
              </motion.span>
            ))}
            <motion.span
              className="ml-[0.04em] mt-[0.06em] inline-block text-[0.18em] font-medium tracking-normal text-volt"
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE, delay: 0.5 } },
              }}
            >
              ®
            </motion.span>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/45 md:flex-row md:items-center md:justify-between">
          <span>© 2026 vrapitup studio. All rights reserved.</span>
          <div className="flex flex-wrap gap-6">
            <span>Privacy</span>
            <span>Imprint</span>
            <button type="button" onClick={() => scrollTo(0)} className="transition-colors hover:text-volt">
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
