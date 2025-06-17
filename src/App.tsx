import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";

import Home from "./pages/home";
import About from "./pages/about";
import Experience from "./pages/experience";
import OutlawLark from "./pages/experiences/Outlaw";
import RestoreLark from "./pages/experiences/Restore";
import StrategyLark from "./pages/experiences/Strategy";
import Basecamp from "./pages/basecamp";
import FAQ from "./pages/faq";
import Start from "./pages/start";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/experience/outlaw" element={<OutlawLark />} />
            <Route path="/experience/restore" element={<RestoreLark />} />
            <Route path="/experience/strategy" element={<StrategyLark />} />
            <Route path="/basecamp" element={<Basecamp />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/start" element={<Start />} />
          </Routes>
        </PageTransition>
      </main>
    </>
  );
}
