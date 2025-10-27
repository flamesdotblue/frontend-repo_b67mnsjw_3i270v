import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UploadZone from './components/UploadZone';
import DashboardCard from './components/DashboardCard';

function App() {
  const [dark, setDark] = useState(true);
  const [preview, setPreview] = useState(null);
  const [dashboards, setDashboards] = useState([
    { id: 'sales-q3', title: 'Sales Performance', subtitle: 'Auto-generated • 5 min ago' },
    { id: 'marketing', title: 'Marketing Funnel', subtitle: 'Yesterday' },
    { id: 'finance', title: 'Finance Overview', subtitle: 'This week' },
  ]);

  const heroGradient = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(1200px 600px at 20% -10%, rgba(99,102,241,.2), transparent), radial-gradient(800px 400px at 90% 10%, rgba(59,130,246,.18), transparent)'
    }),
    []
  );

  const handleGenerate = (table) => {
    // Simulate creating a live report and adding to recent list
    const id = `report-${Date.now()}`;
    setDashboards((d) => [{ id, title: 'Live Report', subtitle: 'Just now' }, ...d].slice(0, 6));
    // Confetti could be added here with an animation library if desired
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-600 selection:text-white">
      <Navbar dark={dark} onToggleDark={() => setDark((v) => !v)} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6 pt-6">
        <Sidebar />
        <main className="space-y-8">
          <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/60">
            <div className="absolute inset-0 pointer-events-none" style={heroGradient} />
            <div className="relative px-6 py-10 sm:px-10">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
              >
                Build live Power BI dashboards from your files in seconds.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-2 text-slate-600 dark:text-slate-300"
              >
                Upload CSV or Excel, preview your data, and spin up a beautiful interactive report.
              </motion.p>
              <div className="mt-6">
                <UploadZone onPreview={setPreview} onGenerate={handleGenerate} />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recently generated</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {dashboards.map((d) => (
                <DashboardCard
                  key={d.id}
                  title={d.title}
                  subtitle={d.subtitle}
                  onOpen={() => alert('Open report: ' + d.title)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
