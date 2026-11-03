import EventCategories from "@/components/event-categories";
import HeroSection from "@/components/hero";
import NewsletterSection from "@/components/newsletter-section";
import PastEventsGallery from "@/components/past-events-gallery";
import UpcomingEvents from "@/components/upcoming-events";
import WhyChooseAyojon from "@/components/why-choose-ayojon";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <UpcomingEvents />
        <EventCategories />
        <WhyChooseAyojon />
        <PastEventsGallery />
        <NewsletterSection/>
      </main>
    </>
  );
}
