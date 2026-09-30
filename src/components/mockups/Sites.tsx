import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { IMG } from "@/lib/data";

/* ------------------------------------------------------------------ */
/* Frames                                                              */
/* ------------------------------------------------------------------ */
export function BrowserFrame({
  url,
  children,
  className,
  aspect = "aspect-[16/10]",
}: {
  url: string;
  children: ReactNode;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "@container relative w-full overflow-hidden rounded-[10px] bg-[#101010] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10",
        className
      )}
    >
      <div className="relative flex h-[3.1cqw] min-h-[14px] items-center gap-[0.7cqw] border-b border-white/[0.06] bg-[#1b1b1b] px-[1.4cqw]">
        <span className="size-[0.9cqw] min-h-[5px] min-w-[5px] rounded-full bg-[#ff5f57]" />
        <span className="size-[0.9cqw] min-h-[5px] min-w-[5px] rounded-full bg-[#febc2e]" />
        <span className="size-[0.9cqw] min-h-[5px] min-w-[5px] rounded-full bg-[#28c840]" />
        <div className="absolute left-1/2 top-1/2 flex h-[1.9cqw] min-h-[9px] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[0.5cqw] rounded-[0.5cqw] bg-white/[0.06] text-[1.05cqw] text-white/45">
          <svg viewBox="0 0 24 24" className="size-[0.9cqw]" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {url}
        </div>
      </div>
      <div className={cn("relative w-full overflow-hidden", aspect)}>{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full rounded-[15%/7%] bg-[#0c0c0c] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/15",
        className
      )}
    >
      <span className="absolute -left-[1.4%] top-[20%] h-[6%] w-[1.4%] rounded-l-sm bg-[#222]" />
      <span className="absolute -left-[1.4%] top-[28%] h-[9%] w-[1.4%] rounded-l-sm bg-[#222]" />
      <span className="absolute -right-[1.4%] top-[24%] h-[12%] w-[1.4%] rounded-r-sm bg-[#222]" />
      <div className="cq-size absolute inset-x-[3.4%] inset-y-[1.6%] overflow-hidden rounded-[12%/5.5%] bg-black">
        {children}
        <div className="pointer-events-none absolute left-1/2 top-[1.5%] z-30 h-[3.1%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Maison Aube — skincare                                              */
