import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition"; // NEW

import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import Property from "./pages/property_TEMP2";
import Gallery from "./pages/gallery";
import FAQ from "./pages/faq";
import Contact from "./pages/contact";
import Book from "./pages/book";

import OutlawLark from "./pages/OutlawLark";
import RestoreLark from "./pages/RestoreLark";
import StrategyLark from "./pages/StrategyLark";
import Accommodation from "./pages/Accommodation";

export default function App() {
  const location = useLocation(); // NEEDED for animation + scroll logic

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/property" element={<Property />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />

            {/* Optional sub-routes */}
            <Route path="/outlaw" element={<OutlawLark />} />
            <Route path="/restore" element={<RestoreLark />} />
            <Route path="/strategy" element={<StrategyLark />} />
            <Route path="/accommodation" element={<Accommodation />} />
          </Routes>
        </PageTransition>
      </main>
    </>
  );
}
