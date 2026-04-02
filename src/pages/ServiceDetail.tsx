import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import parallaxCity from "@/assets/parallax-city.jpg";

const API_BASE_URL = "http://localhost:8000/api/v1";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/`);
        if (response.ok) {
          const data = await response.json();
          const found = data.find((s: any) => s._id === id);
          setService(found);
        }
      } catch (error) {
        console.error("Failed to fetch service detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Navbar forceDark={true} />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-background min-h-screen pt-24 text-center">
        <Navbar forceDark={true} />
        <div className="container mx-auto px-6 py-24">
          <h1 className="font-display text-4xl mb-8">Service Not Found</h1>
          <Link to="/services">
            <Button variant="outline">Back to Services</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-24">
      <Navbar forceDark={true} />
      
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${service.image_url})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link to="/services" className="inline-flex items-center text-primary/80 hover:text-primary mb-6 uppercase tracking-widest text-xs font-body group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
            <h1 className="font-display text-5xl md:text-7xl uppercase text-white mb-6 leading-none">
              {service.heading}
            </h1>
            <p className="text-xl text-white/80 font-body max-w-2xl leading-relaxed italic border-l-4 border-primary pl-6">
              {service.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Main Description */}
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-primary" />
                  <h2 className="font-display text-3xl uppercase tracking-wider">Service Overview</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground font-body text-lg leading-loose whitespace-pre-wrap">
                    {service.long_description || "Detailed overview coming soon for this service area. We are committed to providing the highest standards of security and professional excellence."}
                  </p>
                </div>
              </section>

              {/* Visual Divider / Quote */}
              <div className="bg-card p-12 rounded-2xl border border-border relative overflow-hidden group">
                 <Shield className="absolute -right-8 -bottom-8 w-48 h-48 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 rotate-12" />
                 <p className="relative z-10 font-display text-2xl uppercase tracking-tight text-foreground/90 italic">
                   "We don't just provide security; we provide peace of mind through rigorous training and modern technology."
                 </p>
              </div>
            </div>

            {/* Sidebar / Guidelines */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/30 p-8 rounded-2xl border border-border sticky top-32">
                <h3 className="font-display text-2xl uppercase tracking-wider mb-8 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  Guidelines
                </h3>
                <ul className="space-y-6">
                  {(service.guidelines && service.guidelines.length > 0) ? (
                    service.guidelines.map((guideline: string, idx: number) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground font-body text-sm leading-relaxed">{guideline}</span>
                      </motion.li>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm font-body italic">Guidelines are being finalized for this specific service.</p>
                  )}
                </ul>
                
                <div className="mt-12 pt-8 border-t border-border">
                  <Link to="/contact" className="w-full inline-block">
                    <Button className="w-full rounded-xl uppercase tracking-widest text-xs h-12 shadow-lg shadow-primary/20">
                      Request Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
