import { Share2, RefreshCw, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardCard({ title, subtitle, onOpen }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/50 shadow-sm overflow-hidden"
    >
      <div className="relative h-36 bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.25),transparent_60%)]" />
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button className="rounded-lg bg-white/20 backdrop-blur px-2.5 py-1.5 text-white text-xs hover:bg-white/30 inline-flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5" />Refresh
          </button>
          <button className="rounded-lg bg-white/20 backdrop-blur px-2.5 py-1.5 text-white text-xs hover:bg-white/30 inline-flex items-center gap-1">
            <Palette className="h-3.5 w-3.5" />Theme
          </button>
          <button className="rounded-lg bg-white/20 backdrop-blur px-2.5 py-1.5 text-white text-xs hover:bg-white/30 inline-flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5" />Share
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">{title}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
          <button
            onClick={onOpen}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Open
          </button>
        </div>
      </div>
    </motion.div>
  );
}
