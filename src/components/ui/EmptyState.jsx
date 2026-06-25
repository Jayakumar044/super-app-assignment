import { motion } from "framer-motion";

export default function EmptyState({ icon, title, description, action }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 px-4 text-center"
        >
            <div className="w-16 h-16 rounded-3xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-3xl mb-4 shadow-inner">
                {icon || "📁"}
            </div>
            <h4 className="text-white font-bold text-base mb-1">{title || "No data found"}</h4>
            <p className="text-muted text-sm max-w-[200px] leading-relaxed mb-5">
                {description || "There's nothing to show here yet."}
            </p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="text-xs px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all font-semibold"
                >
                    {action.label}
                </button>
            )}
        </motion.div>
    );
}
