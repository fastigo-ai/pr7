import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Twitter, Facebook, Share2 } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="relative h-screen overflow-hidden bg-background">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y,
          scale,
          backgroundImage: `url(https://pr7security.in/assets/img/slider/2.png)`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-background/5" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          {/* <h1 className="font-display text-7xl md:text-9xl lg:text-[12rem] uppercase leading-none tracking-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
            PR7
            <br />
            <span className="text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]">Security</span>
          </h1> */}
          <p className="mt-8 text-sm md:text-base uppercase tracking-[0.3em] text-white/90 font-body max-w-3xl mx-auto drop-shadow-md">
            Helping Business Security & Peace of Mind for Your Team
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/70 font-body">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>

        {/* Corner Links - Left */}
        <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
        </div>

        {/* Corner Links - Right */}
        <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body">
            Share
          </span>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Share2 className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
