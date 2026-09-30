import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

const INTERACTIVE = 'a, button, [role="button"], [role="slider"], input, textarea, select, label, [data-hover]';

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;
    let shown = false;
    let scrollQueued = false;

    const resolve = (el: Element | null) => {
      if (!el) return;
      const c = el.closest<HTMLElement>("[data-cursor]");
      setLabel(c?.dataset.cursor ?? null);
      setHover(!!el.closest(INTERACTIVE));
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown && ref.current) {
        shown = true;
        x = tx;
        y = ty;
        ref.current.style.opacity = "1";
      }
    };
    const over = (e: PointerEvent) => resolve(e.target instanceof Element ? e.target : null);
    const onScroll = () => {
      if (scrollQueued || !shown) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        resolve(document.elementFromPoint(tx, ty));
      });
    };
    const leave = () => {
      shown = false;
      if (ref.current) ref.current.style.opacity = "0";
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-300",
        !label && "mix-blend-difference"
      )}
    >
      <div
        className={cn(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,scale] duration-500 ease-expo",
          label ? "size-24 bg-volt text-ink" : hover ? "size-14 bg-bone" : "size-3 bg-bone",
          down && "scale-[0.8]"
        )}
      >
        {label && <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em]">{label}</span>}
      </div>
    </div>
  );
}
