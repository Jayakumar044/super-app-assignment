import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../store/useAppStore";
import Chip from "../ui/Chip.jsx";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

export default function ProfileWidget() {
  const user = useAppStore((s) => s.user);
  const cats = useAppStore((s) => s.selectedCategories);
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="card-premium rounded-[2.5rem] p-8 relative overflow-hidden h-full flex flex-col group/profile">
      {/* Background Accent Layer */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-24 translate-x-12 blur-[100px] pointer-events-none group-hover/profile:bg-primary/10 transition-all duration-1000" />

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-6 mb-8 relative z-10 p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-primary/25 group-hover/profile:scale-105 transition-all duration-700">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-white border-2 border-slate-50 flex items-center justify-center shadow-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-black text-2xl text-slate-900 tracking-tight leading-none">{user.name}</h3>
          <p className="text-primary font-black uppercase tracking-[0.3em] text-[8px] mt-3">
            Premium Member
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {[
          { label: "Email Address", value: user.email, icon: "✉️" },
          { label: "Mobile Contact", value: user.mobile, icon: "📱" },
        ].map((row) => (
          <div key={row.label} className="group/row flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-sm group-hover/row:scale-110 transition-transform">
              {row.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-0.5">{row.label}</p>
              <p className="text-xs font-black text-slate-900 truncate">{row.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Interest Profile</p>
          <button
            onClick={() => navigate("/categories")}
            className="text-[10px] text-primary font-black uppercase tracking-widest hover:opacity-70 transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <span
              key={c}
              className="px-4 py-2 rounded-xl bg-violet-50 border border-violet-100 text-[10px] font-black text-primary uppercase tracking-tight"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


