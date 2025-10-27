import { LayoutDashboard, FileSpreadsheet, Palette, Settings } from 'lucide-react';

export default function Sidebar() {
  const items = [
    { icon: LayoutDashboard, label: 'My Dashboards' },
    { icon: FileSpreadsheet, label: 'Templates' },
    { icon: Palette, label: 'Live Reports' },
    { icon: Settings, label: 'Profile' },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r border-slate-200/70 dark:border-slate-800/70 bg-white/50 dark:bg-slate-950/50 backdrop-blur">
      <div className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200/70 dark:border-slate-800/70 p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">Welcome back</p>
          <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">Build live dashboards</p>
        </div>
      </div>
      <nav className="px-2 py-2 space-y-1">
        {items.map(({ icon: Icon, label }) => (
          <button key={label} className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60">
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-500 text-white shadow">
          <p className="text-sm/5 font-medium">AI Suggest Layout</p>
          <p className="text-xs/5 opacity-80">Let AI propose visuals for your data</p>
          <button className="mt-3 w-full rounded-xl bg-white/15 hover:bg-white/25 transition px-3 py-2 text-sm">Try it</button>
        </div>
      </div>
    </aside>
  );
}
