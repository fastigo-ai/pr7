import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GlobeSection from "@/components/GlobeSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import EventsSection from "@/components/EventsSection";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GlobeSection />
      <AboutSection />
      <EventsSection />
      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
