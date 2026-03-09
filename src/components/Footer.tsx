import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="gradient-saffron text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">सनातन स्वयंसेवक संघ</h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            समाज सेवा, शिक्षा, स्वास्थ्य और सांस्कृतिक जागरूकता के क्षेत्रों में कार्य करने वाला संगठन।
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">त्वरित लिंक</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">हमारे बारे में</Link></li>
            <li><Link to="/objectives" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">उद्देश्य</Link></li>
            <li><Link to="/register" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">सदस्य बनें</Link></li>
            <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">संपर्क करें</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">संपर्क</h4>
          <p className="text-primary-foreground/80 text-sm">ईमेल: info@sanatansss.org</p>
          <p className="text-primary-foreground/80 text-sm mt-1">फ़ोन: +91 9876543210</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/70">
        © {new Date().getFullYear()} सनातन स्वयंसेवक संघ। सर्वाधिकार सुरक्षित।
      </div>
    </div>
  </footer>
);

export default Footer;
