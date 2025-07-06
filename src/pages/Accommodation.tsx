import React from "react";

export default function Accommodation() {
  return (
    <div className="bg-white min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Kal Lake Escape</h1>
        <p className="text-gray-700 text-lg mb-8">
          Welcome to your private retreat above Kalamalka Lake. This thoughtfully designed
          accommodation features panoramic lake views, a heated pool, firepit lounge, and
          access to paddleboards and hiking trails. Perfect for couples, families, or work retreats.
        </p>

       <div className="grid gap-8 md:grid-cols-2 mb-12">

  <div>
    <h3 className="text-lg font-semibold mb-2">Kitchen</h3>
    <img src="/stays/kitchen2.jpg" alt="Kitchen" className="rounded-lg mb-2" />
    <ul className="list-disc list-inside text-gray-600 text-sm">
      <li>Full-size fridge & freezer</li>
      <li>Gas stove and oven</li>
      <li>Espresso machine & kettle</li>
    </ul>
  </div>

  <div>
    <h3 className="text-lg font-semibold mb-2">Living Room with Pullout Couch</h3>
    <img src="/stays/living.jpg" alt="Living Room" className="rounded-lg mb-2" />
    <ul className="list-disc list-inside text-gray-600 text-sm">
      <li>Smart TV with streaming</li>
      <li>Pullout queen-sized couch</li>
      <li>Cozy gas fireplace</li>
    </ul>
  </div>

  <div>
    <h3 className="text-lg font-semibold mb-2">Bedroom</h3>
    <img src="/stays/bedroom.jpg" alt="Bedroom" className="rounded-lg mb-2" />
    <ul className="list-disc list-inside text-gray-600 text-sm">
      <li>King bed with luxury linens</li>
      <li>Blackout blinds</li>
      <li>Lakeview windows</li>
    </ul>
  </div>

  <div>
    <h3 className="text-lg font-semibold mb-2">Office</h3>
    <img src="/stays/office.jpg" alt="Office" className="rounded-lg mb-2" />
    <ul className="list-disc list-inside text-gray-600 text-sm">
      <li>Dedicated desk space</li>
      <li>High-speed Wi-Fi</li>
      <li>Monitor + HDMI dock</li>
    </ul>
  </div>

  <div>
    <h3 className="text-lg font-semibold mb-2">Bathroom</h3>
    <img src="/stays/bathroom.jpg" alt="Bathroom" className="rounded-lg mb-2" />
    <ul className="list-disc list-inside text-gray-600 text-sm">
      <li>Heated tile floors</li>
      <li>Walk-in rain shower</li>
      <li>Bidet + oversized vanity</li>
    </ul>
  </div>

  <div>
    <h3 className="text-lg font-semibold mb-2">Patio</h3>
    <img src="/stays/patio.jpg" alt="Patio" className="rounded-lg mb-2" />
    <ul className="list-disc list-inside text-gray-600 text-sm">
      <li>Covered seating area</li>
      <li>BBQ grill & outdoor dining</li>
      <li>View of Kalamalka Lake</li>
    </ul>
  </div>

  <div>
    <h3 className="text-lg font-semibold mb-2">Outdoor Space</h3>
    <img src="/stays/outdoor.jpg" alt="Outdoor Space" className="rounded-lg mb-2" />
    <ul className="list-disc list-inside text-gray-600 text-sm">
      <li>Firepit lounge with Adirondack chairs</li>
      <li>Private trail to lake access</li>
      <li>Room to stretch out or stargaze</li>
    </ul>
  </div>

    <div>
    <h3 className="text-lg font-semibold mb-2">Garage, party room, mechanics and gym</h3>
    <img src="/stays/garage.jpg" alt="Outdoor Space" className="rounded-lg mb-2" />
    <ul className="list-disc list-inside text-gray-600 text-sm">
      <li>Firepit lounge with Adirondack chairs</li>
      <li>Private trail to lake access</li>
      <li>Room to stretch out or stargaze</li>
    </ul>
  </div>

</div>


        {/* <a
          href="https://airbnb.com/your-listing"
          target="_blank"
          className="inline-block bg-brand text-white px-6 py-3 rounded hover:bg-accent transition"
        >
          Book Now on Airbnb
        </a> */}
      </div>
    </div>
  );
}