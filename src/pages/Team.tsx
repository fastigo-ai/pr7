import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import parallaxCity from "@/assets/parallax-city.jpg";
import { useEffect } from "react";

const teamMembers = [
  {
    name: "BIMLESH KUMAR THAKUR",
    role: "Managing Director",
    img: "https://pr7security.in/team/1.jpeg",
    socials: {
      facebook: "https://www.facebook.com/share/1DhEfG2u2T/",
      youtube: "https://www.youtube.com/@pr7securityandplacementser87",
      instagram: "https://www.instagram.com/007bimlesh?igsh=MW8zdzk5a3RzandkNw=="
    }
  },
  {
    name: "RAJNISH KUMAR THAKUR",
    role: "Director Finance",
    img: "https://pr7security.in/team/2.jpeg",
    socials: { facebook: "#", twitter: "#", instagram: "#" }
  },
  {
    name: "BABITA THAKUR",
    role: "Director Operations",
    img: "https://pr7security.in/team/3.jpeg",
    socials: { facebook: "#", twitter: "#", instagram: "#" }
  },
  {
    name: "MUKESH KUMAR THAKUR",
    role: "Director Admin",
    img: "https://pr7security.in/team/4.jpeg",
    socials: { facebook: "#", twitter: "#", instagram: "#" }
  }
];

const Team = () => {
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
            Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto uppercase tracking-widest text-sm">
            Meet the leaders behind PR7 Security
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="group relative w-full flex flex-col items-center"
              >
                {/* Arch Shaped Container */}
                <div className="relative w-full aspect-[3/4] max-w-[280px] rounded-t-full rounded-b-3xl overflow-hidden border border-border group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 bg-card">
                  
                  {/* Portrait Image */}
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                  
                  {/* Connecting Line Decoration */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-primary/30" />
                  
                  {/* Hover Socials (Animated into view) */}
                  <div className="absolute inset-x-0 bottom-32 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex justify-center gap-3 px-4 z-20">
                    {member.socials.facebook && member.socials.facebook !== "#" && (
                      <a href={member.socials.facebook} className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md text-primary border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all shadow-lg">
                        <Facebook size={18} />
                      </a>
                    )}
                    {member.socials.instagram && member.socials.instagram !== "#" && (
                      <a href={member.socials.instagram} className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md text-primary border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all shadow-lg">
                        <Instagram size={18} />
                      </a>
                    )}
                    {(member.socials as any).youtube && (member.socials as any).youtube !== "#" && (
                      <a href={(member.socials as any).youtube} className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md text-primary border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all shadow-lg">
                        <Mail size={18} />
                      </a>
                    )}
                    {member.socials.twitter && member.socials.twitter !== "#" && (
                      <a href={member.socials.twitter} className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md text-primary border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all shadow-lg">
                        <Twitter size={18} />
                      </a>
                    )}
                  </div>

                  {/* Name and Role Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-10">
                    <h3 className="font-display text-xl text-foreground mb-2 drop-shadow-md">
                      {member.name}
                    </h3>
                    <div className="inline-block relative">
                      <div className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10" />
                      <p className="text-primary font-body text-xs uppercase tracking-[0.2em] font-bold bg-background/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary/20">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