/* ------------------------------------------------------------------ */
export function AubeSite() {
  return (
    <div className="absolute inset-0 bg-[#EEE6DA] font-sans text-[#2A2018]">
      <div className="flex items-center justify-between px-[3.2cqw] py-[2.2cqw] text-[1.15cqw]">
        <span className="font-serif text-[2.3cqw] leading-none tracking-tight">Maison Aube</span>
        <div className="flex gap-[2.6cqw] opacity-70">
          <span>Shop</span>
          <span>Rituals</span>
          <span>Ingredients</span>
          <span>Journal</span>
        </div>
        <div className="flex items-center gap-[1.6cqw]">
          <span className="opacity-70">Search</span>
          <span className="rounded-full border border-[#2A2018]/25 px-[1.2cqw] py-[0.5cqw]">Bag (2)</span>
        </div>
      </div>
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-[3cqw] px-[3.2cqw] pt-[1.6cqw]">
        <div className="flex flex-col py-[1cqw]">
          <div className="font-mono text-[0.95cqw] uppercase tracking-[0.2em] text-[#9A6B43]">New — The Dawn Serum</div>
          <h3 className="mt-[1.6cqw] font-serif text-[7.4cqw] leading-[0.92] tracking-[-0.02em]">
            Skin care,
            <br />
            <em>simplified.</em>
          </h3>
          <p className="mt-[1.8cqw] max-w-[30cqw] text-[1.25cqw] leading-relaxed opacity-70">
            Clean, sensorial formulas made with nine ingredients or fewer. Nothing your skin doesn’t need.
          </p>
          <div className="mt-[2.4cqw] flex items-center gap-[1.4cqw] text-[1.15cqw]">
            <span className="rounded-full bg-[#2A2018] px-[2cqw] py-[1cqw] text-[#EEE6DA]">Shop the ritual</span>
            <span className="underline decoration-[#2A2018]/40 underline-offset-4">Take the skin quiz</span>
          </div>
          <div className="mt-auto flex items-center gap-[1cqw] pt-[2cqw] text-[1.05cqw]">
            <span className="tracking-[0.1em] text-[#9A6B43]">★★★★★</span>
            <span className="opacity-60">4.9 · 2,400+ reviews</span>
          </div>
        </div>
        <div className="relative h-[42cqw] overflow-hidden rounded-b-[1cqw] rounded-t-[20cqw]">
          <img src={IMG.skincare} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-x-[1.6cqw] bottom-[1.6cqw] flex items-center justify-between rounded-[1cqw] bg-white/70 px-[1.4cqw] py-[1cqw] text-[1.05cqw] backdrop-blur-md">
            <div>
              <div className="font-medium">Dawn Serum</div>
              <div className="opacity-60">30 ml · Vitamin C</div>
            </div>
            <div className="flex items-center gap-[1cqw]">
              <span>€48</span>
              <span className="grid size-[2.4cqw] place-items-center rounded-full bg-[#2A2018] text-[1.4cqw] text-[#EEE6DA]">
                +
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Northline — architecture                                            */
/* ------------------------------------------------------------------ */
export function NorthlineSite({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="absolute inset-0 bg-[#0d0d0d] font-sans text-white">
        <img src={IMG.architecture} alt="" className="absolute inset-0 size-full object-cover object-[60%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/50" />
        <div className="relative flex items-center justify-between px-[6cqw] pt-[15cqw] text-[3.4cqw]">
          <span className="text-[4cqw] font-semibold tracking-[0.3em]">NORTHLINE</span>
          <span className="flex flex-col gap-[1.4cqw]">
            <i className="block h-[0.5cqw] w-[6cqw] bg-white" />
            <i className="block h-[0.5cqw] w-[6cqw] bg-white" />
          </span>
        </div>
        <div className="absolute inset-x-[6cqw] bottom-[9cqw]">
          <div className="font-mono text-[2.8cqw] uppercase tracking-[0.2em] opacity-60">Selected — 01/12</div>
          <h3 className="mt-[3cqw] text-[15cqw] font-medium leading-[0.88] tracking-[-0.045em]">
            Spaces
            <br />
            that breathe.
          </h3>
          <div className="mt-[5cqw] flex items-center justify-between border-t border-white/25 pt-[4cqw] text-[3.4cqw]">
            <span>Casa Ribeira</span>
            <span>View project ↗</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 bg-[#0d0d0d] font-sans text-white">
      <img src={IMG.architecture} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />
      <div className="relative flex items-center justify-between px-[3cqw] py-[2.4cqw] text-[1.1cqw]">
        <span className="text-[1.45cqw] font-semibold tracking-[0.32em]">NORTHLINE</span>
        <div className="flex gap-[2.8cqw] opacity-80">
          <span>Projects</span>
          <span>Studio</span>
          <span>Journal</span>
          <span>Contact</span>
        </div>
        <span className="flex items-center gap-[0.8cqw]">
          Menu <span className="size-[0.6cqw] rounded-full bg-white" />
        </span>
      </div>
      <div className="absolute inset-x-[3cqw] bottom-[4.2cqw] flex items-end justify-between">
        <h3 className="text-[8.6cqw] font-medium leading-[0.88] tracking-[-0.045em]">
          Spaces that
          <br />
          breathe.
        </h3>
        <div className="mb-[1cqw] text-right text-[1.05cqw]">
          <div className="font-mono uppercase tracking-[0.2em] opacity-60">Selected — 01/12</div>
          <div className="mt-[0.6cqw] text-[1.4cqw]">Casa Ribeira, Portugal ↗</div>
        </div>
      </div>
      <div className="absolute inset-x-[3cqw] bottom-[2cqw] h-px bg-white/20">
        <div className="h-full w-1/4 bg-white" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ember & Oak — modern restaurant (desktop + compact)                 */
/* ------------------------------------------------------------------ */
export function EmberSite({ compact = false, inPhone = false }: { compact?: boolean; inPhone?: boolean }) {
  if (compact) {
    return (
      <div className="absolute inset-0 bg-[#140B07] font-sans text-[#F4E7D7]">
        <div
          className={cn(
            "flex items-center justify-between px-[5cqw] pb-[4cqw] text-[3.4cqw]",
            inPhone ? "pt-[14cqw]" : "pt-[5cqw]"
          )}
        >
          <span className="font-serif text-[6.4cqw] leading-none">
            Ember <em>&amp;</em> Oak
          </span>
          <span className="rounded-full bg-[#F08A4B] px-[3.6cqw] py-[1.8cqw] font-medium text-[#140B07]">Book</span>
        </div>
        <div className={cn("relative mx-[5cqw] overflow-hidden rounded-[4cqw]", inPhone ? "h-[72cqw]" : "h-[58cqw]")}>
          <img src={IMG.restaurant} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute left-[3cqw] top-[3cqw] flex items-center gap-[1.6cqw] rounded-full bg-black/55 px-[3cqw] py-[1.4cqw] text-[2.8cqw] backdrop-blur">
            <span className="size-[1.8cqw] rounded-full bg-[#5BE37D]" />
            Open tonight
          </div>
        </div>
        <div className="px-[5cqw] pt-[6cqw]">
          <div className="font-mono text-[2.7cqw] uppercase tracking-[0.2em] text-[#F08A4B]">Wood-fired since 1998</div>
          <h3 className="mt-[3cqw] text-[12.5cqw] font-medium leading-[0.9] tracking-[-0.045em]">
            Cooked over <span className="font-serif font-normal italic tracking-[-0.01em] text-[#F08A4B]">open fire.</span>
          </h3>
          <p className="mt-[4cqw] text-[3.6cqw] leading-relaxed opacity-70">
            Seasonal plates, live embers and a room full of good people.
          </p>
          <div className="mt-[5cqw] grid gap-[2.4cqw] text-center text-[3.6cqw]">
            <span className="rounded-full bg-[#F4E7D7] py-[3.4cqw] font-medium text-[#140B07]">Reserve a table</span>
            <span className="rounded-full border border-[#F4E7D7]/30 py-[3.4cqw]">View the menu</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 bg-[#140B07] font-sans text-[#F4E7D7]">
      <div className="flex items-center justify-between px-[3cqw] py-[2.2cqw] text-[1.1cqw]">
        <span className="font-serif text-[2.2cqw] leading-none">
          Ember <em>&amp;</em> Oak
        </span>
        <div className="flex gap-[2.6cqw] opacity-70">
          <span>Menu</span>
          <span>Private dining</span>
          <span>Our story</span>
          <span>Gift cards</span>
        </div>
        <span className="rounded-full bg-[#F08A4B] px-[1.6cqw] py-[0.8cqw] font-medium text-[#140B07]">Book a table</span>
      </div>
      <div className="grid grid-cols-2 gap-[3cqw] px-[3cqw] pt-[2cqw]">
        <div className="flex flex-col">
          <div className="flex items-center gap-[0.8cqw] font-mono text-[0.95cqw] uppercase tracking-[0.2em] text-[#F08A4B]">
            <span className="size-[0.7cqw] rounded-full bg-[#F08A4B]" />
            Wood-fired since 1998
          </div>
          <h3 className="mt-[2cqw] text-[6.6cqw] font-medium leading-[0.9] tracking-[-0.045em]">
            Cooked over
            <br />
            <span className="font-serif font-normal italic tracking-[-0.01em] text-[#F08A4B]">open fire.</span>
          </h3>
          <p className="mt-[2cqw] max-w-[34cqw] text-[1.25cqw] leading-relaxed opacity-70">
            Seasonal plates, live embers and a room full of good people. Tables open tonight from 17:00.
          </p>
          <div className="mt-[2.6cqw] flex gap-[1cqw] text-[1.15cqw]">
            <span className="rounded-full bg-[#F4E7D7] px-[2cqw] py-[1cqw] font-medium text-[#140B07]">Reserve a table</span>
            <span className="rounded-full border border-[#F4E7D7]/30 px-[2cqw] py-[1cqw]">View the menu</span>
          </div>
          <div className="mt-auto flex gap-[3.4cqw] pb-[1cqw] pt-[3cqw] text-[1cqw]">
            <div>
              <div className="text-[2.2cqw] font-medium">4.9★</div>
              <div className="opacity-50">Google reviews</div>
            </div>
            <div>
              <div className="text-[2.2cqw] font-medium">25 yrs</div>
              <div className="opacity-50">Family owned</div>
            </div>
            <div>
              <div className="text-[2.2cqw] font-medium">2 min</div>
              <div className="opacity-50">To book online</div>
            </div>
          </div>
        </div>
        <div className="relative h-[47cqw] overflow-hidden rounded-[1.4cqw]">
          <img src={IMG.restaurant} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute left-[1.4cqw] top-[1.4cqw] flex items-center gap-[0.7cqw] rounded-full bg-black/50 px-[1.2cqw] py-[0.6cqw] text-[1cqw] backdrop-blur">
            <span className="size-[0.7cqw] rounded-full bg-[#5BE37D]" />
            Open tonight · 17:00–23:00
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ember & Oak — the 2010 version (lovingly terrible)                  */
/* ------------------------------------------------------------------ */
const burst = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2;
  const r = i % 2 ? 36 : 50;
  return `${(50 + r * Math.cos(a)).toFixed(1)}% ${(50 + r * Math.sin(a)).toFixed(1)}%`;
}).join(",");

const comic = '"Comic Sans MS", "Comic Sans", "Chalkboard SE", "Comic Neue", cursive';

export function OldSite() {
  return (
    <div
      className="absolute inset-0 overflow-hidden text-black"
      style={{
        background: "repeating-conic-gradient(#c7d4ea 0% 25%, #dde5f2 0% 50%) 0 0 / 2.6cqw 2.6cqw",
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      <div className="mx-auto mt-[1.4cqw] w-[90%] border-[0.35cqw] border-[#8a8a8a] bg-white" style={{ borderStyle: "outset" }}>
        <div
          className="relative flex h-[8.6cqw] items-center justify-center"
          style={{ background: "linear-gradient(#fff7a8, #ffc21a 55%, #ff9900)" }}
        >
          <span
            className="text-[3.1cqw] font-bold text-[#cc0000]"
            style={{ fontFamily: comic, textShadow: "0.22cqw 0.22cqw 0 #ffff00, 0.42cqw 0.42cqw 0 #333" }}
          >
            ~*~ Welcome to Ember &amp; Oak Family Restaurant!!! ~*~
          </span>
          <span
            className="animate-blink absolute right-[1.4cqw] top-[0.8cqw] grid size-[6.4cqw] place-items-center text-[1.35cqw] font-bold text-[#ffff00]"
            style={{ background: "#e00000", clipPath: `polygon(${burst})`, fontFamily: '"Arial Black", Arial, sans-serif' }}
          >
            NEW!
          </span>
        </div>
        <div className="flex justify-center gap-[0.4cqw] bg-[#003399] p-[0.5cqw]">
          {["Home", "Our Menu", "About Us", "Photo Gallery", "Guestbook", "Contact Us"].map((l) => (
            <span
              key={l}
              className="px-[1.1cqw] py-[0.45cqw] text-[1.05cqw] font-bold text-white"
              style={{
                fontFamily: "Verdana, Geneva, sans-serif",
                background: "linear-gradient(#7aa6ff, #2a5ce0 50%, #0a37b0 51%, #2f67f2)",
                border: "0.2cqw outset #9bb8ff",
              }}
            >
              {l}
            </span>
          ))}
        </div>
        <div className="overflow-hidden whitespace-nowrap bg-black py-[0.35cqw] text-[1.15cqw] text-[#00ff00]" style={{ fontFamily: '"Courier New", monospace' }}>
          <div className="old-marquee inline-block">
            *** TRY OUR NEW LUNCH SPECIALS!!! *** NOW ACCEPTING VISA &amp; MASTERCARD *** OPEN 7 DAYS A WEEK ***
          </div>
        </div>
        <div className="flex gap-[1cqw] p-[1cqw]">
          <div className="w-[21%] border border-[#999] bg-[#ffffcc] p-[0.8cqw] text-[1.1cqw]">
            <div className="mb-[0.6cqw] bg-[#990000] px-[0.5cqw] text-[1.1cqw] font-bold text-white" style={{ fontFamily: "Arial, sans-serif" }}>
              Quick Links
            </div>
            <ul className="space-y-[0.3cqw] text-[#0000ee] underline">
              <li>» Home</li>
              <li>» Menu (PDF)</li>
              <li>» Directions</li>
              <li>» Guestbook</li>
            </ul>
            <div className="mt-[1cqw] text-center text-[1cqw]">You are visitor #</div>
            <div className="mt-[0.3cqw] flex justify-center gap-[0.2cqw]">
              {"004213".split("").map((d, i) => (
                <span key={i} className="bg-black px-[0.35cqw] text-[1.3cqw] text-[#39ff14]" style={{ fontFamily: '"Courier New", monospace' }}>
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1 text-[1.2cqw] leading-[1.35]">
            <h4 className="text-[2cqw] font-bold text-[#990000]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              About Us
            </h4>
            <hr className="my-[0.5cqw] border-[#999]" />
            <img
              src={IMG.restaurant}
              alt=""
              className="float-left mb-[0.5cqw] mr-[1cqw] w-[12.5cqw] border-[0.35cqw] border-[#777]"
              style={{ borderStyle: "ridge", filter: "saturate(1.9) contrast(1.35) brightness(1.2)" }}
            />
            <p>
              Ember &amp; Oak is a <b>family owned</b> restaurant since 1998. We serve the <span className="font-bold text-[#ff0000]">BEST</span>{" "}
              steaks in town!!! Come visit us today.
            </p>
            <p className="mt-[0.6cqw]">
              <span className="text-[#0000ee] underline">Click HERE</span> to see our menu.
            </p>
            <div
              className="clear-both mt-[1cqw] flex items-center justify-center py-[0.6cqw] text-[1cqw] font-bold"
              style={{ background: "repeating-linear-gradient(-45deg,#ffd000 0 1.2cqw,#111 1.2cqw 2.4cqw)" }}
            >
              <span className="bg-[#ffd000] px-[0.8cqw]" style={{ fontFamily: "Arial, sans-serif" }}>
                UNDER CONSTRUCTION — Online ordering coming soon!
              </span>
            </div>
          </div>
          <div className="w-[20%] text-[1.05cqw]">
            <div className="border-[0.25cqw] border-dashed border-[#ff00ff] bg-[#ccffff] p-[0.7cqw]" style={{ fontFamily: comic }}>
              <div className="font-bold text-[#ff00ff]">Todays Specials:</div>
              <ul className="mt-[0.3cqw] list-disc pl-[1.4cqw]">
                <li>Steak &amp; Fries $12.99</li>
                <li>Soup of the Day</li>
                <li>Kids eat FREE*</li>
              </ul>
            </div>
            <div className="mt-[0.8cqw] flex items-center gap-[0.5cqw] border border-[#999] bg-[#f0f0f0] p-[0.4cqw] text-[0.9cqw]" style={{ fontFamily: "Verdana, sans-serif" }}>
              <span className="grid size-[2cqw] shrink-0 place-items-center bg-[#e00000] font-bold text-white">f</span>
              Get Adobe Flash Player
            </div>
          </div>
        </div>
        <div className="border-t border-[#999] bg-[#eee] py-[0.5cqw] text-center text-[0.95cqw]">
          © 2009 Ember &amp; Oak. All Rights Reserved. | Site by Tony&apos;s Web Design | Last updated: 03/14/2011
        </div>
      </div>
      <p className="mt-[1cqw] text-center text-[1cqw] text-[#333]">
        <span className="text-[#0000ee] underline">Sign our Guestbook!</span> | <span className="text-[#0000ee] underline">Add to Favorites</span> |{" "}
        <i>Best viewed in Internet Explorer 6 at 1024x768</i>
      </p>
    </div>
  );
}
