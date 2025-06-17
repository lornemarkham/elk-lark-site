import React from "react";

export default function LarkLife() {
  const gallerySections = [
    {
      title: "✨ Moments",
      caption: "Sundown talks. Slow mornings. Starry skies.",
      images: [
        "/stays/patio.jpg",
        "/stays/pool.jpg",
        "/stays/gazebo.jpg",
      ],
    },
    {
      title: "🌊 Water Days",
      caption: "Dive in. Float on. Paddle out.",
      images: [
        "/stays/patio.jpg",
        "/stays/patio.jpg",
        "/stays/patio.jpg",
      ],
    },
    {
      title: "🛠 Garage Vibes",
      caption: "Cold beers. Loud music. Good times.",
      images: [
        "/stays/garage.jpg",
        "/stays/pool.jpg",
      ],
    },
    {
      title: "🏕 Adventure Scenes",
      caption: "Dirt trails. Deep woods. Unexpected turns.",
      images: [
        "/stays/patio.jpg",
        "/stays/patio.jpg",
        "/stays/patio.jpg",
      ],
    },
    {
      title: "🥂 Chill & Social",
      caption: "Good food. Great people. Easy vibes.",
      images: [
        "/stays/patio.jpg",
        "/stays/patio.jpg",
        "/stays/patio.jpg",
      ],
    },
    {
      title: "🌱 From the Garden",
      caption: "Whatever grows, goes. (Sometimes onto your plate.)",
      images: [
        "/stays/patio.jpg",
        "/stays/patio.jpg",
      ],
    },
  ];

  return (
    <div className="bg-white py-16 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">The Lark Life</h1>

        {gallerySections.map((section, idx) => (
          <div key={idx} className="mb-16">
            <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-600 mb-4 italic">{section.caption}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {section.images.map((src, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={src}
                    alt={section.title + " image " + (index + 1)}
                    className="object-cover w-full h-64"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
