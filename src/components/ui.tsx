import { motion, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type SVGProps } from "react";
import { cn } from "@/utils/cn";
import { EASE } from "@/lib/hooks";

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
type IconProps = SVGProps<SVGSVGElement>;
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const Icon = {
  ArrowUpRight: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  ),
  ArrowRight: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  ),
  ArrowDown: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 4v16M6 14l6 6 6-6" />
    </svg>
  ),
  ArrowLeft: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M20 12H4M10 6l-6 6 6 6" />
    </svg>
  ),
  Close: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Check: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  ),
  Heart: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  ),
  Comment: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.1A8 8 0 1 1 20 12Z" />
    </svg>
  ),
  Send: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
    </svg>
  ),
  Play: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
    </svg>
  ),
  Monitor: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  Tablet: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  Phone: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 5.5h2" />
    </svg>
  ),
  Spark: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 3c.6 4.6 3.4 7.4 8 8-4.6.6-7.4 3.4-8 8-.6-4.6-3.4-7.4-8-8 4.6-.6 7.4-3.4 8-8Z" />
    </svg>
  ),
  Pen: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20ZM13.5 7.5l3 3" />
    </svg>
  ),
  Target: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  ),
  Bolt: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12l1-8Z" />
    </svg>
  ),
  Chart: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </svg>
  ),
  Menu: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M4 9h16M4 15h16" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/* Magnetic hover wrapper                                              */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 170, damping: 14, mass: 0.35 });
  const y = useSpring(0, { stiffness: 170, damping: 14, mass: 0.35 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Letter-staggered roll text (use inside an element with `group`)     */
/* ------------------------------------------------------------------ */
export function RollText({ children, className }: { children: string; className?: string }) {
  const chars = Array.from(children);
  const row = (hidden: boolean) =>
    chars.map((ch, i) => (
      <span
        key={i}
        className={cn(
          "inline-block transition-transform duration-[650ms] ease-expo",
          hidden ? "translate-y-full group-hover:translate-y-0" : "group-hover:-translate-y-full"
        )}
        style={{ transitionDelay: `${i * 16}ms` }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));
  return (
    <span className={cn("relative inline-flex overflow-hidden leading-[1.2]", className)}>
      <span className="inline-flex">{row(false)}</span>
      <span aria-hidden className="absolute inset-0 inline-flex">
        {row(true)}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Pill buttons                                                        */
/* ------------------------------------------------------------------ */
type ButtonVariant = "primary" | "ghost" | "dark";
const variants: Record<ButtonVariant, { root: string; sweep: string; dot: string }> = {
  primary: {
    root: "bg-volt text-ink",
    sweep: "bg-bone",
    dot: "bg-ink text-volt",
  },
  ghost: {
    root: "text-bone ring-1 ring-inset ring-bone/25 hover:text-ink",
    sweep: "bg-bone",
    dot: "bg-bone/10 text-bone group-hover:bg-ink group-hover:text-bone",
  },
  dark: {
    root: "bg-ink text-bone hover:text-ink",
    sweep: "bg-bone",
    dot: "bg-volt text-ink",
  },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  className,
  icon = "arrow",
}: {
  children: string;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: "arrow" | "down";
}) {
  const v = variants[variant];
  const cls = cn(
    "group relative isolate inline-flex items-center gap-4 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-500 ease-expo",
    size === "lg" ? "h-16 pl-8 pr-2.5 text-lg" : "h-13 pl-6 pr-2 text-[15px]",
    v.root,
    className
  );
  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 translate-y-[101%] rounded-full transition-transform duration-[600ms] ease-expo group-hover:translate-y-0",
          v.sweep
        )}
      />
      <RollText>{children}</RollText>
      <span
        className={cn(
          "grid place-items-center rounded-full transition-all duration-500 ease-expo",
          size === "lg" ? "size-11" : "size-9",
          v.dot
        )}
      >
        {icon === "down" ? (
          <Icon.ArrowDown className="size-4 transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
        ) : (
          <Icon.ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-45" />
        )}
      </span>
    </>
  );
  if (href)
    return (
      <a href={href} onClick={onClick} className={cls}>
        {content}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Masked line reveal                                                  */
/* ------------------------------------------------------------------ */
export function Line({
  children,
  delay = 0,
  show,
  className,
}: {
  children: ReactNode;
  delay?: number;
  show?: boolean;
  className?: string;
}) {
  const transition = { duration: 1.25, ease: EASE, delay };
  const mask = cn("block overflow-hidden pb-[0.14em] -mb-[0.14em]", className);
  // The observer must live on the (unclipped) mask — the inner span starts fully
  // clipped by overflow-hidden, so observing it directly would never fire.
  if (show === undefined) {
    return (
      <motion.span className={mask} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -8% 0px" }}>
        <motion.span
          className="block will-change-transform"
          variants={{ hidden: { y: "115%" }, show: { y: "0%", transition } }}
        >
          {children}
        </motion.span>
      </motion.span>
    );
  }
  return (
    <span className={mask}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%" }}
        animate={{ y: show ? "0%" : "115%" }}
        transition={transition}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
  y = 32,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  index,
  children,
  className,
  dotClass = "bg-volt",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  dotClass?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]", className)}>
      <span className={cn("size-1.5 rounded-full", dotClass)} />
      {index && <span className="opacity-50">({index})</span>}
      <span>{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lazy, in-view-only video with still fallback                        */
/* ------------------------------------------------------------------ */
export function LazyVideo({
  src,
  poster,
  className,
  kenburns = true,
}: {
  src: string;
  poster: string;
  className?: string;
  kenburns?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setLoad(true);
      },
      { rootMargin: "150px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load) return;
    v.muted = true;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, load]);

  return (
    <div ref={wrapRef} className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
      <img
        src={poster}
        alt=""
        decoding="async"
        className={cn("absolute inset-0 size-full object-cover", kenburns && "animate-kenburns")}
      />
      {!failed && (
        <video
          ref={videoRef}
          src={load ? src : undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          onPlaying={() => setReady(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
