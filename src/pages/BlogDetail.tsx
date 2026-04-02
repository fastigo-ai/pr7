import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }

        const recentRes = await fetch(`${API_BASE_URL}/blogs/`);
        if (recentRes.ok) {
          const recentData = await recentRes.json();
          setRecentBlogs(recentData.filter((b: any) => b._id !== id).slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Navbar forceDark={true} />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-background min-h-screen pt-24 text-center">
        <Navbar forceDark={true} />
        <div className="container mx-auto px-6 py-24">
          <h1 className="font-display text-4xl mb-8 uppercase text-foreground">Article Not Found</h1>
          <Link to="/blogs">
            <Button variant="outline">Back to Blogs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-24 text-foreground">
      <Navbar forceDark={true} />
      
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${blog.image_url})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex gap-4 items-center mb-8">
              <span className="px-4 py-1.5 bg-primary text-primary-foreground font-display text-xs uppercase tracking-widest rounded-full">
                {blog.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-white/70 font-body">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(blog.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><User className="w-4 h-4" /> PR7 Team</span>
              </div>
            </div>
            
            <h1 className="font-display text-5xl md:text-8xl uppercase text-white mb-8 leading-[0.95]">
              {blog.title}
            </h1>
            
            <div className="flex gap-6 items-center">
               <Link to="/blogs" className="inline-flex items-center text-primary/90 hover:text-primary uppercase tracking-widest text-xs font-display transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
              </Link>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex gap-4">
                 <button className="text-white/60 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></button>
                 <button className="text-white/60 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></button>
                 <button className="text-white/60 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Table of contents / Sidebar (Optional) */}
            <div className="hidden lg:block lg:col-span-1">
               <div className="sticky top-40 flex flex-col gap-8 text-muted-foreground">
                  <Bookmark className="w-6 h-6 hover:text-primary cursor-pointer" />
                  <Share2 className="w-6 h-6 hover:text-primary cursor-pointer" />
               </div>
            </div>

            {/* Article Body */}
            <div className="lg:col-span-8 flex flex-col">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wider prose-p:font-body prose-p:leading-loose prose-p:text-muted-foreground"
              >
                {blog.content.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </motion.div>
              
              {/* Tags & Share */}
              <div className="mt-16 pt-8 border-t border-border flex flex-wrap justify-between items-center gap-8">
                 <div className="flex gap-4">
                    {["#Safety", "#Security", "#PR7"].map(tag => (
                      <span key={tag} className="text-xs uppercase font-display text-muted-foreground hover:text-primary cursor-pointer">
                        {tag}
                      </span>
                    ))}
                 </div>
                 <div className="flex items-center gap-4 text-xs font-display uppercase tracking-widest text-muted-foreground">
                    Share this article:
                    <div className="flex gap-4 text-foreground">
                       <Facebook className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
                       <Twitter className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
                       <Linkedin className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Sidebar (Recent/Newsletter) */}
            <div className="lg:col-span-3 space-y-12">
               <div className="p-8 bg-card border border-border rounded-2xl">
                  <h3 className="font-display text-xl uppercase mb-6 text-foreground">Newsletter</h3>
                  <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">Get the latest security reports delivered to your inbox.</p>
                  <div className="space-y-4">
                     <input type="email" placeholder="Email" className="w-full bg-background border border-border px-4 py-3 rounded-lg text-sm focus:border-primary/50 outline-none" />
                     <Button className="w-full uppercase tracking-tighter text-xs">Join Now</Button>
                  </div>
               </div>
               
               <div className="space-y-8">
                  <h3 className="font-display text-xl uppercase text-foreground">Recent Posts</h3>
                  <div className="space-y-6">
                    {recentBlogs.map((recentPost) => (
                        <Link 
                          key={recentPost._id} 
                          to={`/blogs/${recentPost._id}`} 
                          className="flex gap-4 group"
                        >
                           <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden shrink-0 border border-border">
                              <img src={recentPost.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           </div>
                           <div className="flex flex-col justify-center">
                              <h4 className="font-display text-xs uppercase text-foreground group-hover:text-primary transition-colors leading-tight mb-1 line-clamp-2">{recentPost.title}</h4>
                              <span className="text-[10px] text-muted-foreground uppercase">{new Date(recentPost.created_at).toLocaleDateString()}</span>
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;
