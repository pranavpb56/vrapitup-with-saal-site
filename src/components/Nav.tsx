import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { useApp } from "@/lib/context";
import { EMAIL } from "@/lib/data";
import { EASE, EASE_IO } from "@/lib/hooks";
import { Button, Icon, RollText } from "@/components/ui";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-6", className)} aria-hidden>
      <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="3.6" />
      <circle cx="25.5" cy="6.5" r="3.4" fill="#d4ff3f" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("group inline-flex items-center gap-2 text-[19px] font-semibold tracking-[-0.045em]", className)}>
      <LogoMark className="transition-transform duration-700 ease-expo group-hover:rotate-[360deg]" />
      <span>
        vrapitup<sup className="ml-0.5 text-[10px] font-medium">®</sup>
      </span>
    </span>
  );
}

const LINKS = [
  { label: "Latest", href: "#latest" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export function Nav({ ready }: { ready: boolean }) {
  const { scrollTo, openDrawer, setLock } = useApp();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (!menu) setHidden(y > prev && y > 240);
  });

  useEffect(() => setLock("menu", menu), [menu, setLock]);

  const go = (href: string) => {
    const wasOpen = menu;
    setMenu(false);
    window.setTimeout(() => scrollTo(href), wasOpen ? 450 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: "-110%" }}
        animate={{ y: ready && (!hidden || menu) ? "0%" : "-110%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "flex items-center justify-between border-b px-5 py-3.5 transition-[background-color,border-color,backdrop-filter] duration-500 md:px-8 md:py-4",
            scrolled && !menu ? "border-white/[0.06] bg-ink/65 backdrop-blur-xl" : "border-transparent"
          )}
        >
          <a
            href="#top"
            aria-label="vrapitup — home"
            onClick={(e) => {
              e.preventDefault();
              setMenu(false);
              scrollTo(0);
            }}
          >
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-bone/70 transition-colors hover:text-bone"
              >
                <span className="font-mono text-[10px] text-bone/35">0{i + 1}</span>
                <RollText>{l.label}</RollText>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 pr-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/55 xl:flex">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-volt opacity-60" />
                <span className="relative size-2 rounded-full bg-volt" />
              </span>
              2 spots left for Q3
            </div>
            <button
              type="button"
              onClick={() => openDrawer()}
              className="group hidden h-10 items-center gap-2.5 rounded-full bg-bone pl-4 pr-1.5 text-sm font-medium text-ink transition-colors duration-500 hover:bg-volt sm:inline-flex"
            >
              <RollText>Start a Project</RollText>
              <span className="grid size-7 place-items-center rounded-full bg-ink text-bone">
                <Icon.ArrowUpRight className="size-3.5 transition-transform duration-500 ease-expo group-hover:rotate-45" />
              </span>
            </button>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="grid size-10 place-items-center rounded-full bg-white/[0.08] md:hidden"
            >
              {menu ? <Icon.Close className="size-5" /> : <Icon.Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-8 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.8, ease: EASE_IO }}
          >
            <nav className="flex flex-col">
              {LINKS.map((l, i) => (
                <div key={l.href} className="overflow-hidden border-b border-white/10">
                  <motion.a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                    className="flex items-baseline justify-between py-4 text-5xl font-medium tracking-[-0.045em]"
                  >
                    {l.label}
                    <span className="font-mono text-xs tracking-normal text-bone/40">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <Button
                size="lg"
                className="w-full justify-between"
                onClick={() => {
                  setMenu(false);
                  openDrawer();
                }}
              >
                Start a Project
              </Button>
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-bone/50">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <span>Instagram ↗</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
