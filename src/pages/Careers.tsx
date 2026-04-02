import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, ChevronRight, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const Careers = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/vacancies/`);
      if (res.ok) {
        setVacancies(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch vacancies");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { title: "Elite Training", desc: "Access to world-class security protocols and professional growth workshops." },
    { title: "Global Impact", desc: "Be part of high-stakes missions that protect individuals and infrastructure globally." },
    { title: "Cutting-edge Tech", desc: "Work with the latest AI-driven surveillance and tactical response technology." },
    { title: "Competitive Package", desc: "Premium health benefits, insurance, and performance-based incentives." }
  ];

  return (
    <div className="bg-background min-h-screen pt-24 text-foreground">
      <Navbar forceDark={true} />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-border">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-display text-xs uppercase tracking-[0.4em] mb-4 block">Careers at PR7 Security</span>
            <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter mb-8 max-w-4xl mx-auto">
              Defending the <span className="text-primary italic">Future</span> Together
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
              Join an elite squad of security specialists dedicated to uncompromising excellence and safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-card border border-border rounded-3xl hover:border-primary/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl uppercase mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-4">Open <span className="text-primary">Positions</span></h2>
            <p className="text-muted-foreground font-body uppercase tracking-wider text-xs">Current opportunities to join our team</p>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            ) : vacancies.length > 0 ? (
              vacancies.map((job: any) => (
                <motion.div
                  key={job._id}
                  layout
                  className={`bg-card border border-border rounded-3xl overflow-hidden transition-all duration-500 ${expandedId === job._id ? "ring-2 ring-primary/20 bg-secondary/20 shadow-2xl" : "hover:border-primary/30"}`}
                >
                  <div 
                    className="p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                    onClick={() => setExpandedId(expandedId === job._id ? null : job._id)}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-display uppercase rounded-full border border-primary/20">{job.department}</span>
                        <span className="px-3 py-1 bg-secondary text-muted-foreground text-[10px] font-display uppercase rounded-full border border-border">{job.type}</span>
                      </div>
                      <h3 className="font-display text-2xl uppercase tracking-wider">{job.title}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground font-body text-xs uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> Added {new Date(job.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${expandedId === job._id ? "bg-primary text-primary-foreground border-primary rotate-90" : "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"}`}>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {expandedId === job._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-8 pt-4 border-t border-border/50">
                          <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                              <h4 className="font-display text-sm uppercase text-primary tracking-widest">Role Overview</h4>
                              <p className="text-muted-foreground font-body text-sm leading-relaxed whitespace-pre-line">
                                {job.description}
                              </p>
                            </div>
                            <div className="space-y-6">
                              <h4 className="font-display text-sm uppercase text-primary tracking-widest">Key Requirements</h4>
                              <ul className="space-y-3">
                                {job.requirements.map((req: string, idx: number) => (
                                  <li key={idx} className="flex gap-3 text-muted-foreground font-body text-sm leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Application Form */}
                          <div className="mt-12 pt-12 border-t border-border/50">
                            <div className="max-w-2xl">
                              <h3 className="font-display text-2xl uppercase mb-8">Quick <span className="text-primary">Apply</span></h3>
                              <form 
                                className="grid md:grid-cols-2 gap-6"
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  const formData = new FormData(e.currentTarget);
                                  const data = {
                                    job_id: job._id,
                                    job_title: job.title,
                                    name: formData.get("name"),
                                    qualification: formData.get("qualification"),
                                    mobile: formData.get("mobile"),
                                    email: formData.get("email"),
                                    address: formData.get("address"),
                                    pincode: formData.get("pincode"),
                                  };

                                  try {
                                    const res = await fetch(`${API_BASE_URL}/applications/`, {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify(data),
                                    });
                                    if (res.ok) {
                                      import("sonner").then(({ toast }) => toast.success("Application submitted successfully!"));
                                      (e.target as HTMLFormElement).reset();
                                    }
                                  } catch (error) {
                                    import("sonner").then(({ toast }) => toast.error("Failed to submit application"));
                                  }
                                }}
                              >
                                <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground px-1">Name*</label>
                                  <input name="name" required placeholder="Enter Name" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground px-1">Qualification*</label>
                                  <input name="qualification" required placeholder="Enter Qualification" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground px-1">Mobile No*</label>
                                  <input name="mobile" required placeholder="Enter Mobile No" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground px-1">Email Id*</label>
                                  <input name="email" type="email" required placeholder="Enter Email Id" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground px-1">Address*</label>
                                  <textarea name="address" required placeholder="Enter Address" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all min-h-[100px]" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground px-1">Pincode*</label>
                                  <input name="pincode" required placeholder="Enter Pincode" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                </div>
                                <div className="md:col-span-2 pt-4">
                                  <button 
                                    type="submit"
                                    className="w-full md:w-auto px-12 py-4 bg-primary text-primary-foreground font-display text-xs uppercase tracking-[0.2em] rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                  >
                                    Submit Application <ArrowRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-card rounded-3xl border border-border">
                <Briefcase className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                <h3 className="font-display text-xl uppercase mb-2">No Active Openings</h3>
                <p className="text-muted-foreground font-body text-sm">Please check back later or send your CV to careers@pr7security.com</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
