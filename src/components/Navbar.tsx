import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Globe, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Navbar = ({ forceDark = false }: { forceDark?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = isScrolled || forceDark;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isMenuOpen ? "z-[110] bg-transparent backdrop-blur-none shadow-none" : "z-50 " + (isScrolled ? "bg-background/90 backdrop-blur-lg py-4 shadow-sm" : "bg-transparent py-8")
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between relative">
          {/* Burger Button (Always Left) */}
          <div className="flex items-center z-[120]">
            <button
              className="flex flex-col justify-center items-center gap-1.5 group relative w-8 h-8"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`h-0.5 transition-all duration-300 absolute ${isMenuOpen ? "bg-foreground rotate-45 w-8" : isDark ? "bg-foreground w-6 group-hover:w-8 -translate-y-1" : "bg-white w-6 group-hover:w-8 -translate-y-1"}`} />
              <div className={`h-0.5 transition-all duration-300 absolute ${isMenuOpen ? "bg-foreground -rotate-45 w-8" : isDark ? "bg-foreground w-8 group-hover:w-6 translate-y-1" : "bg-white w-8 group-hover:w-6 translate-y-1"}`} />
            </button>
          </div>

          {!isMenuOpen && (
            <div className="hidden lg:flex flex-1 items-center justify-end pr-12 gap-6">
              <Link to="/" className={`text-[12px] uppercase tracking-[0.2em] font-body hover:text-primary transition-colors ${isDark ? "text-foreground" : "text-white"}`}>Home</Link>
              <Link to="/about" className={`text-[12px] uppercase tracking-[0.2em] font-body hover:text-primary transition-colors ${isDark ? "text-foreground" : "text-white"}`}>About</Link>
              <Link to="/services" className={`text-[12px] uppercase tracking-[0.2em] font-body hover:text-primary transition-colors ${isDark ? "text-foreground" : "text-white"}`}>Services</Link>
              <Link to="/projects" className={`text-[12px] uppercase tracking-[0.2em] font-body hover:text-primary transition-colors ${isDark ? "text-foreground" : "text-white"}`}>Projects</Link>
            </div>
          )}

          {/* Center: Logo */}
          {!isMenuOpen && (
            <Link to="/" className="flex items-center gap-2 z-10 shrink-0">
              <Shield className="w-8 h-8 text-primary" />
              <span className={`font-display text-xl uppercase tracking-[0.3em] ${isDark ? "text-foreground" : "text-white"}`}>
                PR7<span className="text-primary font-bold">Security</span>
              </span>
            </Link>
          )}

          {!isMenuOpen && (
            <div className="hidden lg:flex flex-1 items-center justify-start pl-12 gap-6">
              <Link to="/team" className={`text-[12px] uppercase tracking-[0.1em] font-body hover:text-primary transition-colors ${isDark ? "text-foreground" : "text-white"}`}>Team</Link>
              <Link to="/gallery" className={`text-[12px] uppercase tracking-[0.1em] font-body hover:text-primary transition-colors ${isDark ? "text-foreground" : "text-white"}`}>Gallery</Link>
              <Link to="/blogs" className={`text-[12px] uppercase tracking-[0.1em] font-body hover:text-primary transition-colors ${isDark ? "text-foreground" : "text-white"}`}>Blogs</Link>
              <Link to="/careers" className={`text-[12px] uppercase tracking-[0.1em] font-body hover:text-primary transition-colors ${isDark ? "text-foreground" : "text-white"}`}>Careers</Link>
            </div>
          )}

          {/* Spacer for Mobile to keep logo centered when burger is on left */}
          <div className="lg:hidden w-8" />
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-background flex flex-col overflow-y-auto"
          >
            <div className="absolute inset-0 bg-background/50 backdrop-blur-md -z-10" />

            <div className="min-h-screen container mx-auto px-6 py-24 flex flex-col items-center justify-between">
              <nav className="flex flex-col items-start gap-4 md:gap-6 max-w-fit mx-auto">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Services", path: "/services" },
                  { label: "Our Projects", path: "/projects" },
                  { label: "Team", path: "/team" },
                  { label: "Gallery", path: "/gallery" },
                  { label: "Insights & Blogs", path: "/blogs" },
                  { label: "Careers", path: "/careers" },
                  { label: "Contact Us", path: "/contact" },
                  { label: "Admin", path: "/admin" }
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground hover:text-primary transition-colors uppercase tracking-[0.2em] relative group block text-left"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Overlay Socials */}
              <div className="mt-16 w-full flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-8 border-t border-border pt-8 w-full max-w-md justify-center"
                >
                  <a href="https://www.facebook.com/share/18T6MXstpD/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors hover:scale-110"><Facebook className="w-6 h-6" /></a>
                  <a href="https://twitter.com/LtdPr7/status/1411214071341350917?s=19" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors hover:scale-110"><Twitter className="w-6 h-6" /></a>
                  <a href="https://www.instagram.com/007bimlesh?igsh=MW8zdzk5a3RzandkNw==" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors hover:scale-110"><Instagram className="w-6 h-6" /></a>
                  <a href="https://www.youtube.com/@pr7securityandplacementser87" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors hover:scale-110"><Youtube className="w-6 h-6" /></a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
