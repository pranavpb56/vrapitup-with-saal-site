import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useApp } from "@/lib/context";
import { EMAIL } from "@/lib/data";
import { EASE, EASE_IO } from "@/lib/hooks";
import { Icon, RollText } from "@/components/ui";

const SERVICES = ["Website", "Posters & Visuals", "Video Ads", "Full upgrade"];
const BUDGETS = ["< ₹25k", "₹25k – ₹75k", "₹75k – ₹1.5L", "₹1.5L +"];
const TIMELINES = ["ASAP", "1–2 months", "Flexible"];

function presetToService(preset: string) {
  const p = preset.toLowerCase();
  if (p.includes("web") || p.includes("commerce")) return "Website";
  if (p.includes("poster") || p.includes("visual") || p.includes("art")) return "Posters & Visuals";
  if (p.includes("video") || p.includes("motion")) return "Video Ads";
  return null;
}

function Chips({ options, value, onToggle }: { options: string[]; value: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] ring-1 ring-inset transition-all duration-300",
              on ? "bg-bone text-ink ring-bone" : "text-bone/75 ring-white/15 hover:ring-white/40"
            )}
          >
            <span className={cn("grid overflow-hidden transition-all duration-300", on ? "w-4" : "w-0")}>
              <Icon.Check className="size-4" />
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">
        {label}
        {error && <span className="normal-case tracking-normal text-[#ff8a6b]">{error}</span>}
      </div>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  type = "text",
  className,
  autoComplete,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const id = useId();
  const base =
    "peer w-full resize-none border-b bg-transparent pb-3 pt-6 text-lg text-bone outline-none transition-colors duration-300 focus:border-volt";
  return (
    <div className={className}>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            rows={3}
            value={value}
            placeholder=" "
            onChange={(e) => onChange(e.target.value)}
            className={cn(base, error ? "border-[#ff8a6b]" : "border-white/15")}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            placeholder=" "
            autoComplete={autoComplete}
            onChange={(e) => onChange(e.target.value)}
            className={cn(base, error ? "border-[#ff8a6b]" : "border-white/15")}
          />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-0 top-6 text-lg text-bone/45 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-volt peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-2 text-sm text-[#ff8a6b]">{error}</p>}
    </div>
  );
}

function Success({ name, onDone }: { name: string; onDone: () => void }) {
  const first = name.trim().split(" ")[0] || "friend";
  return (
    <div className="flex min-h-full flex-col justify-center py-10">
      <svg viewBox="0 0 80 80" className="size-20 text-volt">
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        <motion.path
          d="M25 41l10 10 20-22"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
        />
      </svg>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
        <h2 className="mt-10 text-5xl font-medium tracking-[-0.045em] md:text-6xl">
          Thanks, <span className="font-serif font-normal italic">{first}.</span>
        </h2>
        <p className="mt-5 max-w-sm text-lg leading-snug text-bone/60">
          Your inquiry is in. Expect a reply from a real human within 24 hours — with a few first ideas.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="group mt-10 inline-flex h-14 items-center gap-3 rounded-full pl-6 pr-2 text-[15px] font-medium ring-1 ring-inset ring-white/20 transition-colors hover:bg-bone hover:text-ink"
        >
          Meanwhile, explore our work
          <span className="grid size-10 place-items-center rounded-full bg-volt text-ink">
            <Icon.ArrowRight className="size-4" />
          </span>
        </button>
      </motion.div>
    </div>
  );
}

