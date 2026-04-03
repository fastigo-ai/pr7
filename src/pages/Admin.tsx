import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Plus, Edit, Loader2, Image as ImageIcon, LogOut, FileText, Briefcase, Globe, MapPin, UserPlus, Users, Mail, Phone, GraduationCap, Navigation } from "lucide-react";

const API_BASE_URL = "https://pr7backend.onrender.com/api/v1";

const Admin = () => {
  const [gallery, setGallery] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      toast.error("Please login to access admin panel");
      navigate("/login");
    }
  }, [navigate]);

  // Edit states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editType, setEditType] = useState<"gallery" | "services" | "blogs" | "projects" | "vacancies" | null>(null);

  // Form states
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  
  const [serviceHeading, setServiceHeading] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceLongDescription, setServiceLongDescription] = useState("");
  const [serviceGuidelines, setServiceGuidelines] = useState("");
  const [serviceFile, setServiceFile] = useState<File | null>(null);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogFile, setBlogFile] = useState<File | null>(null);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectSector, setProjectSector] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectFile, setProjectFile] = useState<File | null>(null);

  const [vacancyTitle, setVacancyTitle] = useState("");
  const [vacancyDept, setVacancyDept] = useState("");
  const [vacancyLoc, setVacancyLoc] = useState("");
  const [vacancyType, setVacancyType] = useState("Full-time");
  const [vacancyDesc, setVacancyDesc] = useState("");
  const [vacancyReqs, setVacancyReqs] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const gRes = await fetch(`${API_BASE_URL}/gallery/`);
      const sRes = await fetch(`${API_BASE_URL}/services/`);
      const bRes = await fetch(`${API_BASE_URL}/blogs/`);
      const pRes = await fetch(`${API_BASE_URL}/projects/`);
      const vRes = await fetch(`${API_BASE_URL}/vacancies/`);
      const aRes = await fetch(`${API_BASE_URL}/applications/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` }
      });
      
      if (gRes.ok) setGallery(await gRes.json());
      if (sRes.ok) setServices(await sRes.json());
      if (bRes.ok) setBlogs(await bRes.json());
      if (pRes.ok) setProjects(await pRes.json());
      if (vRes.ok) setVacancies(await vRes.json());
      if (aRes.ok) setApplications(await aRes.json());
    } catch (error) {
      toast.error("Failed to connect to backend API");
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile || !galleryTitle) return toast.error("Please fill all fields");
    setUploading(true);
    const formData = new FormData();
    formData.append("title", galleryTitle);
    formData.append("file", galleryFile);
    try {
      const res = await fetch(`${API_BASE_URL}/gallery/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: formData,
      });
      if (res.ok) {
        toast.success("Uploaded to gallery!");
        setGalleryTitle("");
        setGalleryFile(null);
        fetchData();
      }
    } catch (error) { toast.error("Upload failed"); } finally { setUploading(false); }
  };

  const handleServiceUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFile || !serviceHeading || !serviceDescription) return toast.error("Please fill all fields");
    setUploading(true);
    const formData = new FormData();
    formData.append("heading", serviceHeading);
    formData.append("description", serviceDescription);
    formData.append("long_description", serviceLongDescription);
    formData.append("guidelines", serviceGuidelines);
    formData.append("file", serviceFile);
    try {
      const res = await fetch(`${API_BASE_URL}/services/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: formData,
      });
      if (res.ok) {
        toast.success("Service posted!");
        setServiceHeading("");
        setServiceDescription("");
        setServiceLongDescription("");
        setServiceGuidelines("");
        setServiceFile(null);
        fetchData();
      }
    } catch (error) { toast.error("Post failed"); } finally { setUploading(false); }
  };

  const handleBlogUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogFile || !blogTitle || !blogExcerpt || !blogContent || !blogCategory) return toast.error("Please fill all fields");
    setUploading(true);
    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("excerpt", blogExcerpt);
    formData.append("content", blogContent);
    formData.append("category", blogCategory);
    formData.append("file", blogFile);
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: formData,
      });
      if (res.ok) {
        toast.success("Blog post published!");
        setBlogTitle("");
        setBlogExcerpt("");
        setBlogContent("");
        setBlogCategory("");
        setBlogFile(null);
        fetchData();
      }
    } catch (error) { toast.error("Blog post failed"); } finally { setUploading(false); }
  };

  const handleProjectUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFile || !projectTitle || !projectSector || !projectLocation || !projectDescription) return toast.error("Please fill all fields");
    setUploading(true);
    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("sector", projectSector);
    formData.append("location", projectLocation);
    formData.append("description", projectDescription);
    formData.append("file", projectFile);
    try {
      const res = await fetch(`${API_BASE_URL}/projects/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: formData,
      });
      if (res.ok) {
        toast.success("Project highlight published!");
        setProjectTitle("");
        setProjectSector("");
        setProjectLocation("");
        setProjectDescription("");
        setProjectFile(null);
        fetchData();
      }
    } catch (error) { toast.error("Project post failed"); } finally { setUploading(false); }
  };

  const handleVacancyUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacancyTitle || !vacancyDept || !vacancyLoc || !vacancyDesc || !vacancyReqs) return toast.error("Please fill all fields");
    setUploading(true);
    const vacancyData = {
      title: vacancyTitle,
      department: vacancyDept,
      location: vacancyLoc,
      type: vacancyType,
      description: vacancyDesc,
      requirements: vacancyReqs.split(",").map(r => r.trim())
    };
    try {
      const res = await fetch(`${API_BASE_URL}/vacancies/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}`, "Content-Type": "application/json" },
        body: JSON.stringify(vacancyData),
      });
      if (res.ok) {
        toast.success("Job vacancy posted!");
        setVacancyTitle("");
        setVacancyDept("");
        setVacancyLoc("");
        setVacancyDesc("");
        setVacancyReqs("");
        fetchData();
      }
    } catch (error) { toast.error("Post failed"); } finally { setUploading(false); }
  };

  const handleDelete = async (type: "gallery" | "services" | "blogs" | "projects" | "vacancies" | "applications", id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/${type}/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.ok) {
        toast.success("Deleted successfully");
        fetchData();
      }
    } catch (error) { toast.error("Delete failed"); }
  };

  const startEdit = (type: "gallery" | "services" | "blogs" | "projects" | "vacancies", item: any) => {
    setEditType(type);
    setEditingItem(item);
    if (type === "gallery") setGalleryTitle(item.title);
    else if (type === "services") {
      setServiceHeading(item.heading);
      setServiceDescription(item.description);
      setServiceLongDescription(item.long_description || "");
      setServiceGuidelines(item.guidelines ? item.guidelines.join(", ") : "");
    } else if (type === "blogs") {
      setBlogTitle(item.title);
      setBlogExcerpt(item.excerpt);
      setBlogContent(item.content);
      setBlogCategory(item.category);
    } else if (type === "projects") {
      setProjectTitle(item.title);
      setProjectSector(item.sector);
      setProjectLocation(item.location);
      setProjectDescription(item.description);
    } else if (type === "vacancies") {
      setVacancyTitle(item.title);
      setVacancyDept(item.department);
      setVacancyLoc(item.location);
      setVacancyType(item.type);
      setVacancyDesc(item.description);
      setVacancyReqs(item.requirements.join(", "));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editType) return;
    setUploading(true);
    const token = localStorage.getItem("admin_token");
    try {
      if (editType === "vacancies") {
        const vacancyData = {
          title: vacancyTitle,
          department: vacancyDept,
          location: vacancyLoc,
          type: vacancyType,
          description: vacancyDesc,
          requirements: vacancyReqs.split(",").map(r => r.trim())
        };
        const res = await fetch(`${API_BASE_URL}/vacancies/${editingItem._id}`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(vacancyData),
        });
        if (res.ok) { toast.success("Updated successfully!"); cancelEdit(); fetchData(); }
      } else {
        const formData = new FormData();
        if (editType === "gallery") { formData.append("title", galleryTitle); if (galleryFile) formData.append("file", galleryFile); }
        else if (editType === "services") { formData.append("heading", serviceHeading); formData.append("description", serviceDescription); formData.append("long_description", serviceLongDescription); formData.append("guidelines", serviceGuidelines); if (serviceFile) formData.append("file", serviceFile); }
        else if (editType === "blogs") { formData.append("title", blogTitle); formData.append("excerpt", blogExcerpt); formData.append("content", blogContent); formData.append("category", blogCategory); if (blogFile) formData.append("file", blogFile); }
        else if (editType === "projects") { formData.append("title", projectTitle); formData.append("sector", projectSector); formData.append("location", projectLocation); formData.append("description", projectDescription); if (projectFile) formData.append("file", projectFile); }
        const res = await fetch(`${API_BASE_URL}/${editType}/${editingItem._id}`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) { toast.success("Updated successfully!"); cancelEdit(); fetchData(); }
      }
    } catch (error) { toast.error("Update failed"); } finally { setUploading(false); }
  };

  const cancelEdit = () => {
    setEditingItem(null); setEditType(null);
    setGalleryTitle(""); setGalleryFile(null);
    setServiceHeading(""); setServiceDescription(""); setServiceLongDescription(""); setServiceGuidelines(""); setServiceFile(null);
    setBlogTitle(""); setBlogExcerpt(""); setBlogContent(""); setBlogCategory(""); setBlogFile(null);
    setProjectTitle(""); setProjectSector(""); setProjectLocation(""); setProjectDescription(""); setProjectFile(null);
    setVacancyTitle(""); setVacancyDept(""); setVacancyLoc(""); setVacancyType("Full-time"); setVacancyDesc(""); setVacancyReqs("");
  };

  return (
    <div className="min-h-screen bg-background pt-24 font-body">
      <Navbar forceDark={true} />
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div className="space-y-2">
            <h1 className="font-display text-4xl uppercase tracking-tighter">Admin <span className="text-primary">Panel</span></h1>
            <p className="text-muted-foreground text-xs uppercase tracking-widest">Global Operations Control</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { localStorage.removeItem("admin_token"); navigate("/login"); }} className="group border-destructive/20 hover:bg-destructive hover:text-white transition-all duration-300">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="mb-8 p-1 bg-secondary/50 backdrop-blur-sm rounded-xl overflow-x-auto w-full justify-start border border-border">
            <TabsTrigger value="gallery" className="px-6 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Gallery</TabsTrigger>
            <TabsTrigger value="services" className="px-6 flex items-center gap-2"><Plus className="w-4 h-4" /> Services</TabsTrigger>
            <TabsTrigger value="blogs" className="px-6 flex items-center gap-2"><FileText className="w-4 h-4" /> Blogs</TabsTrigger>
            <TabsTrigger value="projects" className="px-6 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Projects</TabsTrigger>
            <TabsTrigger value="vacancies" className="px-6 flex items-center gap-2"><UserPlus className="w-4 h-4" /> Vacancies</TabsTrigger>
            <TabsTrigger value="applications" className="px-6 flex items-center gap-2"><Users className="w-4 h-4" /> Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-8">
            <form onSubmit={editingItem ? handleUpdate : handleGalleryUpload} className="bg-card p-8 rounded-2xl border border-border space-y-6">
              <h2 className="font-display text-xl uppercase">{editingItem ? "Edit Photos" : "Add Photos"}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="Title" value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} />
                <Input type="file" onChange={(e) => setGalleryFile(e.target.files?.[0] || null)} />
              </div>
              <Button type="submit" disabled={uploading}>Upload</Button>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((item: any) => (
                <div key={item._id} className="relative aspect-video rounded-xl overflow-hidden border border-border group">
                   <img src={item.image_url} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <Button variant="ghost" size="icon" onClick={() => startEdit("gallery", item)}><Edit className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleDelete("gallery", item._id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                   </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-8">
            <form onSubmit={editingItem ? handleUpdate : handleServiceUpload} className="bg-card p-8 rounded-2xl border border-border space-y-6">
               <h2 className="font-display text-xl uppercase">Post Service</h2>
               <div className="space-y-4">
                 <Input placeholder="Heading" value={serviceHeading} onChange={(e) => setServiceHeading(e.target.value)} />
                 <Textarea placeholder="Short Description" value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} />
                 <Textarea placeholder="Long Description" value={serviceLongDescription} onChange={(e) => setServiceLongDescription(e.target.value)} />
                 <Input placeholder="Guidelines (comma separated)" value={serviceGuidelines} onChange={(e) => setServiceGuidelines(e.target.value)} />
                 <Input type="file" onChange={(e) => setServiceFile(e.target.files?.[0] || null)} />
               </div>
               <Button type="submit">Publish</Button>
            </form>
            {services.map((item: any) => (
              <div key={item._id} className="flex p-4 bg-card rounded-xl border border-border items-center gap-4">
                 <img src={item.image_url} className="w-16 h-16 object-cover rounded" />
                 <span className="flex-1 font-display uppercase">{item.heading}</span>
                 <div className="flex gap-2">
                   <Button variant="ghost" size="icon" onClick={() => startEdit("services", item)}><Edit className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" onClick={() => handleDelete("services", item._id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                 </div>
              </div>
            ))}
          </TabsContent>

          {/* ... (Blogs & Projects contents same as provided previously, kept thin for brevity but fully functional in final code) */}
          <TabsContent value="blogs" className="space-y-8">
            <form onSubmit={editingItem ? handleUpdate : handleBlogUpload} className="bg-card p-8 rounded-2xl border border-border space-y-4">
              <Input placeholder="Blog Title" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
              <Input placeholder="Category" value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} />
              <Textarea placeholder="Excerpt" value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} />
              <Textarea placeholder="Content" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} className="min-h-[200px]" />
              <Input type="file" onChange={(e) => setBlogFile(e.target.files?.[0] || null)} />
              <Button type="submit">Post Blog</Button>
            </form>
            {blogs.map((item: any) => (
               <div key={item._id} className="flex p-4 bg-card border border-border rounded-xl items-center gap-4">
                  <img src={item.image_url} className="w-12 h-12 object-cover rounded" />
                  <span className="flex-1 text-sm font-display uppercase">{item.title}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEdit("blogs", item)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete("blogs", item._id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
               </div>
            ))}
          </TabsContent>

          <TabsContent value="projects" className="space-y-8">
             <form onSubmit={editingItem ? handleUpdate : handleProjectUpload} className="bg-card p-8 rounded-2xl border border-border space-y-4">
                <Input placeholder="Project Title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
                <Input placeholder="Sector" value={projectSector} onChange={(e) => setProjectSector(e.target.value)} />
                <Input placeholder="Location" value={projectLocation} onChange={(e) => setProjectLocation(e.target.value)} />
                <Textarea placeholder="Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                <Input type="file" onChange={(e) => setProjectFile(e.target.files?.[0] || null)} />
                <Button type="submit">Publish</Button>
             </form>
             {projects.map((item: any) => (
                <div key={item._id} className="flex p-4 bg-card border border-border rounded-xl items-center gap-4">
                   <img src={item.image_url} className="w-12 h-12 object-cover rounded" />
                   <span className="flex-1 text-sm font-display uppercase">{item.title}</span>
                   <div className="flex gap-2">
                     <Button variant="ghost" size="icon" onClick={() => startEdit("projects", item)}><Edit className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleDelete("projects", item._id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                   </div>
                </div>
             ))}
          </TabsContent>

          <TabsContent value="vacancies" className="space-y-8">
             <form onSubmit={editingItem ? handleUpdate : handleVacancyUpload} className="bg-card p-8 rounded-2xl border border-border space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Title" value={vacancyTitle} onChange={(e) => setVacancyTitle(e.target.value)} />
                  <Input placeholder="Department" value={vacancyDept} onChange={(e) => setVacancyDept(e.target.value)} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Location" value={vacancyLoc} onChange={(e) => setVacancyLoc(e.target.value)} />
                  <select value={vacancyType} onChange={(e) => setVacancyType(e.target.value)} className="bg-background border border-border rounded-md px-3 text-sm">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
                <Textarea placeholder="Job Description" value={vacancyDesc} onChange={(e) => setVacancyDesc(e.target.value)} />
                <Textarea placeholder="Requirements (comma separated)" value={vacancyReqs} onChange={(e) => setVacancyReqs(e.target.value)} />
                <Button type="submit">List Job</Button>
             </form>
             {vacancies.map((item: any) => (
                <div key={item._id} className="flex p-4 bg-card border border-border rounded-xl items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Briefcase className="w-5 h-5" /></div>
                   <div className="flex-1">
                      <h4 className="text-sm font-display uppercase">{item.title}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase">{item.department} | {item.location}</p>
                   </div>
                   <div className="flex gap-2">
                     <Button variant="ghost" size="icon" onClick={() => startEdit("vacancies", item)}><Edit className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleDelete("vacancies", item._id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                   </div>
                </div>
             ))}
          </TabsContent>

          <TabsContent value="applications" className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-xl border border-border">
                  <h2 className="font-display text-xl uppercase tracking-wider flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    Incoming Applications
                  </h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-display">{applications.length} TOTAL</span>
                </div>

                <div className="grid gap-6">
                  {applications.length > 0 ? (
                    Object.entries(applications.reduce((acc, app: any) => {
                      (acc[app.job_title] = acc[app.job_title] || []).push(app);
                      return acc;
                    }, {} as any)).map(([jobTitle, apps]: [string, any]) => (
                      <div key={jobTitle} className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-px bg-border flex-1" />
                          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-primary">{jobTitle}</span>
                          <div className="h-px bg-border flex-1" />
                        </div>
                        <div className="grid gap-4">
                          {apps.map((app: any) => (
                            <div key={app._id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                              <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-display text-lg uppercase tracking-wider text-foreground">{app.name}</h3>
                                    <span className="text-[10px] text-muted-foreground uppercase font-body">{new Date(app.created_at).toLocaleDateString()}</span>
                                  </div>
                                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <Mail className="w-4 h-4 text-primary" />
                                      <a href={`mailto:${app.email}`} className="hover:text-primary transition-colors">{app.email}</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <Phone className="w-4 h-4 text-primary" />
                                      <a href={`tel:${app.mobile}`} className="hover:text-primary transition-colors">{app.mobile}</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <GraduationCap className="w-4 h-4 text-primary" />
                                      {app.qualification}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground lg:col-span-2">
                                      <Navigation className="w-4 h-4 text-primary" />
                                      {app.address} ({app.pincode})
                                    </div>
                                  </div>
                                </div>
                                <div className="flex md:flex-col justify-end items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-destructive hover:bg-destructive/10 opacity-60 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleDelete("applications", app._id)}
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                       <Users className="w-12 h-12 text-primary/20 mx-auto mb-4" />
                       <h3 className="font-display text-xl text-muted-foreground uppercase">No applications received yet</h3>
                    </div>
                  )}
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
