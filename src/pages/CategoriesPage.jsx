import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAppStore from "../store/useAppStore";
import Button from "../components/ui/Button.jsx";

// Import generated premium assets
import catAction from "../assets/cat_action.png";
import catComedy from "../assets/cat_comedy.png";
import catDrama from "../assets/cat_drama.png";
import catMusic from "../assets/cat_music.png";
import catSports from "../assets/cat_sports.png";
import catThriller from "../assets/cat_thriller.png";
import catFantasy from "../assets/cat_fantasy.png";
import catRomance from "../assets/cat_romance.png";

const CATEGORIES = [
  { id: "Action", image: catAction, icon: "⚡", desc: "High-octane thrills", color: "from-orange-500/25 to-red-600/10", border: "hover:border-orange-500/50", glow: "rgba(249,115,22,0.2)" },
  { id: "Comedy", image: catComedy, icon: "😂", desc: "Laugh out loud", color: "from-yellow-400/25 to-orange-400/10", border: "hover:border-yellow-400/50", glow: "rgba(250,204,21,0.2)" },
  { id: "Drama", image: catDrama, icon: "🎭", desc: "Stories that move", color: "from-blue-500/25 to-indigo-600/10", border: "hover:border-blue-500/50", glow: "rgba(59,130,246,0.2)" },
  { id: "Music", image: catMusic, icon: "🎵", desc: "Feel every beat", color: "from-pink-500/25 to-rose-600/10", border: "hover:border-pink-500/50", glow: "rgba(236,72,153,0.2)" },
  { id: "Sports", image: catSports, icon: "⚽", desc: "Feel the rush", color: "from-emerald-500/25 to-green-600/10", border: "hover:border-emerald-500/50", glow: "rgba(16,185,129,0.2)" },
  { id: "Thriller", image: catThriller, icon: "🕵️", desc: "Edge of your seat", color: "from-slate-400/25 to-gray-600/10", border: "hover:border-slate-400/50", glow: "rgba(148,163,184,0.2)" },
  { id: "Fantasy", image: catFantasy, icon: "🔮", desc: "Beyond imagination", color: "from-violet-500/25 to-purple-700/10", border: "hover:border-violet-500/50", glow: "rgba(139,92,246,0.2)" },
  { id: "Romance", image: catRomance, icon: "❤️", desc: "Modern classics", color: "from-rose-500/25 to-pink-600/10", border: "hover:border-rose-500/50", glow: "rgba(244,63,94,0.2)" },
];



export default function CategoriesPage() {
  const navigate = useNavigate();
  const { selectedCategories, toggleCategory } = useAppStore();
  const remaining = Math.max(0, 3 - selectedCategories.length);
  const canContinue = selectedCategories.length >= 3;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full bg-violet-100/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 max-w-xl relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-8 border border-slate-100">
          Step 02 — Preferences
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tighter text-slate-900 leading-none">
          Choose your <br />
          <span className="text-primary">Curated Tracks.</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
          {remaining > 0
            ? `Select at least ${remaining} more categor${remaining === 1 ? "y" : "ies"} to continue.`
            : "Your profile is primed. Ready to discover?"}
        </p>
      </motion.div>


      {/* Selected chips */}
      <AnimatePresence>
        {selectedCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2 flex-wrap justify-center mb-6 relative z-10"
          >
            {selectedCategories.map((c) => {
              const cat = CATEGORIES.find((x) => x.id === c);
              return (
                <motion.button
                  key={c}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => toggleCategory(c)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-sm border border-primary/30 font-medium hover:bg-red-500/15 hover:text-red-400 hover:border-red-400/30 transition-all duration-200 group"
                >
                  <span>{cat?.icon}</span>
                  {c}
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">×</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full mb-10 relative z-10">
        {CATEGORIES.map((cat, i) => {
          const selected = selectedCategories.includes(cat.id);
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => toggleCategory(cat.id)}
              className={`
                relative group cursor-pointer p-6 rounded-[2.5rem] border-2 transition-all duration-500 h-full
                ${selected
                  ? "bg-white border-primary shadow-2xl shadow-primary/10 -translate-y-2"
                  : "bg-white border-slate-100 hover:border-slate-200 shadow-xl shadow-slate-200/20"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Visual Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner relative overflow-hidden bg-gradient-to-br ${cat.color}`}>
                  {cat.image ? (
                    <img src={cat.image} alt={cat.id} className="w-full h-full object-cover" />
                  ) : (
                    <span className="relative z-10">{cat.icon}</span>
                  )}
                </div>
                <div>
                  <h3 className={`font-black text-lg leading-tight transition-colors ${selected ? "text-primary" : "text-slate-900"}`}>
                    {cat.id}
                  </h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{cat.desc}</p>
                </div>
              </div>
            </motion.div>

          );
        })}
      </div>

      {/* Progress + CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-4 relative z-10"
      >
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-muted text-sm">{selectedCategories.length}/8</span>
          <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              animate={{ width: `${(selectedCategories.length / 8) * 100}%` }}
              transition={{ type: "spring", stiffness: 120 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </div>

        <Button
          disabled={!canContinue}
          onClick={() => navigate("/dashboard")}
          size="lg"
          className={`px-12 ${canContinue ? "glow-sm" : ""}`}
        >
          {canContinue ? "Launch Dashboard →" : `Select ${remaining} more`}
        </Button>
      </motion.div>
    </div>
  );
}
