import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import parallaxCity from "@/assets/parallax-city.jpg";
import { useEffect } from "react";

const Services = () => {
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
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto uppercase tracking-widest text-sm">
            Comprehensive security solutions tailored exactly for your needs.
          </p>
        </div>
      </div>

      <div className="py-12">
        <ServicesSection hideHeader={true} />
      </div>

      <Footer />
    </div>
  );
};

export default Services;
