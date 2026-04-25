import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";

import Home from "./pages/home";
import About from "./pages/about";
import Experience from "./pages/experience";
import OutlawLark from "./pages/experiences/outlaw";
import RestoreLark from "./pages/experiences/restore";
import StrategyLark from "./pages/experiences/strategy";
import Basecamp from "./pages/basecamp";
import Packages from "./pages/packages";
import GuestExperiences from "./pages/guest-experiences";
import WellnessRetreats from "./pages/wellness-retreats";
import MicroWeddings from "./pages/micro-weddings";
import GroupGetaways from "./pages/group-getaways";
import StartYourLark from "./pages/start-your-lark";
import FAQ from "./pages/faq";
import Privacy from "./pages/privacy";
import TheLarkLife from "./pages/the-lark-life";
import Contact from "./pages/contact";
import { SeasonProvider } from "./state/SeasonContext";


export default function App() {
  const location = useLocation();

  return (
    <>
     <SeasonProvider>
      <Header />
      <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/experiences/outlaw" element={<OutlawLark />} />
            <Route path="/experiences/restore" element={<RestoreLark />} />
            <Route path="/experiences/strategy" element={<StrategyLark />} />
            <Route path="/basecamp" element={<Basecamp />} />
            <Route path="/the-lark-life" element={<TheLarkLife />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wellness-retreats" element={<WellnessRetreats />} />
            <Route path="/micro-weddings" element={<MicroWeddings />} />
            <Route path="/group-getaways" element={<GroupGetaways />} />
            <Route path="/start-your-lark" element={<StartYourLark />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/guest-experiences" element={<GuestExperiences />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/start" element={<Navigate to="/start-your-lark" replace />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </PageTransition>
      </main>
      </SeasonProvider>
    </>
  );
}
