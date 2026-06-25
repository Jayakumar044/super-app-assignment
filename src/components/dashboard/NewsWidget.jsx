import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchNews } from "../../services/newsApi";
import { SkeletonCard } from "../ui/Skeleton.jsx";

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export default function NewsWidget() {
  const [articles, setArticles] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchNews("entertainment").then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (articles.length === 0 || paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % articles.length);
    }, 3000); // 3 seconds rotation
    return () => clearInterval(intervalRef.current);
  }, [articles, paused]);

  const article = articles[current];

  if (loading) return <SkeletonCard className="h-full" />;

  return (
    <div
      className="card-premium rounded-[2.5rem] overflow-hidden relative h-full flex flex-col group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Image with sophisticated overlay */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {article?.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80"; }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
        <div className="mb-4">
          <span className="bg-primary px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-primary/30 inline-block">
            {article?.source?.name || "Global News"}
          </span>
        </div>

        <h3 className="text-white font-black text-xl md:text-2xl leading-tight tracking-tight mb-3">
          {article?.title}
        </h3>

        <p className="text-slate-300 font-medium text-xs line-clamp-2 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
          {article?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px]">🗞</div>
            <span className="text-white/60 font-black text-[9px] uppercase tracking-widest">{article?.publishedAt ? timeAgo(article.publishedAt) : "Just now"}</span>
          </div>

          <div className="flex gap-1.5">
            {articles.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-primary" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
