export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-black/40 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-bold text-white tracking-wider">
          <span className="text-lime-400">↔</span> FITLOG
        </div>
        <div>
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </div>
      </div>
    </footer>
  );
}