import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const AboutSection = () => (
  <section className="py-20 bg-muted">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">हमारे बारे में</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          सनातन स्वयंसेवक संघ एक सामाजिक सेवा संगठन है जिसका उद्देश्य समाज में शिक्षा, स्वास्थ्य, संस्कार और सामाजिक जागरूकता को बढ़ावा देना है। यह संगठन समाज के सभी वर्गों के विकास के लिए कार्य करता है और सेवा कार्यों के माध्यम से राष्ट्र निर्माण में योगदान देता है।
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <div className="w-12 h-12 rounded-full gradient-saffron flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">हमारा मिशन</h3>
          <p className="text-muted-foreground leading-relaxed">
            समाज के कमजोर और जरूरतमंद वर्गों की सहायता करना तथा शिक्षा, स्वास्थ्य और सामाजिक विकास के माध्यम से एक सशक्त समाज का निर्माण करना।
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center mb-4">
            <Eye className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">हमारी दृष्टि</h3>
          <p className="text-muted-foreground leading-relaxed">
            एक ऐसा समाज बनाना जहाँ हर व्यक्ति को शिक्षा, स्वास्थ्य और सम्मानजनक जीवन जीने का अवसर प्राप्त हो।
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
