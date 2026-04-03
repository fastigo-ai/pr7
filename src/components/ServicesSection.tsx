import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Eye, Users, Building2, Camera, Lock, UserCheck, Building } from "lucide-react";
import { useState, useEffect } from "react";
import parallaxCity from "@/assets/parallax-city.jpg";

const API_BASE_URL = "https://pr7backend.onrender.com/api/v1";

const ServicesSection = ({ isSlider = false, hideHeader = false }: { isSlider?: boolean; hideHeader?: boolean }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const dynamicServices = data.map((item: any) => ({
              title: item.heading,
              desc: item.description,
              icon: Shield,
              img: item.image_url,
              id: item._id,
            }));
            setServices(dynamicServices);
          }
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="relative">
      {/* Parallax divider */}
      {!hideHeader && (
        <div
          className="h-64 parallax-section relative"
          style={{ backgroundImage: `url(${parallaxCity})` }}
        >
          <div className="absolute inset-0 bg-background/70" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <h2 className="font-display text-4xl md:text-6xl uppercase text-foreground text-center">
              Our <span className="text-gradient-gold">Services</span>
            </h2>
          </div>
        </div>
      )}

      <div className="bg-background py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          {isSlider ? (
            <div className="relative w-full flex overflow-hidden group">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              
              <motion.div
                className="flex gap-6 w-max pl-6 hover:[animation-play-state:paused]"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity }}
              >
                {[...services, ...services].map((service, i) => (
                  <div
                    key={`${service.title}-${i}`}
                    className="w-80 shrink-0 h-[400px]"
                  >
                    <Link
                      to={`/services/${service.id}`}
                      className="group bg-card border border-border rounded-sm hover:border-primary/40 transition-all duration-300 hover:glow-gold overflow-hidden flex flex-col h-full block cursor-pointer"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <img 
                          src={service.img} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                        <service.icon className="absolute bottom-4 left-4 w-8 h-8 text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-display text-xl uppercase text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground font-body text-sm leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                >
                  <Link
                    to={`/services/${service.id}`}
                    className="group bg-card border border-border rounded-sm hover:border-primary/40 transition-all duration-300 hover:glow-gold overflow-hidden flex flex-col h-full block cursor-pointer"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={service.img} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      <service.icon className="absolute bottom-4 left-4 w-8 h-8 text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-display text-xl uppercase text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