export function ProjectDrawer() {
  const { drawerOpen, closeDrawer, drawerPreset, scrollTo } = useApp();
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    if (!drawerOpen) return;
    if (drawerPreset) {
      const s = presetToService(drawerPreset);
      if (s) setServices((prev) => (prev.includes(s) ? prev : [...prev, s]));
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, drawerPreset, closeDrawer]);

  useEffect(() => {
    if (drawerOpen || status !== "sent") return;
    const t = window.setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", company: "", message: "" });
      setServices([]);
      setBudget([]);
      setTimeline([]);
    }, 900);
    return () => window.clearTimeout(t);
  }, [drawerOpen, status]);

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Please enter a valid email";
    if (services.length === 0) errs.services = "Pick at least one";
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          services,
          budget,
          timeline,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Could not send enquiry");
      }

      setStatus("sent");
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      setErrors({
        submit: "Something went wrong. Please try again or email us directly.",
      });
      setStatus("idle");
    }
  };

  const toggleMulti = (v: string) => {
    setServices((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
    if (errors.services) setErrors((e) => ({ ...e, services: "" }));
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[80] bg-black/65 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={closeDrawer}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Start a project"
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[620px] flex-col bg-[#0f0f0f] text-bone ring-1 ring-white/10 md:inset-y-3 md:right-3 md:overflow-hidden md:rounded-[24px]"
            initial={{ x: "105%" }}
            animate={{ x: "0%" }}
            exit={{ x: "105%" }}
            transition={{ duration: 0.8, ease: EASE_IO }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-10 md:py-5">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60">
                <span className="size-1.5 rounded-full bg-volt" />
                New project
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close"
                className="grid size-10 place-items-center rounded-full bg-white/[0.06] transition-colors duration-300 hover:bg-bone hover:text-ink"
              >
                <Icon.Close className="size-5" />
              </button>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10">
              {status === "sent" ? (
                <Success
                  name={form.name}
                  onDone={() => {
                    closeDrawer();
                    window.setTimeout(() => scrollTo("#work"), 650);
                  }}
                />
              ) : (
                <form onSubmit={submit} noValidate>
                  <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
                    className="text-4xl font-medium leading-[0.95] tracking-[-0.045em] md:text-5xl"
                  >
                    Let’s make your business look <span className="font-serif font-normal italic">unforgettable.</span>
                  </motion.h2>
                  <p className="mt-4 text-bone/55">Tell us a little about your project. We reply within 24 hours — usually faster.</p>

                  <Field label="I’m interested in" error={errors.services}>
                    <Chips options={SERVICES} value={services} onToggle={toggleMulti} />
                  </Field>
                  <Field label="Budget">
                    <Chips options={BUDGETS} value={budget} onToggle={(v) => setBudget((b) => (b[0] === v ? [] : [v]))} />
                  </Field>
                  <Field label="Timeline">
                    <Chips options={TIMELINES} value={timeline} onToggle={(v) => setTimeline((t) => (t[0] === v ? [] : [v]))} />
                  </Field>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <Input label="Your name" value={form.name} onChange={set("name")} error={errors.name} autoComplete="name" />
                    <Input label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                  </div>
                  <Input className="mt-8" label="Company / current website (optional)" value={form.company} onChange={set("company")} />
                  <Input className="mt-8" label="What would you like to upgrade?" value={form.message} onChange={set("message")} multiline />

                  {errors.submit && (
                    <p className="mt-6 text-sm text-[#ff8a6b]" role="alert">
                      {errors.submit}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group mt-10 flex h-16 w-full items-center justify-between rounded-full bg-volt pl-8 pr-2.5 text-lg font-medium text-ink transition-opacity disabled:opacity-80"
                  >
                    {status === "sending" ? <span>Sending…</span> : <RollText>Send inquiry</RollText>}
                    <span className="grid size-11 place-items-center rounded-full bg-ink text-volt">
                      {status === "sending" ? (
                        <span className="size-4 animate-spin rounded-full border-2 border-volt border-t-transparent" />
                      ) : (
                        <Icon.ArrowRight className="size-5 transition-transform duration-500 ease-expo group-hover:translate-x-0.5" />
                      )}
                    </span>
                  </button>
                  <p className="mt-5 text-center text-xs text-bone/40">
                    Prefer email?{" "}
                    <a className="underline underline-offset-2 hover:text-volt" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
