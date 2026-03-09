import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { type Member } from "@/lib/members";
import { QRCodeSVG } from "qrcode.react";
import { LogOut, Download, User, Phone, MapPin, Calendar, CreditCard } from "lucide-react";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentMember");
    if (!stored) { navigate("/login"); return; }
    setMember(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentMember");
    navigate("/");
  };

  if (!member) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">सदस्य डैशबोर्ड</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90">
              <LogOut className="w-4 h-4" /> लॉगआउट
            </button>
          </div>

          {/* Member Info */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-3">
            <div className="flex items-center gap-3"><User className="w-5 h-5 text-primary" /><span className="text-foreground"><strong>नाम:</strong> {member.name}</span></div>
            <div className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-primary" /><span className="text-foreground"><strong>सदस्य आईडी:</strong> {member.membershipId}</span></div>
            <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /><span className="text-foreground"><strong>मोबाइल:</strong> {member.mobile}</span></div>
            <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /><span className="text-foreground"><strong>स्थान:</strong> {member.place}</span></div>
            <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /><span className="text-foreground"><strong>पंजीकरण तिथि:</strong> {new Date(member.registrationDate).toLocaleDateString("hi-IN")}</span></div>
          </div>

          {/* Membership Card Preview */}
          <div className="bg-card border-2 border-primary rounded-xl overflow-hidden mb-6">
            <div className="gradient-saffron p-4 flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-12 h-12" />
              <div>
                <h3 className="text-primary-foreground font-bold text-lg">सनातन स्वयंसेवक संघ</h3>
                <p className="text-primary-foreground/80 text-sm">सदस्यता कार्ड</p>
              </div>
            </div>
            <div className="p-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex-1 space-y-2 text-sm">
                <p><strong className="text-foreground">नाम:</strong> <span className="text-muted-foreground">{member.name}</span></p>
                <p><strong className="text-foreground">सदस्य आईडी:</strong> <span className="text-muted-foreground">{member.membershipId}</span></p>
                <p><strong className="text-foreground">मोबाइल:</strong> <span className="text-muted-foreground">{member.mobile}</span></p>
                <p><strong className="text-foreground">स्थान:</strong> <span className="text-muted-foreground">{member.place}</span></p>
              </div>
              <QRCodeSVG value={JSON.stringify({ id: member.membershipId, name: member.name, mobile: member.mobile })} size={120} />
            </div>
          </div>

          <button className="w-full py-3 rounded-lg font-semibold gradient-gold text-accent-foreground shadow-gold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-lg">
            <Download className="w-5 h-5" /> सदस्यता कार्ड डाउनलोड करें
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
