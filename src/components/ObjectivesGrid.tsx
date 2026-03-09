import { motion } from "framer-motion";
import { BookOpen, HeartPulse, TreePine, Users, Lightbulb, Home, HandHeart, Music } from "lucide-react";

const objectives = [
  { icon: BookOpen, label: "शिक्षा" },
  { icon: HeartPulse, label: "स्वास्थ्य सेवा" },
  { icon: TreePine, label: "पर्यावरण संरक्षण" },
  { icon: Users, label: "महिला सशक्तिकरण" },
  { icon: Lightbulb, label: "युवा विकास" },
  { icon: Home, label: "ग्रामीण विकास" },
  { icon: HandHeart, label: "सामाजिक सेवा" },
  { icon: Music, label: "सांस्कृतिक कार्यक्रम" },
];

const ObjectivesGrid = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
        हमारे उद्देश्य
      </h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        समाज के कमजोर और जरूरतमंद वर्गों की सहायता करना तथा शिक्षा, स्वास्थ्य और सामाजिक विकास के माध्यम से एक सशक्त समाज का निर्माण करना।
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {objectives.map((obj, i) => (
          <motion.div
            key={obj.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-saffron hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full gradient-saffron flex items-center justify-center group-hover:scale-110 transition-transform">
              <obj.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">{obj.label}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ObjectivesGrid;
