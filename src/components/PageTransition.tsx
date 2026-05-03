import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const raw = location.hash;
    if (raw && raw !== "#") {
      const id = decodeURIComponent(raw.slice(1));
      const scrollToTarget = () => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      };
      const delaysMs = [0, 100, 300, 600, 1000];
      const timers = delaysMs.map((ms) => window.setTimeout(scrollToTarget, ms));
      return () => {
        timers.forEach((t) => clearTimeout(t));
      };
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
