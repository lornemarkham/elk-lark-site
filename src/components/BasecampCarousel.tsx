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
    },
    []
  );

  // Auto-play effect
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
    <div className="relative">
      <div
        ref={sliderRef}
        className="keen-slider rounded-lg overflow-hidden shadow-lg"
      >
        <div className="keen-slider__slide">
          <img
            src="https://picsum.photos/id/1018/1600/720"
            alt="Private Pool"
            className="w-full h-72 object-cover"
          />
        </div>
        <div className="keen-slider__slide">
          <img
            src="https://picsum.photos/id/1015/1600/720"
            alt="Garage Hangout"
            className="w-full h-72 object-cover"
          />
        </div>
        <div className="keen-slider__slide">
          <img
            src="https://picsum.photos/id/1011/1600/720"
            alt="Garden"
            className="w-full h-72 object-cover"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
