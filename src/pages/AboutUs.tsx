import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Target, Users, Award, CheckCircle2, History } from "lucide-react";
import parallaxCity from "@/assets/parallax-city.jpg";
import parallaxControl from "@/assets/parallax-control.jpg";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Integrity",
      description: "We operate with absolute honesty and transparency in all our interactions."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Professionalism",
      description: "Our team maintains the highest standards of conduct and expertise."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Client-Centric",
      description: "We tailor our security solutions to the unique needs of every client."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description: "We strive for perfection in every detail of our security operations."
    }
  ];

  return (
    <div className="bg-background min-h-screen pt-24">
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
              About <span className="text-primary">PR7 Security</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground font-body max-w-2xl mx-auto uppercase tracking-widest text-sm md:text-base leading-relaxed">
              Redefining Private Security through Professionalism and Innovation
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl md:text-5xl uppercase text-foreground mb-8">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                Our mission is to provide protection and security to our clients through a bespoke service tailored to their specific needs. We value honesty, integrity, professionalism, and mutual respect while delivering consistent services.
              </p>
              <div className="space-y-4">
                {[
                  "Professional Security Vision & Commitment",
                  "Delivering high-quality security solutions",
                  "Acting with transparency & ethical standards",
                  "Ensuring safety and strong client relationships",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-foreground font-body">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-border"
            >
              <img src={parallaxControl} alt="Security Control" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-4xl uppercase text-foreground underline decoration-primary decoration-4 underline-offset-8">
              Core Values
            </h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl uppercase text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company History Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
             <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="relative p-12 bg-card border border-border rounded-tl-[100px] rounded-br-[100px]">
                <History className="w-12 h-12 text-primary mb-8" />
                <h2 className="font-display text-4xl uppercase text-foreground mb-6">Our Journey</h2>
                <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
                  <p>
                    PR7 Security Placements & Services Private Limited (PR7 SECURITY) was founded by industry visionaries with a simple yet powerful goal: to provide uncompromising security in an increasingly complex world.
                  </p>
                  <p>
                    From our humble beginnings, we have grown into a leading security provider known for our strategic approach and unwavering commitment to client safety. Our focus has always been on combining human expertise with modern security management.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="md:w-1/2 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Founded", value: "Established" },
                  { label: "Expert Teams", value: "Professional" },
                  { label: "Presence", value: "Pan India" },
                  { label: "Focus", value: "24/7 Security" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-card border border-border rounded-2xl text-center"
                  >
                    <p className="text-primary font-display text-2xl uppercase mb-1">{stat.value}</p>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 -z-10" />
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="font-display text-3xl md:text-5xl uppercase text-foreground mb-8">
            Experience the <span className="text-primary">PR7 Advantage</span>
          </h2>
          <p className="text-muted-foreground font-body mb-10 text-lg">
            Ready to secure your business with industry-leading security professionals? Let's discuss your specific needs.
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-4 bg-primary text-primary-foreground font-display uppercase tracking-widest hover:bg-primary/90 transition-all rounded-full"
          >
            Get In Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
