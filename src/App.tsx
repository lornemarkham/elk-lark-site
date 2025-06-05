import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import OutlawLark from "./pages/OutlawLark";
import RestoreLark from "./pages/RestoreLark";
import StrategyLark from "./pages/StrategyLark";
import Accommodation from "./pages/Accommodation";


export default function App() {
  return (
    <div>
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo-no-slogan.png" alt="ELK Lark logo" className="h-10 w-auto" />
          {/* Optional text backup */}
          <span className="sr-only">ELK Lark</span>
        </Link>

        <nav className="hidden md:flex space-x-6 text-brand font-semibold">
          <Link to="/outlaw">Outlaw</Link>
          <Link to="/restore">Restore</Link>
          <Link to="/strategy">Strategy</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/outlaw" element={<OutlawLark />} />
        <Route path="/restore" element={<RestoreLark />} />
        <Route path="/strategy" element={<StrategyLark />} />
        <Route path="/accommodation" element={<Accommodation />} />
      </Routes>
    </div>
  );
}