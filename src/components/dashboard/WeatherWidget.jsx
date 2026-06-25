import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchWeather } from "../../services/weatherApi";
import { SkeletonCard } from "../ui/Skeleton.jsx";

const CONDITIONS = {
  Clear: { gradient: "from-amber-400 via-orange-500 to-amber-600", icon: "☀️", glow: "rgba(251,191,36,0.25)", label: "Sunny", mesh: "radial-gradient(at 100% 0%, #fde68a 0px, transparent 50%)" },
  Clouds: { gradient: "from-slate-400 via-gray-500 to-slate-600", icon: "☁️", glow: "rgba(148,163,184,0.2)", label: "Cloudy", mesh: "radial-gradient(at 100% 0%, #cbd5e1 0px, transparent 50%)" },
  Rain: { gradient: "from-blue-600 via-indigo-700 to-blue-800", icon: "🌧️", glow: "rgba(59,130,246,0.3)", label: "Rainy", mesh: "radial-gradient(at 100% 0%, #93c5fd 0px, transparent 50%)" },
  Drizzle: { gradient: "from-sky-400 via-blue-500 to-cyan-600", icon: "🌦️", glow: "rgba(56,189,248,0.25)", label: "Drizzle", mesh: "radial-gradient(at 100% 0%, #7dd3fc 0px, transparent 50%)" },
  Thunderstorm: { gradient: "from-violet-700 via-purple-900 to-slate-900", icon: "⛈️", glow: "rgba(124,58,237,0.3)", label: "Storm", mesh: "radial-gradient(at 100% 0%, #c084fc 0px, transparent 50%)" },
  Snow: { gradient: "from-blue-100 via-sky-200 to-blue-300", icon: "❄️", glow: "rgba(186,230,253,0.2)", label: "Snow", mesh: "radial-gradient(at 100% 0%, #ffffff 0px, transparent 50%)" },
  default: { gradient: "from-teal-500 via-cyan-600 to-teal-700", icon: "🌤️", glow: "rgba(45,212,191,0.25)", label: "Weather", mesh: "radial-gradient(at 100% 0%, #99f6e4 0px, transparent 50%)" },
};

const StatItem = ({ icon, label, value }) => (
  <div className="bg-white/[0.03] backdrop-blur-md rounded-[1.25rem] p-4 border border-white/5 hover:border-primary/20 transition-all group flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">{label}</p>
      <p className="text-sm font-black text-white leading-tight mt-1">{value}</p>
    </div>
  </div>
);

export default function WeatherWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("Lucknow"); // Lucknow for variety

  const load = async (c) => {
    setLoading(true);
    const result = await fetchWeather(c);
    setData(result);
    setLoading(false);
  };

  useEffect(() => { load(city); }, [city]);

  const style = data ? (CONDITIONS[data.condition] || CONDITIONS.default) : CONDITIONS.default;

  if (loading) return <SkeletonCard className="h-full" />;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data?.condition}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        className="card-premium rounded-[2rem] overflow-hidden relative h-full flex flex-col group/card"
      >
        {/* Dynamic Theme background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-10 group-hover/card:opacity-20 transition-opacity duration-700`}
          style={{ backgroundImage: style.mesh }}
        />

        {/* Top Glow Layer */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/[0.05] to-transparent" />

        <div className="relative z-10 p-8 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                📍
              </div>
              <div>
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-1">Current Skies</p>
                <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase">
                  {data?.city}
                </h3>
              </div>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); if (cityInput.trim()) { setCity(cityInput.trim()); setCityInput(""); } }}
              className="relative"
            >
              <input
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Find city..."
                className="bg-slate-50 rounded-full px-6 py-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none border border-slate-100 focus:border-primary/50 focus:w-48 w-32 transition-all duration-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 text-lg">🔍</span>
            </form>
          </div>

          <div className="flex items-center justify-between gap-8 mb-12 px-2">
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[120px] leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center filter brightness-110"
            >
              {style.icon}
            </motion.div>
            <div className="flex flex-col items-end">
              <div className="text-8xl font-black leading-none text-slate-900 tracking-tighter flex">
                {data?.temp}
                <span className="text-primary text-4xl mt-4">°</span>
              </div>
              <div className="flex flex-col items-end mt-4">
                <p className="text-slate-900 font-black text-lg uppercase tracking-wider">{style.label}</p>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">{data?.description}</p>
              </div>
            </div>
          </div>

          {/* New Horizontal Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-auto">
            <StatItem icon="💧" label="Humidity" value={`${data?.humidity}%`} />
            <StatItem icon="💨" label="Wind" value={`${data?.windSpeed}m/s`} />
            <StatItem icon="🌡️" label="Feels" value={`${data?.feelsLike}°`} />
            <StatItem icon="🌤️" label="Index" value="Low" />
          </div>

          {data?.mock && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-1 flex-1 bg-white/[0.03] rounded-full" />
              <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.3em] whitespace-nowrap">
                Demo Metadata
              </p>
              <div className="h-1 flex-1 bg-white/[0.03] rounded-full" />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}


