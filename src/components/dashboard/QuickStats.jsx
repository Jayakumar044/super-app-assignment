import { motion } from "framer-motion";
import useAppStore from "../../store/useAppStore";

export default function QuickStats() {
    const user = useAppStore((s) => s.user);
    const categories = useAppStore((s) => s.selectedCategories);

    const stats = [
        { label: "Active Interests", value: categories.length, icon: "🎯", color: "from-primary to-emerald-500", glow: "rgba(114,219,115,0.2)" },
        { label: "Movies Found", value: categories.length * 12, icon: "🎬", color: "from-blue-400 to-indigo-500", glow: "rgba(96,165,250,0.2)" },
        { label: "Notes Saved", value: 3, icon: "📝", color: "from-amber-400 to-orange-500", glow: "rgba(251,191,36,0.2)" },
        { label: "Profile Health", value: "100%", icon: "⚡", color: "from-purple-400 to-pink-500", glow: "rgba(192,132,252,0.2)" },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="card-premium rounded-[2rem] p-6 border border-slate-100 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col items-center text-center shadow-sm"
                >
                    <div
                        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundImage: `linear-gradient(to right, ${stat.glow}, transparent)` }}
                    />

                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform mb-4 border border-slate-100">
                        {stat.icon}
                    </div>

                    <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                        <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-none tracking-tighter`}>
                            {stat.value}
                        </div>
                    </div>

                    <div className="mt-4 w-10 h-0.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ delay: 1 + (i * 0.2), duration: 1 }}
                            className={`h-full w-full bg-gradient-to-r ${stat.color}`}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );


}

