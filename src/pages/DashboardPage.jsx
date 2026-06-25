import { motion } from "framer-motion";
import ProfileWidget from "../components/dashboard/ProfileWidget.jsx";
import WeatherWidget from "../components/dashboard/WeatherWidget.jsx";
import NewsWidget from "../components/dashboard/NewsWidget.jsx";
import TimerWidget from "../components/dashboard/TimerWidget.jsx";
import NotesWidget from "../components/dashboard/NotesWidget.jsx";
import QuickStats from "../components/dashboard/QuickStats.jsx";
import useAppStore from "../store/useAppStore";
import { useNavigate } from "react-router-dom";
import { getGreeting } from "../hooks/useGreeting";
import Button from "../components/ui/Button";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.5 } },
};

export default function DashboardPage() {
  const user = useAppStore((s) => s.user);
  const navigate = useNavigate();
  const greeting = getGreeting(user?.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] left-1/4 w-[40rem] h-[40rem] bg-violet-100/30 rounded-full blur-[120px] opacity-20" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-[100px] opacity-10" />
      </div>

      {/* Greeting Section */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-primary/30" />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-none tracking-tight text-slate-900">
            <span className="text-gradient block mb-2">{greeting.split(",")[0]},</span>
            <span>{greeting.split(",")[1]}</span>
            <span className="text-primary ml-1">.</span>
          </h1>
          <p className="mt-6 text-slate-400 font-medium text-sm sm:text-base max-w-lg leading-relaxed">
            Welcome back to your command center. Everything is synchronized and ready for your next move.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/entertainment")}
            className="px-10 h-16 text-sm font-black uppercase tracking-widest bg-slate-900 text-white rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-200"
          >
            Launch Discover
          </Button>
        </div>
      </motion.div>



      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6"
      >
        <QuickStats />
      </motion.div>

      {/* Main grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        <motion.div variants={item}>
          <ProfileWidget />
        </motion.div>
        <motion.div variants={item}>
          <WeatherWidget />
        </motion.div>
        <motion.div variants={item} className="md:col-span-2 xl:col-span-1">
          <NewsWidget />
        </motion.div>
        <motion.div variants={item}>
          <TimerWidget />
        </motion.div>
        <motion.div variants={item} className="md:col-span-1 xl:col-span-2">
          <NotesWidget />
        </motion.div>
      </motion.div>
    </div>
  );
}
