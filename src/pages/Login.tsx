import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMemberByMobile } from "@/lib/members";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const handleMemberLogin = () => {
    if (!otpSent) {
      if (!/^\d{10}$/.test(mobile)) {
        toast({ title: "त्रुटि", description: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें", variant: "destructive" });
        return;
      }
      toast({ title: "OTP भेजा गया", description: "डेमो OTP: 1234" });
      setOtpSent(true);
      return;
    }
    if (otp !== "1234") {
      toast({ title: "त्रुटि", description: "गलत OTP", variant: "destructive" });
      return;
    }
    const member = getMemberByMobile(mobile);
    if (!member) {
      toast({ title: "त्रुटि", description: "इस नंबर से कोई सदस्य पंजीकृत नहीं है", variant: "destructive" });
      return;
    }
    localStorage.setItem("currentMember", JSON.stringify(member));
    navigate("/dashboard");
  };

  const handleAdminLogin = () => {
    if (adminEmail === "admin@sss.org" && adminPass === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      toast({ title: "त्रुटि", description: "गलत ईमेल या पासवर्ड", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-16">
        <div className="container mx-auto px-4 max-w-md">
          <Tabs defaultValue="member" className="bg-card border border-border rounded-xl p-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="member">सदस्य लॉगिन</TabsTrigger>
              <TabsTrigger value="admin">एडमिन लॉगिन</TabsTrigger>
            </TabsList>

            <TabsContent value="member" className="space-y-4">
              <div>
                <label className="block text-foreground font-semibold mb-1">मोबाइल नंबर</label>
                <input type="tel" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-lg focus:ring-2 focus:ring-ring outline-none" />
              </div>
              {otpSent && (
                <div>
                  <label className="block text-foreground font-semibold mb-1">OTP</label>
                  <input type="text" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-lg text-center tracking-widest focus:ring-2 focus:ring-ring outline-none" />
                </div>
              )}
              <button onClick={handleMemberLogin} className="w-full py-3 rounded-lg font-semibold gradient-saffron text-primary-foreground shadow-saffron hover:opacity-90 transition-opacity text-lg">
                {otpSent ? "लॉगिन करें" : "OTP भेजें"}
              </button>
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground mb-3">या QR कोड स्कैन करके लॉगिन करें</p>
                <div className="flex justify-center">
                  <div className="p-4 bg-secondary rounded-lg">
                    <QRCodeSVG value={`sss-login:${Date.now()}`} size={140} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">यह QR कोड 5 मिनट में समाप्त हो जाएगा</p>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <div>
                <label className="block text-foreground font-semibold mb-1">ईमेल</label>
                <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" placeholder="admin@sss.org" />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-1">पासवर्ड</label>
                <input type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
              </div>
              <button onClick={handleAdminLogin} className="w-full py-3 rounded-lg font-semibold gradient-saffron text-primary-foreground shadow-saffron hover:opacity-90 transition-opacity text-lg">
                एडमिन लॉगिन
              </button>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
