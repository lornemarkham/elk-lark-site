import React from "react";

type VideoBGProps = {
  src: string;
  isActive: boolean;
};

const VideoBG: React.FC<VideoBGProps> = ({ src, isActive }) => (
  <video
    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out pointer-events-none z-0 ${
      isActive ? "opacity-100" : "opacity-0"
    }`}
    src={src}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  />
);

export default VideoBG;
