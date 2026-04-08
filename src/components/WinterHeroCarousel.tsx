import React, { useEffect, useState } from "react";

// Minimal winter-only hero carousel.
// Drop your winter images into /public/images/ and name them accordingly
const IMAGES = [
  "/images/winter1.webp",
  "/images/winter2.webp",
  "/images/winter3.jpeg",
];

const WinterHeroCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out pointer-events-none z-0 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
    </>
  );
};

export default WinterHeroCarousel;
