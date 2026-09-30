import { useCallback, useEffect, useState } from "react";
import { AppProvider, useApp } from "@/lib/context";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { ProjectDrawer } from "@/components/ProjectDrawer";
import { ProjectModal } from "@/components/ProjectModal";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { LatestProject } from "@/components/sections/LatestProject";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

function Site() {
  const { setLock } = useApp();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => setLock("loader", !ready), [ready, setLock]);

  const onReveal = useCallback(() => setReady(true), []);
  const onDone = useCallback(() => setLoading(false), []);

  return (
    <>
      <Cursor />
      {loading && <Loader onReveal={onReveal} onDone={onDone} />}
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Manifesto />
        <Services />
        <BeforeAfter />
        <LatestProject />
        <WhyUs />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
      <ProjectDrawer />
      <ProjectModal />
      <div className="grain" aria-hidden />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Site />
    </AppProvider>
  );
}
