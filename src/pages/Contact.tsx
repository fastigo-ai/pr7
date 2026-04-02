import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import parallaxCity from "@/assets/parallax-city.jpg";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen pt-24">
      <Navbar forceDark={true} />
      
      {/* Page Header */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${parallaxCity})` }}
        />
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="relative z-20 text-center px-6">
          <h1 className="font-display text-5xl md:text-7xl uppercase text-foreground mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto uppercase tracking-widest text-sm">
            Reach out for your security needs
          </p>
        </div>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
