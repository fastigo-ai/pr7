import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Building2, Home, Factory, UserCheck, ShieldCheck, Briefcase, Zap, Globe, Loader2 } from "lucide-react";
import parallaxCity from "@/assets/parallax-city.jpg";

const API_BASE_URL = "https://pr7backend.onrender.com/api/v1";

const Projects = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setCaseStudies(data);
        } else {
          // Fallback to default data if none in DB
          setCaseStudies(defaultCaseStudies);
        }
      } else {
        setCaseStudies(defaultCaseStudies);
      }
    } catch (error) {
      setCaseStudies(defaultCaseStudies);
    } finally {
      setLoading(false);
    }
  };

  const projectSectors = [
    {
      icon: <Building2 className="w-10 h-10 text-primary" />,
      title: "Commercial",
      description: "Comprehensive security for corporate offices, retail spaces, and banks."
    },
    {
      icon: <Home className="w-10 h-10 text-primary" />,
      title: "Residential",
      description: "Safe and secure living environments for apartments and private villas."
    },
    {
      icon: <Factory className="w-10 h-10 text-primary" />,
      title: "Industrial",
      description: "Protection for manufacturing plants, warehouses, and energy facilities."
    },
    {
      icon: <UserCheck className="w-10 h-10 text-primary" />,
      title: "VIP & Events",
      description: "Bespoke protection for high-profile clients and luxury events."
    }
  ];

  const defaultCaseStudies = [
    {
      title: "MNC Headquarter Security",
      sector: "Commercial",
      location: "Gurugram, India",
      description: "Successfully implemented a 24/7 security management system for a global tech firm's headquarters.",
      image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "International Peace Summit",
      sector: "VIP & Event",
      location: "New Delhi, India",
      description: "Led the VIP security logistics for an international diplomatic conference with over 50 delegates.",
      image_url: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Automobile Plant Logistics",
      sector: "Industrial",
      location: "Sanand, India",
      description: "Secured a multi-acre manufacturing plant with integrated surveillance and access control.",
      image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-background min-h-screen pt-24 text-foreground">
      <Navbar forceDark={true} />
      
      {/* Page Header */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${parallaxCity})` }}
        />
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-8xl uppercase text-foreground mb-6">
              Our <span className="text-primary">Projects</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground font-body max-w-2xl mx-auto uppercase tracking-widest text-sm md:text-base leading-relaxed">
              Excellence in Action Across Diverse Sectors
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sectors Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-6">Sector <span className="text-primary">Expertise</span></h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">Providing specialized security services across various industries with tailored strategies.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectSectors.map((sector, i) => (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-card border border-border rounded-3xl hover:border-primary/40 transition-all group"
              >
                <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  {sector.icon}
                </div>
                <h3 className="font-display text-xl uppercase mb-4 text-foreground">{sector.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{sector.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies / Highlights */}
      <section className="py-24 bg-card/40 border-y border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
               <h2 className="font-display text-3xl md:text-5xl uppercase mb-4">Project Highlights</h2>
               <p className="text-muted-foreground font-body">A closer look at some of our most impactful security assignments.</p>
            </div>
            <div className="hidden md:block">
              <ShieldCheck className="w-12 h-12 text-primary opacity-50" />
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
            ) : (
              caseStudies.map((study: any, i) => (
                <motion.div
                  key={study._id || study.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col gap-6 group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border">
                    <img 
                      src={study.image_url} 
                      alt={study.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-primary text-primary-foreground font-display text-[10px] uppercase tracking-widest rounded-full">
                        {study.sector}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl uppercase mb-3 text-foreground group-hover:text-primary transition-colors">{study.title}</h3>
                    <div className="flex items-center gap-2 text-primary font-body text-xs uppercase tracking-widest mb-4">
                      <Globe className="w-3 h-3" />
                      {study.location}
                    </div>
                    <p className="text-muted-foreground font-body leading-relaxed text-sm">
                      {study.description}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Global Impact / Scale */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
             >
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-8">Security at <span className="text-primary italic">Scale</span></h2>
                <div className="space-y-8">
                   {[
                     { label: "Client Satisfaction", icon: <Briefcase /> },
                     { label: "Technological Edge", icon: <Zap /> },
                     { label: "Global Standards", icon: <Globe /> }
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-display uppercase text-foreground mb-2">{item.label}</h4>
                          <p className="text-muted-foreground font-body text-sm leading-relaxed">
                            Implementing international security protocols with a focus on local requirements and adaptive strategies.
                          </p>
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>
             <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative p-8 bg-card border border-border rounded-[2rem] overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16" />
                <h3 className="font-display text-2xl uppercase mb-6 text-foreground">Why Partner With Us?</h3>
                <ul className="space-y-4">
                   {[
                     "Proven track record in high-risk environments",
                     "Seamless integration with existing facilities",
                     "Dedicated project management and reporting",
                     "Rapid deployment and scaling capabilities"
                   ].map((text, i) => (
                     <li key={i} className="flex items-center gap-4 text-muted-foreground font-body text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        {text}
                     </li>
                   ))}
                </ul>
             </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
          <h2 className="font-display text-3xl md:text-5xl uppercase text-primary-foreground mb-8">
            Ready to secure your future?
          </h2>
          <p className="text-primary-foreground/80 font-body mb-10 text-lg">
            Let's discuss how our project expertise can provide you with peace of mind.
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-4 bg-background text-foreground font-display uppercase tracking-widest hover:bg-background/90 transition-all rounded-full shadow-lg"
          >
            Start Your Project
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
