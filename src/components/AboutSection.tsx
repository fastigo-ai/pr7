import { motion } from "framer-motion";
import parallaxControl from "@/assets/parallax-control.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="relative">
      <div
        className="h-[500px] md:h-[600px] parallax-section relative"
        style={{ backgroundImage: `url(${parallaxControl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <h2 className="font-display text-4xl md:text-6xl uppercase text-foreground">
                Mission & <span className="text-gradient-gold">Objectives</span>
              </h2>
              <p className="mt-6 text-muted-foreground font-body leading-relaxed">
                Our mission is to provide protection and security to our clients through a bespoke service tailored to their specific needs. We value honesty, integrity, professionalism, and mutual respect while delivering consistent services.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Professional Security Vision & Commitment",
                  "Delivering high-quality security solutions",
                  "Acting with transparency & ethical standards",
                  "Ensuring safety and strong client relationships",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-secondary-foreground font-body text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
