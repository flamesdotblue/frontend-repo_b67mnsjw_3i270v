import { useEffect } from 'react';
import { Sun, Moon, Sparkles, User } from 'lucide-react';

export default function Navbar({ dark, onToggleDark }) {
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-500 shadow ring-1 ring-white/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 tracking-tight">PowerDash AI</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">From file to Power BI in seconds</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDark}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'} mode</span>
          </button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center shadow-inner ring-1 ring-white/10">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
