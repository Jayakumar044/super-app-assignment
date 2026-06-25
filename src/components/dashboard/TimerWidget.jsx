import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAppStore from "../../store/useAppStore";

export default function TimerWidget() {
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(timerRef.current);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progress = ((minutes * 60 - timeLeft) / (minutes * 60)) * 100;

  return (
    <div className="card-premium rounded-[2.5rem] p-8 h-full flex flex-col justify-between group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-primary shadow-sm border border-violet-100">
            ⏳
          </div>
          <div>
            <h3 className="text-slate-900 font-black text-sm tracking-tight leading-none">Focus Flow</h3>
            <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] mt-1">Deep Work Mode</p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-primary transition-colors">
          ⋯
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_20px_rgba(99,102,241,0.05)]">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-50"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="url(#timerGradient)"
              strokeWidth="8"
              strokeDasharray="502.65"
              initial={{ strokeDashoffset: 502.65 }}
              animate={{ strokeDashoffset: 502.65 * (1 - progress / 100) }}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
              {formatTime(timeLeft)}
            </h2>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isActive ? "bg-slate-900 text-white" : "bg-primary text-white shadow-primary/30"
                  }`}
              >
                {isActive ? "⏸" : "▶️"}
              </button>
              <button
                onClick={() => { setTimeLeft(minutes * 60); setIsActive(false); }}
                className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-100"
              >
                ↻
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {[10, 25, 60].map((m) => (
          <button
            key={m}
            onClick={() => { setMinutes(m); setTimeLeft(m * 60); setIsActive(false); }}
            className={`flex-1 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${minutes === m
                ? "bg-violet-50 text-primary border-violet-200 shadow-sm"
                : "border-slate-50 text-slate-400 hover:border-slate-200"
              }`}
          >
            {m}m
          </button>
        ))}
      </div>
    </div>
  );
}
