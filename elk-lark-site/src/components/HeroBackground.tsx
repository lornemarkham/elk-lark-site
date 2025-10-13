// src/components/HeroBackground.tsx
import React, { useEffect, useState } from "react";
import VideoBG from "./VideoBG";
import { useSeason } from "../state/SeasonContext";

const HeroBackground: React.FC<{ hoverTarget: string }> = ({ hoverTarget }) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const { season } = useSeason();
  const isWinter = season === "winter";

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {/* Summer: your original video layers stay exactly the same (desktop only, and not during winter) */}
      {isDesktop && !isWinter && (
        <>
          <VideoBG src="/videos/outlaw.mp4" isActive={hoverTarget === "outlaw"} />
          <VideoBG src="/videos/restore.mp4" isActive={hoverTarget === "restore"} />
          <VideoBG src="/videos/strategy.mp4" isActive={hoverTarget === "strategy"} />
        </>
      )}

      {/* Background image layer (identical fade/z-index/pointer-events behavior):
          - Winter: always show /images/winter.jpg (videos are not mounted)
          - Summer: fallback image when videos are not active
      */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out pointer-events-none z-0 ${
          isDesktop && hoverTarget && !isWinter ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url('${isWinter ? "/images/winter.jpg" : "/kal-beach.jpg"}')`,
        }}
      />
    </>
  );
};

export default HeroBackground;