import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    />
    <div className="absolute inset-0 gradient-hero" />
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto"
      >
        सनातन संस्कृति और समाज सेवा के लिए एकजुट हों
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-6 text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed"
      >
        सनातन स्वयंसेवक संघ समाज सेवा, शिक्षा, स्वास्थ्य और सांस्कृतिक जागरूकता के क्षेत्रों में कार्य करने वाला संगठन है।
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          to="/register"
          className="px-8 py-4 rounded-lg text-lg font-semibold bg-accent text-accent-foreground shadow-gold hover:opacity-90 transition-opacity"
        >
          सदस्य बनें
        </Link>
        <Link
          to="/about"
          className="px-8 py-4 rounded-lg text-lg font-semibold bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/30 backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors"
        >
          और जानें
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
