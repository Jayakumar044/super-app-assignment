import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import useAppStore from "../store/useAppStore";
import logo from "../assets/logo.png";

const ProfileDropdown = ({ user, onNavigate, onLogout, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 top-full mt-4 w-64 bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-4 z-50 overflow-hidden"
    >
      <div className="flex items-center gap-4 p-2 mb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20">
          {user.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h4 className="text-slate-900 font-black text-sm leading-none">{user.name}</h4>
          <p className="text-slate-400 text-[10px] mt-1">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-1 mb-3">
        <button
          onClick={() => { onNavigate("/profile"); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-bold text-left"
        >
          <span className="text-base">👤</span> My Profile
        </button>
        <button
          onClick={() => { onNavigate("/categories"); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-bold text-left"
        >
          <span className="text-base">🎯</span> Edit Interests
        </button>
        <button
          onClick={() => { onNavigate("/dashboard"); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-bold text-left"
        >
          <span className="text-base">⊞</span> Dashboard
        </button>
      </div>

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-colors border border-red-100"
      >
        Sign Out <span className="text-base">→</span>
      </button>
    </motion.div>
  );
};

function FloatingHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isDiscover = location.pathname === "/entertainment";

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 md:h-24 flex items-center justify-center px-4 sm:px-10 pointer-events-none">
      <div className="w-full max-w-[1500px] h-16 md:h-20 rounded-2xl md:rounded-[2rem] bg-white/90 backdrop-blur-xl border border-slate-200/60 flex items-center justify-between px-4 md:px-8 pointer-events-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group">

        {/* Left: Branding */}
        <div
          className="flex items-center gap-3 md:gap-4 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="relative group/logo">
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity" />
            <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10" />
          </div>
          <div>
            <h1 className="text-slate-900 font-black text-lg md:text-xl leading-none tracking-tight">SuperApp</h1>
            <p className="text-primary font-black uppercase tracking-[0.3em] text-[7px] md:text-[8px] mt-1 opacity-60">Next-Gen Skyway</p>
          </div>
        </div>

        {/* Center: Main Nav (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-50 border border-slate-100">
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-8 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${!isDiscover
              ? "bg-white text-slate-900 shadow-md border border-slate-100"
              : "text-slate-400 hover:text-slate-900 hover:bg-white"
              }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/entertainment")}
            className={`px-8 py-2.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isDiscover
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "text-slate-400 hover:text-slate-900 hover:bg-white"
              }`}
          >
            Discover
          </button>
        </nav>

        {/* Right: User Identity */}
        <div className="flex items-center gap-2 md:gap-6">
          {user && user.isLoggedIn ? (
            <>
              <div className="hidden lg:flex flex-col items-end text-right">
                <h4 className="text-slate-900 font-black text-xs leading-none tracking-tight">{user.name}</h4>
                <p className="text-primary font-black text-[9px] uppercase tracking-widest mt-1">@{user.username}</p>
              </div>
              <div className="w-[1px] h-8 bg-slate-100 hidden lg:block" />

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="group flex items-center gap-2 p-1 pl-2 md:pl-3 rounded-full bg-slate-50 border border-slate-100 hover:border-primary/40 transition-all shadow-inner"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-white flex items-center justify-center text-slate-900 font-black text-xs shadow-sm">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-slate-400 group-hover:text-primary transition-colors pr-1 font-bold text-xs">⌄</span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      <ProfileDropdown user={user} onNavigate={navigate} onLogout={handleLogout} onClose={() => setDropdownOpen(false)} />
                    </>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Join the Hub
            </button>
          )}
        </div>

      </div>
    </header>
  );
}

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { path: "/dashboard", label: "Home", icon: "⊞" },
    { path: "/entertainment", label: "Movies", icon: "🎬" },
    { path: "/categories", label: "Genre", icon: "🎯" },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50 h-16 bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl flex items-center justify-around px-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className="flex flex-col items-center justify-center relative w-12 h-12 transition-all"
        >
          <span className={`text-xl transition-all duration-300 ${active === item.path ? "text-primary scale-110 -translate-y-1" : "text-slate-400 opacity-60"}`}>
            {item.icon}
          </span>
          {active === item.path && (
            <motion.div
              layoutId="bottom-nav-indicator"
              className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"
            />
          )}
          <span className={`text-[8px] font-black uppercase tracking-widest mt-1 transition-opacity ${active === item.path ? "text-primary opacity-100" : "opacity-0"}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default function Layout({ children }) {
  const user = useAppStore((s) => s.user);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {user && (
        <>
          <FloatingHeader />
          <MobileBottomNav />
        </>
      )}
      <main className={`relative z-10 transition-all ${user ? "pt-24 pb-24 md:pb-12" : ""}`}>
        {children}
      </main>

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-slate-50">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-1/2 bg-gradient-to-br from-violet-50 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-1/2 bg-gradient-to-tl from-indigo-50 to-transparent opacity-60" />
      </div>
    </div>
  );
}
