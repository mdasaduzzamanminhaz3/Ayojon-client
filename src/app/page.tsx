import EventCategories from "@/components/Home/event-categories";
import HeroSection from "@/components/Home/hero";
import NewsletterSection from "@/components/Home/newsletter-section";
import PastEventsGallery from "@/components/Home/past-events-gallery";
import UpcomingEvents from "@/components/Home/upcoming-events";
import WhyChooseAyojon from "@/components/Home/why-choose-ayojon";
import MainLayout from "./main-layout";

export default function Home() {
  return (
    <>
      <MainLayout>
        <HeroSection />
        <UpcomingEvents />
        <EventCategories />
        <WhyChooseAyojon />
        <PastEventsGallery />
        <NewsletterSection/>
      </MainLayout>
    </>
  );
}
