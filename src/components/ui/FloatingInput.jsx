import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingInput = ({ label, name, type = "text", value, onChange, error, autoComplete, rightIcon }) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value?.length > 0;

  return (
    <div className="relative">
      <div className={`
        relative rounded-2xl border-2 transition-all duration-200
        ${focused
          ? "border-primary bg-white shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
          : "border-slate-200 bg-white hover:border-slate-300"
        }
        ${error ? "border-red-400 bg-white shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : ""}
      `}>

        <motion.label
          animate={{ y: isActive ? -10 : 0, scale: isActive ? 0.75 : 1, x: isActive ? -4 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`
            absolute left-4 top-4 origin-left pointer-events-none font-bold z-10 text-sm tracking-tight
            ${focused && !error ? "text-primary" : error ? "text-red-500" : "text-slate-400"}
            transition-colors duration-200
          `}
        >
          {label}
        </motion.label>
        <input
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pt-7 pb-3 px-4 text-slate-900 text-sm outline-none pr-10 font-medium"
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1"
          >
            <span>⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingInput;
