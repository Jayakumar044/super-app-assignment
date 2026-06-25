import { motion } from "framer-motion";

export default function MovieCard({ movie, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative w-[190px] sm:w-[240px] aspect-[2/3] rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-slate-100 bg-white"
    >
      {/* Cinematic Poster */}
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
        onError={(e) => { e.target.src = `https://picsum.photos/seed/${movie.imdbID}/400/600`; }}
      />

      {/* Dynamic Overlays - Bottom dark for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Labeling */}
      <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
          <h4 className="text-white font-black text-xs leading-tight mb-2 uppercase tracking-tighter line-clamp-1">
            {movie.Title}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-primary font-black uppercase tracking-widest">{movie.Year}</span>
            <span className="text-[8px] px-2 py-1 rounded-lg bg-white/10 text-white/60 font-black uppercase tracking-widest border border-white/10">
              4K HDR
            </span>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      {parseInt(movie.Year) >= 2023 && (
        <div className="absolute top-4 left-4 h-6 px-3 flex items-center justify-center bg-primary text-white font-black rounded-lg text-[8px] uppercase tracking-widest shadow-lg shadow-primary/25">
          Premiere
        </div>
      )}
    </motion.div>


  );
}
