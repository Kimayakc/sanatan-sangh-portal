import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllMembers, deleteMember, type Member } from "@/lib/members";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Users, UserPlus, Search, Trash2, Download } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn") !== "true") { navigate("/login"); return; }
    setMembers(getAllMembers());
  }, [navigate]);

  const refresh = () => setMembers(getAllMembers());

  const handleDelete = (id: string) => {
    deleteMember(id);
    refresh();
    toast({ title: "सदस्य हटाया गया" });
  };

  const handleExport = () => {
    const csv = "नाम,मोबाइल,स्थान,सदस्य आईडी,पंजीकरण तिथि\n" +
      members.map(m => `${m.name},${m.mobile},${m.place},${m.membershipId},${m.registrationDate}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "members.csv"; a.click();
  };

  const filtered = members.filter(m =>
    m.name.includes(search) || m.mobile.includes(search) || m.membershipId.includes(search) || m.place.includes(search)
  );

  const todayCount = members.filter(m => new Date(m.registrationDate).toDateString() === new Date().toDateString()).length;
  const monthCount = members.filter(m => {
    const d = new Date(m.registrationDate);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-foreground">एडमिन डैशबोर्ड</h1>
            <button onClick={() => { localStorage.removeItem("adminLoggedIn"); navigate("/"); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold">
              <LogOut className="w-4 h-4" /> लॉगआउट
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground">{members.length}</p>
              <p className="text-sm text-muted-foreground">कुल सदस्य</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <UserPlus className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground">{todayCount}</p>
              <p className="text-sm text-muted-foreground">आज के पंजीकरण</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <UserPlus className="w-8 h-8 text-gold mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground">{monthCount}</p>
              <p className="text-sm text-muted-foreground">इस महीने के पंजीकरण</p>
            </div>
          </div>

          {/* Search & Export */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="सदस्य खोजें..." className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none" />
            </div>
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-3 rounded-lg gradient-gold text-accent-foreground font-semibold hover:opacity-90">
              <Download className="w-4 h-4" /> CSV निर्यात
            </button>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left p-3 text-foreground font-semibold">सदस्य आईडी</th>
                  <th className="text-left p-3 text-foreground font-semibold">नाम</th>
                  <th className="text-left p-3 text-foreground font-semibold">मोबाइल</th>
                  <th className="text-left p-3 text-foreground font-semibold">स्थान</th>
                  <th className="text-left p-3 text-foreground font-semibold">तिथि</th>
                  <th className="text-left p-3 text-foreground font-semibold">कार्यवाही</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">कोई सदस्य नहीं मिला</td></tr>
                ) : filtered.map(m => (
                  <tr key={m.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3 text-foreground font-mono">{m.membershipId}</td>
                    <td className="p-3 text-foreground">{m.name}</td>
                    <td className="p-3 text-muted-foreground">{m.mobile}</td>
                    <td className="p-3 text-muted-foreground">{m.place}</td>
                    <td className="p-3 text-muted-foreground">{new Date(m.registrationDate).toLocaleDateString("hi-IN")}</td>
                    <td className="p-3">
                      <button onClick={() => handleDelete(m.id)} className="p-2 rounded-md text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
