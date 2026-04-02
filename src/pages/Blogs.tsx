import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import parallaxCity from "@/assets/parallax-city.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const BlogCard = ({ blog, index }: { blog: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all flex flex-col"
  >
    <div className="relative aspect-video overflow-hidden">
      <img 
        src={blog.image_url} 
        alt={blog.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-display uppercase tracking-widest rounded-full">
          {blog.category}
        </span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-4">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.created_at).toLocaleDateString()}</span>
        <span className="flex items-center gap-1"><User className="w-3 h-3" /> PR7 Team</span>
      </div>
      <h3 className="font-display text-xl uppercase mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
        {blog.title}
      </h3>
      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6 line-clamp-3">
        {blog.excerpt}
      </p>
      <div className="mt-auto">
        <Link 
          to={`/blogs/${blog._id}`} 
          className="inline-flex items-center gap-2 text-primary font-display text-xs uppercase tracking-widest hover:gap-3 transition-all"
        >
          Read Article <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen pt-24 text-foreground">
      <Navbar forceDark={true} />
      
      {/* Hero Header */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
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
              Security <span className="text-primary italic">Insights</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search articles or categories..." 
                className="w-full bg-card border border-border rounded-full py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 transition-all font-body text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blogs Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap items-center justify-between mb-12 gap-6">
            <h2 className="font-display text-3xl uppercase">Latest from the blog</h2>
            <div className="flex items-center gap-4 text-xs font-display uppercase tracking-widest text-muted-foreground">
              <Tag className="w-4 h-4 text-primary" />
              <span>Trending: </span>
              <span className="text-foreground hover:text-primary cursor-pointer transition-colors">AI Security</span>
              <span>/</span>
              <span className="text-foreground hover:text-primary cursor-pointer transition-colors">VIP Protection</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center">
                <p className="text-muted-foreground font-body text-lg italic">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-4xl border-t border-border pt-24">
          <h2 className="font-display text-2xl md:text-4xl uppercase text-foreground mb-8">
            Stay Updated with PR7 Security
          </h2>
          <p className="text-muted-foreground font-body mb-10 max-w-2xl mx-auto">
            Join our newsletter to receive the latest security audits, industry news, and expert tips directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
             <input type="email" placeholder="Your Email Address" className="flex-grow bg-card border border-border px-6 py-4 rounded-xl focus:outline-none focus:border-primary/50 font-body text-sm" />
             <button className="bg-primary text-primary-foreground font-display uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-primary/90 transition-all text-xs font-bold shadow-lg shadow-primary/20">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
