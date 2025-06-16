import React from "react";
import VideoBG from "./VideoBG";

const HeroBackground: React.FC<{ hoverTarget: string }> = ({ hoverTarget }) => {
  return (
    <>
      <VideoBG src="/videos/outlaw.mp4" isActive={hoverTarget === "outlaw"} />
      <VideoBG src="/videos/restore.mp4" isActive={hoverTarget === "restore"} />
      <VideoBG src="/videos/strategy.mp4" isActive={hoverTarget === "strategy"} />
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out pointer-events-none z-0 ${
          hoverTarget ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url('/kal-beach.jpg')` }}
      />
    </>
  );
};

export default HeroBackground;
