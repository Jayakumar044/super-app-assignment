import { motion } from "framer-motion";

const variants = {
  primary: "bg-slate-900 text-white font-bold hover:bg-primary active:bg-slate-800 shadow-lg shadow-slate-200",
  secondary: "bg-violet-50 text-primary border border-violet-100 hover:bg-violet-100",
  ghost: "border border-slate-200 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5",
  danger: "bg-red-50 text-red-500 border border-red-100 hover:bg-red-100",
  glass: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",
};


const sizes = {
  xs: "px-3 py-1.5 text-xs rounded-lg",
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-xl",
  xl: "px-10 py-4 text-lg rounded-2xl",
  icon: "w-9 h-9 rounded-xl flex items-center justify-center",
};

const Button = ({ children, onClick, disabled, variant = "primary", className = "", type = "button", size = "md", loading }) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    whileTap={disabled ? {} : { scale: 0.96 }}
    whileHover={disabled ? {} : { scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
    className={`
      ${variants[variant]} ${sizes[size]}
      transition-all duration-200 cursor-pointer select-none
      disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100
      font-medium inline-flex items-center justify-center gap-2
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
      ${className}
    `}
  >
    {loading ? (
      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    ) : children}
  </motion.button>
);

export default Button;
