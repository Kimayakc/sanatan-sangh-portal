import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMemberById } from "@/lib/members";
import { type Member } from "@/lib/members";
import { QrCode, User, CreditCard, Phone, MapPin, CheckCircle, XCircle } from "lucide-react";

const QrScan = () => {
  const [membershipId, setMembershipId] = useState("");
  const [result, setResult] = useState<Member | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleVerify = () => {
    const member = getMemberById(membershipId.trim());
    if (member) {
      setResult(member);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <QrCode className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground">सदस्य सत्यापन</h1>
            <p className="text-muted-foreground mt-2">सदस्य आईडी दर्ज करें या QR कोड स्कैन करें</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4 mb-6">
            <input
              value={membershipId}
              onChange={e => setMembershipId(e.target.value)}
              placeholder="SSS-2026-00001"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-center font-mono focus:ring-2 focus:ring-ring outline-none"
            />
            <button onClick={handleVerify} className="w-full py-3 rounded-lg font-semibold gradient-saffron text-primary-foreground shadow-saffron hover:opacity-90 transition-opacity text-lg">
              सत्यापित करें
            </button>
          </div>

          {result && (
            <div className="bg-card border-2 border-green-500 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4"><CheckCircle className="w-6 h-6 text-green-600" /><span className="text-green-700 font-bold text-lg">सत्यापित सदस्य</span></div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /><span className="text-foreground">{result.name}</span></div>
                <div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /><span className="text-foreground">{result.membershipId}</span></div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><span className="text-foreground">{result.mobile}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span className="text-foreground">{result.place}</span></div>
              </div>
            </div>
          )}

          {notFound && (
            <div className="bg-card border-2 border-destructive rounded-xl p-6 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-destructive" />
              <span className="text-destructive font-semibold">कोई सदस्य नहीं मिला</span>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QrScan;
