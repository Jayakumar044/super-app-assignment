import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMovieDetails } from "../../services/movieApi";
import Button from "../ui/Button";

export default function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie) return;
    setLoading(true);
    fetchMovieDetails(movie.imdbID).then((data) => {
      setDetails(data);
      setLoading(false);
    });
  }, [movie]);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl glass-strong rounded-[2.5rem] overflow-hidden shadow-premium border border-white/10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full glass-light border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all font-bold text-white hover:rotate-90"
          >
            ×
          </button>

          <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto custom-scrollbar">
            {/* Left - Poster */}
            <div className="w-full md:w-2/5 aspect-[2/3] md:aspect-auto">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right - Info */}
            <div className="flex-1 p-8 md:p-12 bg-gradient-to-br from-bg/90 to-bg flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                    {details?.Genre?.split(",")[0] || "Featured"}
                  </span>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{details?.Runtime || "120 min"}</span>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="text-lg">⭐</span>
                    <span className="text-white font-black text-sm">{details?.imdbRating || "7.5"}</span>
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tighter">
                  {movie.Title}
                </h2>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-white/5 rounded animate-pulse" />
                </div>
              ) : (
                <div className="space-y-8 flex-1">
                  <div>
                    <p className="text-[10px] text-white font-black uppercase tracking-[0.2em] mb-3 opacity-40">The Synopsis</p>
                    <p className="text-white/70 text-base leading-relaxed italic">
                      "{details?.Plot}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] text-white font-black uppercase tracking-[0.2em] mb-2 opacity-40">Cast</p>
                      <p className="text-sm text-white/80 font-medium leading-relaxed">{details?.Actors}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white font-black uppercase tracking-[0.2em] mb-2 opacity-40">Director</p>
                      <p className="text-sm text-white/80 font-medium">{details?.Director}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 flex gap-4">
                <Button size="lg" className="flex-1 font-black gap-2 h-14">
                  <span>▶</span> Watch Trailer
                </Button>
                <Button variant="secondary" size="lg" className="flex-1 font-black gap-2 h-14 backdrop-blur-xl bg-white/5 border-white/10">
                  <span>+</span> List
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
