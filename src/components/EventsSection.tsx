import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const events = [
  { title: "CG Foods", img: "https://pr7security.in/owner_admin/uploads/5.jpg" },
  { title: "CEREMONIAL", img: "https://pr7security.in/owner_admin/uploads/kota%201.jpeg" },
  { title: "KOTA INDEPENDENCE DAY", img: "https://pr7security.in/owner_admin/uploads/2.jpeg" },
  { title: "Pepsi Plant Sonarpur Kolkata", img: "https://pr7security.in/owner_admin/uploads/FB_IMG_1668408456907.jpg" },
  { title: "Vedantu Learning Center", img: "https://pr7security.in/owner_admin/uploads/IMG-20220915-WA0000.jpg" },
  { title: "Felix Hospital Noida", img: "https://pr7security.in/owner_admin/uploads/FB_IMG_1663216934363.jpg" },
  { title: "Altis Hospital", img: "https://pr7security.in/owner_admin/uploads/FB_IMG_1663216850289.jpg" },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl uppercase text-foreground">
            Recent <span className="text-gradient-gold">Events</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body">
            Our latest activities and deployments across India
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-6 w-max pl-6 hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {/* Double the array for seamless looping from 0% to -50% */}
          {[...events, ...events].map((event, i) => (
            <div
              key={`${event.title}-${i}`}
              className="relative w-80 h-60 shrink-0 rounded-sm overflow-hidden group/card shadow-lg"
            >
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white font-display uppercase tracking-widest text-center text-sm font-bold drop-shadow-md">
                  {event.title}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <Link 
          to="/gallery"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-display text-sm uppercase tracking-widest hover:bg-primary/90 transition-all rounded-full group"
        >
          View Full Gallery
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
};

export default EventsSection;
