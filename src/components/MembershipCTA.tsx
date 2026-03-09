import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MembershipCTA = () => (
  <section className="py-20 gradient-saffron">
    <div className="container mx-auto px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6"
      >
        आज ही संगठन से जुड़ें और समाज सेवा का हिस्सा बनें
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/register"
          className="inline-block px-10 py-4 rounded-lg text-lg font-bold bg-accent text-accent-foreground shadow-gold hover:opacity-90 transition-opacity"
        >
          सदस्य पंजीकरण करें
        </Link>
      </motion.div>
    </div>
  </section>
);

export default MembershipCTA;
