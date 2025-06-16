import React from "react";
import Footer from "../components/Footer";
import { useKeenSlider } from "keen-slider/react";

const sections = [
  {
    title: "Kitchen",
    images: ["/stays/kitchen2.jpg"],
    features: ["Full-size fridge & freezer", "Gas stove and oven", "Espresso machine & kettle"],
  },
  {
    title: "Living Room with Pullout Couch",
    images: ["/stays/living.jpg"],
    features: ["Smart TV with streaming", "Pullout queen-sized couch", "Cozy gas fireplace test"],
  },
  {
    title: "Bedroom",
    images: ["/stays/bedroom.jpg"],
    features: ["King bed with luxury linens", "Blackout blinds", "Lakeview windows"],
  },
  {
    title: "Office",
    images: ["/stays/office.jpg"],
    features: ["Dedicated desk space", "High-speed Wi-Fi", "Monitor + HDMI dock"],
  },
  {
    title: "Bathroom",
    images: ["/stays/bathroom.jpg"],
    features: ["Heated tile floors", "Walk-in rain shower", "Bidet + oversized vanity"],
  },
  {
    title: "Patio",
    images: ["/stays/patio.jpg"],
    features: ["Covered seating area", "BBQ grill & outdoor dining", "View of Kalamalka Lake"],
  },
  {
    title: "Outdoor Space",
    images: ["/stays/outdoor.jpg"],
    features: [
      "Firepit lounge with Adirondack chairs",
      "Private trail to lake access",
      "Room to stretch out or stargaze",
    ],
  },
  {
    title: "Garage, party room, mechanics and gym",
    images: ["/stays/garage.jpg"],
    features: [
      "Big screen TV + karaoke",
      "Bike space & tools",
      "Casual hangout for winter or post-adventure beers",
    ],
  },
];

export default function Accommodation() {
  return (
    <>
      {/* Mini Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src="/stays/kal-hero.jpg"
          alt="Kal Lake"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold drop-shadow-lg">
            Kal Lake Escape
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white py-16 px-4 text-gray-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg mb-10 text-center max-w-2xl mx-auto">
            Welcome to your private retreat above Kalamalka Lake. This thoughtfully designed
            accommodation features panoramic lake views, a heated pool, firepit lounge, and
            access to paddleboards and hiking trails. Perfect for couples, families, or work retreats.
          </p>

          <div className="grid gap-12 md:grid-cols-2">
            {sections.map((section, index) => (
              <FeatureCard key={index} title={section.title} images={section.images} features={section.features} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function FeatureCard({
  title,
  images,
  features,
}: {
  title: string;
  images: string[];
  features: string[];
}) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  return (
    <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      {/* Carousel if multiple images */}
      {images.length > 1 ? (
        <div ref={sliderRef} className="keen-slider h-64 md:h-72">
          {images.map((img, i) => (
            <div key={i} className="keen-slider__slide">
              <img src={img} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <img
          src={images[0]}
          alt={title}
          className="w-full h-64 md:h-72 object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {features.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
