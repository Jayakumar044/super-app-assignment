import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import Button from "../components/ui/Button.jsx";
import FloatingInput from "../components/ui/FloatingInput.jsx";
import logoSrc from "../assets/logo.png";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    shareInfo: false
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const setUser = useAppStore((s) => s.setUser);

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.username.trim()) errs.username = "Username is required";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Invalid email format";
    if (!data.mobile.match(/^\d{10}$/)) errs.mobile = "Mobile must be 10 digits";
    if (data.password.length < 6) errs.password = "Password must be min 6 chars";
    if (data.password !== data.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!data.shareInfo) errs.shareInfo = "Please accept terms";
    return errs;
  };

  useEffect(() => {
    const errs = validate(formData);
    setErrors(errs);
    setIsValid(Object.keys(errs).length === 0);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setUser({ ...formData, isLoggedIn: false }); // Registered but not logged in yet
      navigate("/login");
    }
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 overflow-hidden">
      {/* Left Decoration - Hero Section */}
      <div className="hidden lg:flex w-1/2 relative bg-white overflow-hidden items-center justify-center p-12 border-r border-slate-100">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-50/50 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center p-4 mb-10 border border-primary/20 shadow-xl shadow-primary/10 group-hover:scale-105 transition-transform duration-500">
              <img src={logoSrc} alt="Skyway" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
              Discover the <br />
              <span className="text-primary">Super Experience.</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed font-medium">
              Join a curated ecosystem where entertainment, productivity, and intelligence converge. Your journey starts here.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: "🎬", label: "Entertainment" },
              { icon: "🌡️", label: "Weather" },
              { icon: "📝", label: "Quick Notes" },
              { icon: "⏱️", label: "Smart Timer" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-4 group hover:border-primary/30 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form - Registration */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto pt-24 lg:pt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md my-8"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-5xl font-black mb-4 tracking-tighter text-slate-900">Sign Up</h2>
            <p className="text-slate-400 font-medium">Create your premium account in seconds.</p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name && formData.name.length > 0 ? errors.name : ""}
            />
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                error={errors.username && formData.username.length > 0 ? errors.username : ""}
              />
              <FloatingInput
                label="Mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                error={errors.mobile && formData.mobile.length > 0 ? errors.mobile : ""}
              />
            </div>
            <FloatingInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email && formData.email.length > 0 ? errors.email : ""}
            />

            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="relative">
                <FloatingInput
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={errors.password && formData.password.length > 0 ? errors.password : ""}
                />
              </div>
              <div className="relative">
                <FloatingInput
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <AnimatePresence>
                  {formData.confirmPassword.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none"
                    >
                      {formData.password === formData.confirmPassword ? (
                        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">Match ✓</span>
                      ) : (
                        <span className="text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-50 px-2 py-1 rounded-lg">No Match</span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                {errors.confirmPassword && formData.confirmPassword.length > 0 && (
                  <p className="text-red-500 text-[10px] mt-1 ml-4 font-bold">{errors.confirmPassword}</p>
                )}
              </div>
            </div>


            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={formData.shareInfo}
                    onChange={(e) => setFormData({ ...formData, shareInfo: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${formData.shareInfo ? "bg-primary border-primary" : "bg-white/5 border-white/10 group-hover:border-primary/50"}`}>
                    {formData.shareInfo && <span className="text-bg text-xs font-black">✓</span>}
                  </div>
                </div>
                <span className="text-muted text-xs leading-relaxed select-none">
                  Share my registration data with Superapp and agree to the
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">Terms of Service</a> &
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">Privacy Policy</a>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              className="w-full py-4 text-base font-bold shadow-xl shadow-primary/10 mt-4 h-14"
            >
              Sign Up Now
            </Button>
          </form>

          <p className="mt-8 text-center text-muted text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
