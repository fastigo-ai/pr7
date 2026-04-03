import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import parallaxCity from "@/assets/parallax-city.jpg";
import { useEffect, useState } from "react";

const API_BASE_URL = "https://pr7backend.onrender.com/api/v1";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gallery/`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
             const dynamicImages = data.map((item: any) => ({
               title: item.title,
               img: item.image_url
             }));
             setGalleryImages(dynamicImages);
          }
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };
    fetchGallery();
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
            Our <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto uppercase tracking-widest text-sm">
            Glimpses of PR7 Security's excellence
          </p>
        </div>
      </div>

      {/* Gallery Masonry */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((item, i) => (
              <motion.div
                key={item.title + i}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" }}
                className="relative group break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 bg-card border border-border"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-8 h-1 bg-primary mb-3" />
                    <h3 className="text-white font-display text-xl tracking-wider uppercase drop-shadow-md">
                      {item.title}
                    </h3>
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

export default Gallery;
