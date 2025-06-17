import React, { useState, useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function BasecampCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      slides: {
        perView: 1,
        spacing: 8,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 1, spacing: 12 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 1, spacing: 16 },
        },
      },
    },
    []
  );

  useEffect(() => {
    timer.current = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [instanceRef]);

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto overflow-hidden">
      <div
        ref={sliderRef}
        className="keen-slider rounded-lg overflow-hidden shadow-lg"
      >
        <div className="keen-slider__slide">
          <img
            src="/stays/pool.jpg"
            alt="Private Pool"
            className="w-full h-64 sm:h-72 md:h-96 object-cover"
          />
        </div>
        <div className="keen-slider__slide">
          <img
            src="/stays/gazebo.jpg"
            alt="Garage Hangout"
            className="w-full h-64 sm:h-72 md:h-96 object-cover"
          />
        </div>
        <div className="keen-slider__slide">
          <img
            src="/stays/storm.jpg"
            alt="Garden"
            className="w-full h-64 sm:h-72 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === idx ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
