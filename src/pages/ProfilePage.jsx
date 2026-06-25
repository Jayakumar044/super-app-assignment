import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import Chip from "../components/ui/Chip";
import Button from "../components/ui/Button";

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const cats = useAppStore((s) => s.selectedCategories);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const notes = (() => {
    try {
      return JSON.parse(localStorage.getItem("super-app-notes-v2")) || [];
    } catch {
      return [];
    }
  })();

  const stats = [
    { label: "Categories", value: cats.length, icon: "🏷" },
    { label: "Notes", value: notes.length, icon: "📝" },
    { label: "Movies Ready", value: cats.length * 5 + "+", icon: "🎬" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-violet-100/40 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Avatar + name */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-5xl shadow-2xl shadow-primary/20">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white border-4 border-slate-50 flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{user.name}</h2>
          <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mt-4">Verified Professional</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="card-premium rounded-3xl p-8 text-center border border-slate-100 flex flex-col items-center group hover:border-primary/20 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
              <div className="text-3xl font-black text-slate-900 mb-1">{s.value}</div>
              <div className="text-slate-400 font-black uppercase tracking-widest text-[9px]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Account details */}
          <div className="card-premium rounded-[2.5rem] p-8 border border-slate-100">
            <h3 className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-slate-200" />
              Security Profile
            </h3>
            <div className="space-y-4">
              {[
                { icon: "✉️", label: "Identity Email", value: user.email },
                { icon: "📱", label: "Mobile Contact", value: user.mobile },
                { icon: "👤", label: "Hub Username", value: `@${user.username}` },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">{r.icon}</div>
                  <div>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">{r.label}</p>
                    <p className="text-sm font-black text-slate-900">{r.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="card-premium rounded-[2.5rem] p-8 border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-6 h-px bg-slate-200" />
                Interest Cloud
              </h3>
              <button
                onClick={() => navigate("/categories")}
                className="text-[10px] text-primary font-black uppercase tracking-widest hover:opacity-70 transition-colors"
              >
                Adjust
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {cats.map((c) => (
                <span
                  key={c}
                  className="px-5 py-3 rounded-2xl bg-violet-50 text-primary border border-violet-100 text-xs font-black uppercase tracking-tight hover:bg-primary hover:text-white transition-all cursor-default"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Final Actions */}
        <div className="flex flex-col sm:flex-row gap-5">
          <Button
            onClick={() => navigate("/dashboard")}
            className="flex-1 h-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-200"
          >
            Return to Command Center
          </Button>
          <Button onClick={handleLogout} className="h-16 px-10 bg-white text-red-500 border border-slate-100 rounded-2xl font-black uppercase tracking-widest hover:bg-red-50 hover:border-red-100 shadow-sm">
            Sign Out
          </Button>
        </div>
      </motion.div>
    </div>

  );
}
