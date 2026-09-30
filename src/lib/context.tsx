import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Project } from "./data";

type ScrollTarget = string | number | HTMLElement;

type AppContextValue = {
  scrollTo: (target: ScrollTarget, offset?: number) => void;
  setLock: (key: string, locked: boolean) => void;
  drawerOpen: boolean;
  drawerPreset: string | null;
  openDrawer: (preset?: string) => void;
  closeDrawer: () => void;
  project: Project | null;
  openProject: (p: Project) => void;
  closeProject: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(new Set<string>());

  const applyLock = useCallback(() => {
    const lenis = lenisRef.current;
    const locked = locks.current.size > 0;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  const setLock = useCallback(
    (key: string, locked: boolean) => {
      if (locked) locks.current.add(key);
      else locks.current.delete(key);
      applyLock();
    },
    [applyLock]
  );

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
    });
    lenisRef.current = lenis;
    applyLock();
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [applyLock]);

  const scrollTo = useCallback((target: ScrollTarget, offset = 0) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.6, force: true });
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPreset, setDrawerPreset] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => setLock("drawer", drawerOpen), [drawerOpen, setLock]);
  useEffect(() => setLock("project", project !== null), [project, setLock]);

  const openDrawer = useCallback((preset?: string) => {
    setDrawerPreset(preset ?? null);
    setDrawerOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openProject = useCallback((p: Project) => setProject(p), []);
  const closeProject = useCallback(() => setProject(null), []);

  const value = useMemo(
    () => ({
      scrollTo,
      setLock,
      drawerOpen,
      drawerPreset,
      openDrawer,
      closeDrawer,
      project,
      openProject,
      closeProject,
    }),
    [scrollTo, setLock, drawerOpen, drawerPreset, openDrawer, closeDrawer, project, openProject, closeProject]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
