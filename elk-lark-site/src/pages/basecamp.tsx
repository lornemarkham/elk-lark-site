import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Footer from "../components/footer";

export default function LarkLife() {
  const gallerySections = [
    {
      title: "🌊 Water Days",
      caption: "Dive in. Float on. Paddle out.",
      images: [
        { src: "/images/pool/pool6.jpg", caption: "A view that stretches beyond the pool — Kalamalka and calm for miles." },
        { src: "/images/pool/pool8.jpg", caption: "Splash zone activated — with Ember, age 2, already living the Lark life." },
        { src: "/images/pool/pool2.jpg", caption: "Nothing on the agenda but sun, floaties, and freedom." },
        { src: "/images/pool/pool7.jpg", caption: "Generations deep: Grandpa and Ember keeping it cool in the upper plunge pool." },
        { src: "/images/pool/pool9.jpg", caption: "Real people. Real moments. Ember approved." },
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
        { src: "/images/adventures/adventure4.jpg", caption: "Some views silence even the loudest minds." },
        { src: "/images/adventures/adventure5.jpg", caption: "Bikes parked. Stories flowing. That last stretch before sundown." },
        { src: "/images/adventures/adventure2.jpg", caption: "No trail, no problem. Driftwood beaches and whatever comes next." },
        { src: "/images/adventures/adventure7.jpg", caption: "Into the wild, by choice. Ice-cold water. Zero regrets." },
        { src: "/images/adventures/adventure1.jpg", caption: "Not every treasure is buried. Some show up in the sky." },
      ],
    },
    {
      title: "🔥 Backyard Bites",
      caption: "Healthy. Hearty. Homemade. Always shared.",
      images: [
        { src: "/images/food/food2.jpg", caption: "Grilled pork and kimchi over roasted cauliflower. Dinner with a kick." },
        { src: "/images/food/food5.jpg", caption: "A sampler of steak, pork belly, and garlicky greens — no shortcuts taken." },
        { src: "/images/food/food10.jpg", caption: "Calamari and shrimp cocktail with an Old Milwaukee? Yes please." },
        { src: "/images/food/food11.jpg", caption: "Grill marks, fire, and flavor. Peppers, steak, and buttered onions." },
        { src: "/images/food/food14.jpg", caption: "Shrimp ceviche meets cowboy beer. A backyard party in a glass." },
        { src: "/images/food/food15.jpg", caption: "Lettuce taco loaded with pico and bacon. Crunch, spice, bite." },
        { src: "/images/food/food17.jpg", caption: "Homemade jerky smoked on-site. You’ll smell it before you taste it." },
        { src: "/images/food/food20.jpg", caption: "Dill, garlic, and cheese — just before it hits the fire." },
        { src: "/images/food/food16.jpg", caption: "Thick-cut jerky: zero preservatives, maximum flavor." },
      ],
    },
    {
      title: "🛏 The Not-So-Secret Suite",
      caption: "Blackout curtains. A bed that hits like a cloud. Steps from the pool with a morning coffee in hand. Not listed. Not rented. Just offered — to those who vibe with the Lark life.",
      images: [
        { src: "/images/stays/kitchen.jpg", caption: "Marshall fridge. Sleek cabinets. Full kitchen. Full send." },
        { src: "/images/stays/kitchen2.jpg", caption: "Double doors to the pool. TV, fireplace, and good vibes." },
        { src: "/images/stays/living.jpg", caption: "Cozy couch by day. Hide-a-bed by night. Leather lounge seals the deal." },
        { src: "/images/stays/office.jpg", caption: "Yes, you can work. No, you won’t want to." },
        { src: "/images/stays/bathroom.jpg", caption: "Rain shower, heated floors, and a warm amber glow." },
        { src: "/images/stays/bedroom.jpg", caption: "Not ultra-modern, but a mattress you’ll dream about. Walk-out morning sun included." },
      ],
    },
  ];

  return (
    <div className="bg-white py-16 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">The Lark Life</h1>
        <p className="text-center text-gray-600 italic mb-12 max-w-2xl mx-auto">
          Offbeat, off-grid, and off-the-record. The Lark Life isn’t a rental — it’s an invitation to unwind your way. The pool’s warm, the fridge is full, and there’s always a seat at the fire or a floatie with your name on it. Here’s what you might stumble into...
        </p>

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
                      <div className="absolute bottom-0 w-full bg-black/70 text-white text-sm p-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
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
      <Footer />
    </div>
  );
}
