import Hero from "./components/Hero";
import WhatWeFireUp from "./components/WhatWeFireUp";
import RealFoodNoBull from "./components/RealFoodNoBull";
import ThePignitionDifference from "./components/ThePignitionDifference";
import FromThePit from "./components/FromThePit";
import FireUpYourEvent from "./components/FireUpYourEvent";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-blackout">
      <Hero />
      <WhatWeFireUp />
      <RealFoodNoBull />
      <ThePignitionDifference />
      <FromThePit />
      <FireUpYourEvent />
      <Footer />
    </div>
  );
}

export default App;
