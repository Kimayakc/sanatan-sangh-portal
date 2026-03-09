import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { registerMember, type Member } from "@/lib/members";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const Register = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ name: "", place: "", aadhaar: "" });
  const [registered, setRegistered] = useState<Member | null>(null);

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(mobile)) {
      toast({ title: "त्रुटि", description: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें", variant: "destructive" });
      return;
    }
    // Demo: skip real OTP
    toast({ title: "OTP भेजा गया", description: "डेमो OTP: 1234" });
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setStep(3);
    } else {
      toast({ title: "त्रुटि", description: "गलत OTP, कृपया पुनः प्रयास करें", variant: "destructive" });
    }
  };

  const handleRegister = () => {
    if (!form.name.trim() || !form.place.trim()) {
      toast({ title: "त्रुटि", description: "कृपया सभी आवश्यक फ़ील्ड भरें", variant: "destructive" });
      return;
    }
    if (form.aadhaar && !/^\d{12}$/.test(form.aadhaar)) {
      toast({ title: "त्रुटि", description: "आधार नंबर 12 अंकों का होना चाहिए", variant: "destructive" });
      return;
    }
    const result = registerMember({ name: form.name, mobile, place: form.place, aadhaar: form.aadhaar || undefined });
    if (!result.success) {
      toast({ title: "त्रुटि", description: result.error, variant: "destructive" });
      return;
    }
    setRegistered(result.member!);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="gradient-saffron py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center">सदस्य पंजीकरण</h1>
        </div>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-md">
            {registered ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">पंजीकरण सफल!</h2>
                <p className="text-muted-foreground mb-6">आपका सदस्य आईडी:</p>
                <p className="text-2xl font-bold text-primary mb-6">{registered.membershipId}</p>
                <div className="flex justify-center mb-6">
                  <QRCodeSVG value={JSON.stringify({ id: registered.membershipId, name: registered.name, mobile: registered.mobile })} size={160} />
                </div>
                <div className="text-left space-y-2 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">नाम:</strong> {registered.name}</p>
                  <p><strong className="text-foreground">मोबाइल:</strong> {registered.mobile}</p>
                  <p><strong className="text-foreground">स्थान:</strong> {registered.place}</p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-8">
                {/* Step indicators */}
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "gradient-saffron text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {s}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <label className="block text-foreground font-semibold">मोबाइल नंबर</label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder="10 अंकों का मोबाइल नंबर"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-lg focus:ring-2 focus:ring-ring outline-none"
                    />
                    <button onClick={handleSendOtp} className="w-full py-3 rounded-lg font-semibold gradient-saffron text-primary-foreground shadow-saffron hover:opacity-90 transition-opacity text-lg">
                      OTP भेजें
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <label className="block text-foreground font-semibold">OTP दर्ज करें</label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="4 अंकों का OTP"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-lg text-center tracking-widest focus:ring-2 focus:ring-ring outline-none"
                    />
                    <button onClick={handleVerifyOtp} className="w-full py-3 rounded-lg font-semibold gradient-saffron text-primary-foreground shadow-saffron hover:opacity-90 transition-opacity text-lg">
                      सत्यापित करें
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-foreground font-semibold mb-1">नाम (पूरा नाम)</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
                    </div>
                    <div>
                      <label className="block text-foreground font-semibold mb-1">स्थान / जिला</label>
                      <input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
                    </div>
                    <div>
                      <label className="block text-foreground font-semibold mb-1">आधार नंबर (वैकल्पिक)</label>
                      <input value={form.aadhaar} onChange={(e) => setForm({ ...form, aadhaar: e.target.value.replace(/\D/g, "") })} maxLength={12} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="12 अंकों का आधार नंबर" />
                    </div>
                    <button onClick={handleRegister} className="w-full py-3 rounded-lg font-semibold gradient-saffron text-primary-foreground shadow-saffron hover:opacity-90 transition-opacity text-lg">
                      पंजीकरण करें
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
