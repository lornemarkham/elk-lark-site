import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function TheLarkLife() {
  return (
    <>
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center text-gray-800">
          <h2 className="font-serif text-3xl font-bold mb-4">The Lark Life</h2>
          <p className="text-gray-600 mb-6">
            Day-in-the-life stories and gallery content will live here.
          </p>
          <Link
            to="/plan-your-retreat"
            className="inline-block rounded-full bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 transition"
            data-analytics="cta_click"
            data-cta-location="the_lark_life_cta"
            data-cta-text="Plan Your Retreat"
            data-destination="/plan-your-retreat"
            data-experience-type="general"
          >
            Plan Your Retreat
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
