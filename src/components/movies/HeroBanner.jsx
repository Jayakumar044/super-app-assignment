import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

// Import locally if possible or use relative paths. 
// Since we copied them to src/assets/banners, we can use those.
import actionBanner from "../../assets/banners/action.png";
import comedyBanner from "../../assets/banners/comedy.png";
import thrillerBanner from "../../assets/banners/thriller.png";
import fantasyBanner from "../../assets/banners/fantasy.png";
import sportsBanner from "../../assets/banners/sports.png";

const HERO_SLIDES = [
    {
        id: 1,
        title: "The Silent Protagonist",
        category: "Action",
        desc: "A retired elite assassin is forced back into the underworld when his past catches up. This summer, vengeance has a new name.",
        image: actionBanner,
        color: "rgba(114,219,115,0.4)",
    },
    {
        id: 2,
        title: "Neon Shadows",
        category: "Thriller",
        desc: "In a city that never sleeps, a detective uncovers a conspiracy that goes all the way to the top. Every shadow hides a secret.",
        image: thrillerBanner,
        color: "rgba(59,130,246,0.4)",
    },
    {
        id: 3,
        title: "The Sky Kingdom",
        category: "Fantasy",
        desc: "High above the clouds, a young warrior must unite the floating islands to defeat an ancient evil. Magic is their only hope.",
        image: fantasyBanner,
        color: "rgba(168,85,247,0.4)",
    },
    {
        id: 4,
        title: "The Underdog",
        category: "Sports",
        desc: "Against all odds, a small-town team qualifies for the national championships. A story of grit, passion, and the spirit of the game.",
        image: sportsBanner,
        color: "rgba(251,191,36,0.4)",
    },
    {
        id: 5,
        title: "Comedy Nights",
        category: "Comedy",
        desc: "When four strangers get stuck in an elevator, their life stories converge in the most hilariously unexpected way possible.",
        image: comedyBanner,
        color: "rgba(236,72,153,0.4)",
    },
];

export default function HeroBanner() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((p) => (p + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const slide = HERO_SLIDES[index];

    return (
        <div className="relative h-[560px] mb-16 rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10 mx-2">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Main Image with Zoom Animation */}
                    <motion.img
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 8, ease: "linear" }}
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover grayscale-[30%] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                    />

                    {/* Rich Overlays - Light Mode Cinematic */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000" style={{ background: `radial-gradient(circle at 20% 50%, ${slide.color}, transparent 70%)` }} />

                    {/* Content Section */}
                    <div className="absolute inset-0 flex flex-col justify-center px-12 sm:px-20 md:px-24">
                        <motion.div
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    className="w-12 h-1 bg-primary rounded-full origin-left"
                                />
                                <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">{slide.category}</span>
                                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest hidden sm:block">· Prime Selection</span>
                            </div>

                            <h2 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter max-w-3xl">
                                {slide.title.split(" ").map((word, i) => (
                                    <span key={i} className={i % 2 !== 0 ? "text-primary block sm:inline" : "block sm:inline"}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </h2>

                            <p className="max-w-xl text-slate-300 text-base md:text-xl leading-relaxed mb-10 font-medium tracking-tight opacity-80">
                                {slide.desc}
                            </p>

                            <div className="flex flex-wrap gap-5">
                                <button className="h-16 px-12 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-sm hover:scale-105 hover:-translate-y-1 transition-all shadow-2xl shadow-black/20 flex items-center gap-3">
                                    <span className="text-xl">▶</span> Watch Now
                                </button>
                                <button className="h-16 px-10 rounded-2xl bg-white/10 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-white/20 transition-all flex items-center gap-3 backdrop-blur-xl">
                                    <span className="text-xl">⊕</span> Playlist
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Premium Pagination dots */}
            <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
                <div className="flex gap-2.5">
                    {HERO_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`group relative h-1 rounded-full transition-all duration-700 ${i === index ? "w-12 bg-primary" : "w-4 bg-white/10 hover:bg-white/20"
                                }`}
                        >
                            {i === index && (
                                <motion.div
                                    layoutId="dot-indicator"
                                    className="absolute -inset-2 rounded-full border border-primary/40"
                                />
                            )}
                        </button>
                    ))}
                </div>
                <div className="w-px h-6 bg-white/10 mx-2" />
                <div className="text-white/20 font-black text-[10px] tracking-[0.3em] uppercase">
                    0{index + 1} / 0{HERO_SLIDES.length}
                </div>
            </div>
        </div>

    );
}
