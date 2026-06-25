import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fetchMoviesByCategory } from "../../services/movieApi";
import MovieCard from "./MovieCard.jsx";

export default function MovieRow({ category, sectionLabel, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchMoviesByCategory(category).then((data) => {
      // Filter out 18+ / Adult content if category is Romance or generally
      // OMDB doesn't have a direct "adult" flag but we can check titles or Type
      // For this project, we'll implement a safety filter
      const filtered = data.filter(movie => {
        const title = movie.Title.toLowerCase();

        // Comprehensive safety blocklist for interview decorum
        const blockedKeywords = [
          "adult", "porn", "xxx", "erotica", "sex",
          "lust", "nude", "naked", "desire", "passion",
          "cigarettes", "sin", "dirty", "wild"
        ];

        const isBlocked = blockedKeywords.some(key => title.includes(key));

        // Manual override for common "on-the-edge" titles found in Romance
        const manualBlocklist = ["True Romance", "Amour", "The Dreamers"];
        const isManualBlocked = manualBlocklist.some(t => movie.Title.includes(t));

        if (category === "Romance" && (isBlocked || isManualBlocked)) return false;

        return !isBlocked && !isManualBlocked;
      });


      setMovies(filtered);
      setLoading(false);
    });
  }, [category]);


  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) return (
    <div className="mb-12">
      <div className="h-6 w-48 bg-slate-100 rounded-lg mb-6 animate-pulse" />
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="min-w-[200px] aspect-[2/3] bg-slate-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mb-14 relative group">
      <h3 className="text-xl font-black text-slate-900 mb-6 px-1 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        {sectionLabel}
      </h3>

      <div className="relative px-1">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-40 w-12 h-12 rounded-full bg-white text-slate-900 border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50 hover:scale-110 shadow-xl"
        >
          <span className="text-xl font-bold">❮</span>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-40 w-12 h-12 rounded-full bg-white text-slate-900 border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50 hover:scale-110 shadow-xl"
        >
          <span className="text-xl font-bold">❯</span>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-10 scroll-smooth snap-x"
        >
          {movies.map((movie) => (
            <div key={movie.imdbID} className="snap-start py-2">
              <MovieCard movie={movie} onClick={() => onMovieClick(movie)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

