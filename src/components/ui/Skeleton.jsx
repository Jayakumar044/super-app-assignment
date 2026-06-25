import { motion } from "framer-motion";

export const SkeletonCard = ({ className = "" }) => (
  <div className={`glass rounded-2xl overflow-hidden shadow-card p-6 min-h-[200px] relative ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-2">
        <div className="w-20 h-3 bg-white/5 rounded-full animate-pulse" />
        <div className="w-32 h-4 bg-white/10 rounded-full animate-pulse" />
      </div>
      <div className="w-10 h-10 bg-white/5 rounded-xl animate-pulse" />
    </div>
    
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-white/10 rounded-full animate-pulse" />
      <div className="space-y-2">
        <div className="w-24 h-8 bg-white/15 rounded-lg animate-pulse" />
        <div className="w-16 h-4 bg-white/5 rounded-full animate-pulse" />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-14 bg-white/[0.04] rounded-xl border border-white/5 animate-pulse" />
      ))}
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <div 
        key={i} 
        className="h-4 bg-white/10 rounded-full animate-pulse"
        style={{ width: i === lines - 1 ? "60%" : "100%" }}
      />
    ))}
  </div>
);

export default function Skeleton({ className = "" }) {
  return <div className={`animate-pulse bg-white/10 rounded-lg ${className}`} />;
}
