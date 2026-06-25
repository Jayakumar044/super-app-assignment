import { motion } from "framer-motion";

const Chip = ({ label, onRemove, color = "green" }) => (
  <motion.span
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25 transition-all"
  >
    {label}
    {onRemove && (
      <button
        onClick={onRemove}
        className="ml-0.5 hover:text-white transition-colors w-3.5 h-3.5 flex items-center justify-center"
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    )}
  </motion.span>
);

export default Chip;
