import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function LarkLife() {
  const gallerySections = [
    {
      title: "✨ Moments",
      caption: "Sundown talks. Slow mornings. Starry skies.",
      images: [
        { src: "/stays/patio.jpg", caption: "Golden hour on the patio — where every day winds down just right." },
        { src: "/stays/pool.jpg", caption: "Float, splash, or soak in the view — the pool’s always calling." },
        { src: "/stays/gazebo.jpg", caption: "Morning coffee, shaded chats, or an impromptu hangout." },
      ],
    },
    {
      title: "🌊 Water Days",
      caption: "Dive in. Float on. Paddle out.",
      images: [
        { src: "/stays/patio.jpg", caption: "Where lake life begins and schedules end." },
        { src: "/stays/patio.jpg", caption: "Sun, paddleboards, and absolutely no plans." },
        { src: "/stays/patio.jpg", caption: "Moments that make you forget what day it is." },
      ],
    },
    {
      title: "🛠 Garage Vibes",
      caption: "Wrench. Lift. Laugh. Chill. AI tools, Xbox, karaoke, darts, and space to just be.",
      images: [
        { src: "/images/garage/garage-darts4.jpg", caption: "Darts, bikes, and a wide-open door to freedom." },
        { src: "/images/garage/garage-gym2.jpg", caption: "Strength, sweat, and stories written in chalk." },
        { src: "/images/garage/garage-tools1.jpg", caption: "AI bike tuning. Video replays. Cold drinks. This is basecamp." },
        { src: "/images/garage/garage-tv1.jpg", caption: "Xbox, karaoke, and the game — all set for a perfect night in." },
        { src: "/images/garage/garage-tools3.jpg", caption: "Tinker time, solo time, hang time — all in one spot." },
        { src: "/images/garage/garage-tv4.jpg", caption: "Comfort meets outlaw. Welcome to the hangout zone." },
      ],
    },
    {
      title: "🏕 Adventure Scenes",
      caption: "Dirt trails. Deep woods. Unexpected turns.",
      images: [
        { src: "/stays/patio.jpg", caption: "Adventure begins where the pavement ends." },
        { src: "/stays/patio.jpg", caption: "Throttle therapy, forest edition." },
        { src: "/stays/patio.jpg", caption: "Moments you can’t capture — but we try anyway." },
      ],
    },
    {
      title: "🥂 Chill & Social",
      caption: "Good food. Great people. Easy vibes.",
      images: [
        { src: "/stays/patio.jpg", caption: "Cheers to nothing urgent and everything chill." },
        { src: "/stays/patio.jpg", caption: "Where strangers become crew by sundown." },
        { src: "/stays/patio.jpg", caption: "Clink, sip, repeat." },
      ],
    },
    {
      title: "🌱 From the Garden",
      caption: "Whatever grows, goes. (Sometimes onto your plate.)",
      images: [
        { src: "/stays/patio.jpg", caption: "Fresh-picked and plated with zero food miles." },
        { src: "/stays/patio.jpg", caption: "The garden does the talking — and the seasoning." },
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

            <PhotoProvider>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {section.images.map((image, index) => (
                  <PhotoView key={index} src={image.src}>
                    <div className="relative cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition group">
                      <img
                        src={image.src}
                        alt={section.title + " image " + (index + 1)}
                        className="object-cover w-full h-64"
                      />
                      <div className="absolute bottom-0 w-full bg-black/70 text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.caption}
                      </div>
                    </div>
                  </PhotoView>
                ))}
              </div>
            </PhotoProvider>
          </div>
        ))}
      </div>
    </div>
  );
}
