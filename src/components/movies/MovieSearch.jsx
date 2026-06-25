import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchMovies } from "../../services/movieApi";

export default function MovieSearch({ onSelect }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            const data = await searchMovies(query);
            setResults(data);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Handle outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative w-full sm:w-80" ref={dropdownRef}>
            <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors">🔍</span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search movie titles..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner"
                />
            </div>

            <AnimatePresence>
                {isOpen && (query || loading) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 z-50 max-h-[400px] overflow-y-auto custom-scrollbar overflow-hidden"
                    >
                        {loading ? (
                            <div className="p-10 text-center">
                                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Searching Hub...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="p-3 space-y-1">
                                {results.map((movie) => (
                                    <button
                                        key={movie.imdbID}
                                        onClick={() => { onSelect(movie); setIsOpen(false); setQuery(""); }}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all text-left group"
                                    >
                                        <img
                                            src={movie.Poster}
                                            className="w-12 h-16 object-cover rounded-xl border border-slate-100 shadow-sm"
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/100x150"; }}
                                        />
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors">{movie.Title}</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">{movie.Year} · {movie.Type}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : query && (
                            <div className="p-10 text-center text-slate-300">
                                <p className="text-sm font-medium">No results found for "{query}"</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
