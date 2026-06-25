const Spinner = ({ size = "md", color = "#72DB73", className = "" }) => {
  const sizes = { xs: 16, sm: 20, md: 32, lg: 48 };
  const s = sizes[size] || 32;
  const r = (s / 2) - 3;
  const c = 2 * Math.PI * r;
  return (
    <svg width={s} height={s} className={`animate-spin ${className}`} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={color} strokeWidth="3"
        strokeLinecap="round" strokeDasharray={`${c * 0.25} ${c * 0.75}`} />
    </svg>
  );
};

export default Spinner;
