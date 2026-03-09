import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "होम", path: "/" },
  { label: "हमारे बारे में", path: "/about" },
  { label: "उद्देश्य", path: "/objectives" },
  { label: "गतिविधियां", path: "/activities" },
  { label: "सदस्यता", path: "/register" },
  { label: "संपर्क करें", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="सनातन स्वयंसेवक संघ" className="h-12 w-12 object-contain" />
          <span className="text-lg font-bold text-foreground hidden sm:block">
            सनातन स्वयंसेवक संघ
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="ml-2 px-4 py-2 rounded-md text-sm font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            लॉगिन
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-secondary border-t border-border px-4 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold bg-accent text-accent-foreground"
          >
            लॉगिन
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
