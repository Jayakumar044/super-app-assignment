import { useState } from "react";
import { motion } from "framer-motion";
import useAppStore from "../store/useAppStore";
import HeroBanner from "../components/movies/HeroBanner.jsx";
import MovieRow from "../components/movies/MovieRow.jsx";
import MovieModal from "../components/movies/MovieModal.jsx";
import MovieSearch from "../components/movies/MovieSearch.jsx";

const SECTION_LABELS = {
  Action: "🔥 Trending Action",
  Comedy: "😂 Feel-Good Picks",
  Drama: "🎭 Award-Winning Drama",
  Music: "🎵 Music & Rhythm",
  Sports: "⚽ Sports Classics",
  Thriller: "😱 Gripping Thrillers",
  Fantasy: "🔮 Epic Fantasy",
  Romance: "❤️ Love Stories",
};

export default function EntertainmentPage() {
  const categories = useAppStore((s) => s.selectedCategories);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-12">
      {/* Dynamic Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-primary/5 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-violet-600/5 rounded-full blur-[100px] opacity-10" />
      </div>

      {/* Hero Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-0.5 w-10 bg-primary/40 rounded-full" />
            <p className="text-primary text-[11px] font-black uppercase tracking-[0.4em]">Cinematic Hub</p>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter text-slate-900">
            Unlimited <span className="text-gradient">Experience</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-lg mt-8 font-medium max-w-xl leading-relaxed tracking-tight">
            Explore curated collections across {categories.length} major genres, tailored specifically for your premium entertainment taste.
          </p>
        </div>

        {/* Enhanced Search */}
        <div className="lg:mb-4">
          <MovieSearch onSelect={setSelectedMovie} />
        </div>
      </motion.div>

      {/* Hero Cinematic Slider */}
      <div className="mb-24">
        <HeroBanner />
      </div>

      {/* Section Divider with Label */}
      <div className="flex items-center gap-8 mb-16 px-2">
        <div className="flex-col">
          <h2 className="text-slate-900 font-black text-xs uppercase tracking-[0.4em] whitespace-nowrap">Your Curated Collection</h2>
          <div className="h-1 w-12 bg-primary mt-2 rounded-full" />
        </div>
        <div className="flex-1 h-px bg-slate-100" />
      </div>



      {/* Movie rows */}
      {categories.map((cat, i) => (
        <MovieRow
          key={cat}
          category={cat}
          sectionLabel={SECTION_LABELS[cat]}
          onMovieClick={setSelectedMovie}
        />
      ))}

      {/* Movie detail modal */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}
