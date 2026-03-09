import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "संदेश भेजा गया", description: "हम जल्द ही आपसे संपर्क करेंगे।" });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="gradient-saffron py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center">संपर्क करें</h1>
        </div>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 max-w-4xl">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">हमसे जुड़ें</h2>
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div><p className="font-semibold text-foreground">ईमेल</p><p className="text-muted-foreground">info@sanatansss.org</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div><p className="font-semibold text-foreground">फ़ोन</p><p className="text-muted-foreground">+91 9876543210</p></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div><p className="font-semibold text-foreground">पता</p><p className="text-muted-foreground">मुख्य कार्यालय, भारत</p></div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-foreground font-semibold mb-1">नाम</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-1">ईमेल</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-1">संदेश</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none resize-none" />
              </div>
              <button type="submit" className="w-full py-3 rounded-lg font-semibold gradient-saffron text-primary-foreground shadow-saffron hover:opacity-90 transition-opacity text-lg">
                संदेश भेजें
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
