import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Property from "./pages/property";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/Faq";
import Contact from "./pages/Contact";
import Book from "./pages/Book";

// Optional sub-pages if you're using them
import OutlawLark from "./pages/OutlawLark";
import RestoreLark from "./pages/RestoreLark";
import StrategyLark from "./pages/StrategyLark";
import Accommodation from "./pages/Accommodation";

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />             {/* The ELK Stor test with wit test again Services */}
          <Route path="/services" element={<Services />} />       {/* Your Experience */}
          <Route path="/property" element={<Property />} />       {/* Basecamp */}
          <Route path="/gallery" element={<Gallery />} />         {/* The Lark Life */}
          <Route path="/faq" element={<FAQ />} />                 {/* What to Expect */}
          <Route path="/contact" element={<Contact />} />         {/* Get in Touch */}
          <Route path="/book" element={<Book />} />               {/* Start Your Lark */}

          {/* Optional sub-routes */}
          <Route path="/outlaw" element={<OutlawLark />} />
          <Route path="/restore" element={<RestoreLark />} />
          <Route path="/strategy" element={<StrategyLark />} />
          <Route path="/accommodation" element={<Accommodation />} />
        </Routes>
      </main>
    </>
  );
}

