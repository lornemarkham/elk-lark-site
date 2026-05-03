import ImageFadeCarousel, { type ImageCarouselSlide } from "./ImageFadeCarousel";

const SLIDES: ImageCarouselSlide[] = [
  { src: "/stays/pool.jpg", alt: "Private Pool" },
  { src: "/stays/gazebo.jpg", alt: "Garage Hangout" },
  { src: "/stays/storm.jpg", alt: "Garden" },
];

export default function BasecampCarousel() {
  return (
    <div className="relative mx-auto w-full max-w-screen-xl overflow-hidden px-4 sm:px-6 lg:px-8">
      <ImageFadeCarousel slides={SLIDES} intervalMs={4000} dotAriaLabelPrefix="Go to basecamp slide" />
    </div>
  );
}
