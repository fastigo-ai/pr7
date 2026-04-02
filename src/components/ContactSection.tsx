import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    { icon: Phone, label: "Call Us", value: "09810815557, 8010423461" },
    { icon: Mail, label: "Email", value: "customer_support@pr7security.in" },
    { icon: MapPin, label: "New Delhi Office", value: "T-20, 3rd Floor, PlotNo-13 MLUPocket, Sector-5, Dwarka New Delhi-110078" },
  ];

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl uppercase text-foreground">
            Get In <span className="text-gradient-gold">Touch</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-body uppercase tracking-widest text-sm">
            OUR COMPANY PROVIDES ALL SECURITY SERVICES ALL OVER IN INDIA
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-background border border-border rounded-sm hover:border-primary/50 transition-colors group"
            >
              <div className="p-4 bg-secondary rounded-sm mb-6 group-hover:bg-primary transition-colors">
                <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="font-display text-base uppercase tracking-wider text-foreground mb-2">
                {item.label}
              </div>
              <div className="text-muted-foreground font-body text-sm whitespace-pre-line leading-relaxed">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Width Map */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full h-[500px] grayscale hover:grayscale-0 transition-all duration-700 brightness-75 hover:brightness-100 border-y border-border"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.210515124031!2d77.05608627549925!3d28.591959775686036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ad38466e3fb%3A0xc3191176b6d57a2c!2sDwarka%20Sector%205!5e0!3m2!1sen!2sin!4v1712056000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="PR7 Security Services Location"
        />
      </motion.div>
    </section>
  );
};

export default ContactSection;

