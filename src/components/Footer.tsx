import { Shield, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="py-16 bg-background border-t border-border mt-auto">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Brand & Mission */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          <span className="font-display text-xl uppercase tracking-widest text-foreground">
            PR7<span className="text-primary">Security</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-sm">
          OUR COMPANY PROVIDES ALL SECURITY SERVICES ALL OVER INDIA, DIFFERENT INDUSTRIES, BANK, RESIDENT, HOSPITAL, HOTEL, GARDEN, BODY GUARD. OUR SECURITY GUARD IS CAPABLE OF HANDLING HAZARDOUS SITUATIONS.
        </p>
        <div className="flex items-center gap-4 mt-2">
           <a href="https://www.facebook.com/share/18T6MXstpD/" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group"><Facebook size={18} className="group-hover:scale-110 transition-transform" /></a>
           <a href="https://twitter.com/LtdPr7/status/1411214071341350917?s=19" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group"><Twitter size={18} className="group-hover:scale-110 transition-transform" /></a>
           <a href="https://www.instagram.com/007bimlesh?igsh=MW8zdzk5a3RzandkNw==" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group"><Instagram size={18} className="group-hover:scale-110 transition-transform" /></a>
           <a href="https://www.youtube.com/@pr7securityandplacementser87" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group"><Youtube size={18} className="group-hover:scale-110 transition-transform" /></a>
        </div>
      </div>

      {/* Information */}
      <div className="flex flex-col gap-6 lg:pl-12">
        <h4 className="font-display text-lg uppercase tracking-widest text-foreground">Information</h4>
        <div className="space-y-4 text-sm text-muted-foreground font-body">
          <p className="border-b border-border pb-4"><strong className="text-foreground block mb-1">Tel:</strong> (+91) 09810815557, 8010423461</p>
          <p className="border-b border-border pb-4"><strong className="text-foreground block mb-1">Email:</strong>customer_support@pr7security.in<br/>pr7security@gmail.com</p>
          <p className="pb-2"><strong className="text-foreground block mb-1">Working Hours:</strong> 10.30 AM - 6.30 PM</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-6 lg:pl-12">
        <h4 className="font-display text-lg uppercase tracking-widest text-foreground">Location</h4>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            <strong className="text-foreground block mb-1">New Delhi Office:</strong>
            T-20, 3rd Floor, PlotNo-13 MLUPocket,<br />Sector-5, Dwarka New Delhi-110078
          </p>
          <div className="w-full h-40 mt-2 rounded-xl overflow-hidden border border-border shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28021.375602706037!2d77.0110031222038!3d28.609616646669572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ab53b43ab41%3A0x2b141445311f4066!2sPR%207%20Security%20%26%20Placement%20Services%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1773309526162!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="PR7 Security Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    
    <div className="container mx-auto px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground font-body w-full text-center">
        © Copyright PR7 Security Pvt Ltd. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
