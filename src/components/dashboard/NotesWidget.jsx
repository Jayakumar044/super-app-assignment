import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAX = 200;

export default function NotesWidget() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("super_app_notes_v2");
    return saved ? JSON.parse(saved) : [];
  });
  const [draft, setDraft] = useState("");
  const [editId, setEditId] = useState(null);
  const [saveStatus, setSaveStatus] = useState("ready");

  useEffect(() => {
    localStorage.setItem("super_app_notes_v2", JSON.stringify(notes));
  }, [notes]);

  const save = () => {
    if (!draft.trim()) return;
    setSaveStatus("saving");

    setTimeout(() => {
      if (editId) {
        setNotes(notes.map(n => n.id === editId ? { ...n, text: draft, updatedAt: new Date().toISOString() } : n));
        setEditId(null);
      } else {
        setNotes([{ id: Date.now(), text: draft, updatedAt: new Date().toISOString() }, ...notes]);
      }
      setDraft("");
      setSaveStatus("ready");
    }, 600);
  };

  const del = (id) => setNotes(notes.filter(n => n.id !== id));

  const startEdit = (note) => {
    setDraft(note.text);
    setEditId(note.id);
  };

  const pct = Math.min(100, (draft.length / MAX) * 100);

  const relativeTime = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    return "Earlier";
  };

  return (
    <div className="card-premium h-full rounded-[2.5rem] p-8 flex flex-col group overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-slate-900 font-black text-xl tracking-tight leading-none mb-1">Thought Lab</h2>
          <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">Personal Insights</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-primary text-sm shadow-inner group-hover:scale-110 transition-transform">
          🖋
        </div>
      </div>

      <div className="relative mb-6">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value.slice(0, MAX))}
          placeholder="Capture your thoughts..."
          className="w-full h-32 bg-slate-50/50 rounded-2xl p-6 text-slate-700 font-medium text-sm leading-relaxed outline-none border border-slate-100 focus:border-primary/30 focus:bg-white transition-all resize-none placeholder:text-slate-300"
        />

        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <span className={`text-[9px] font-black uppercase tracking-widest ${pct > 90 ? "text-red-500" : "text-slate-300"}`}>
            {draft.length} <span className="opacity-40">/ {MAX}</span>
          </span>
          <button
            onClick={save}
            disabled={!draft.trim()}
            className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-20 disabled:scale-100"
          >
            {editId ? "✓" : "+"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {notes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
            <span className="text-4xl mb-4">🌑</span>
            <p className="text-[10px] font-black uppercase tracking-widest">No entries yet</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group/item relative hover:border-primary/20 transition-all shadow-sm"
              >
                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">{note.text}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                    {relativeTime(note.updatedAt)}
                  </span>
                  <div className="flex gap-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(note)} className="text-[9px] font-black text-primary uppercase tracking-widest">Edit</button>
                    <button onClick={() => del(note.id)} className="text-[9px] font-black text-red-400 uppercase tracking-widest">Delete</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
