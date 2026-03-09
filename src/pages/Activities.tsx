import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

const activities = [
  { title: "शिक्षा शिविर", desc: "गाँवों में निःशुल्क शिक्षा शिविर का आयोजन", date: "प्रत्येक रविवार", location: "विभिन्न ग्रामीण क्षेत्र" },
  { title: "स्वास्थ्य जांच", desc: "निःशुल्क स्वास्थ्य जांच और दवा वितरण", date: "मासिक", location: "जिला मुख्यालय" },
  { title: "वृक्षारोपण अभियान", desc: "पर्यावरण संरक्षण हेतु वृक्षारोपण", date: "वर्षा ऋतु", location: "सम्पूर्ण जिला" },
  { title: "सांस्कृतिक कार्यक्रम", desc: "भारतीय संस्कृति और परम्पराओं का प्रचार", date: "त्योहारों पर", location: "सामुदायिक केंद्र" },
];

const Activities = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <div className="gradient-saffron py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center">गतिविधियां</h1>
      </div>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 max-w-4xl">
          {activities.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-saffron transition-shadow"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">{a.title}</h3>
              <p className="text-muted-foreground mb-4">{a.desc}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" />{a.date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-primary" />{a.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Activities;
