import { useCallback, useMemo, useState } from 'react';
import { Upload, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { columns: [], rows: [] };
  const columns = lines[0].split(',').map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const values = line.split(',');
    const row = {};
    columns.forEach((col, i) => (row[col] = (values[i] ?? '').trim()));
    return row;
  });
  return { columns, rows };
}

export default function UploadZone({ onPreview, onGenerate }) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | processing | live

  const zoneStyle = useMemo(
    () =>
      `relative rounded-2xl border-2 border-dashed p-8 transition ${
        dragOver
          ? 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30'
          : 'border-slate-300/80 dark:border-slate-700'
      }`,
    [dragOver]
  );

  const handleFiles = useCallback(
    (files) => {
      const file = files?.[0];
      if (!file) return;
      setFileName(file.name);
      setStatus('uploading');
      setProgress(15);

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result?.toString() || '';
        let table = null;
        if (file.name.toLowerCase().endsWith('.csv')) {
          table = parseCsv(text);
        } else {
          table = { columns: ['File', 'Size (KB)'], rows: [{ File: file.name, 'Size (KB)': Math.round(file.size / 102.4) / 10 }] };
        }
        setStatus('processing');
        setProgress(60);
        setTimeout(() => {
          setPreview(table);
          setProgress(85);
          onPreview?.(table);
          setTimeout(() => {
            setProgress(100);
            setStatus('idle');
          }, 500);
        }, 600);
      };
      if (file.type.startsWith('text') || file.name.toLowerCase().endsWith('.csv')) reader.readAsText(file);
      else reader.readAsArrayBuffer(file);
    },
    [onPreview]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const onInputChange = useCallback(
    (e) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  return (
    <div className="space-y-4">
      <div
        className={zoneStyle}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <input
          id="file-input"
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={onInputChange}
        />
        <label htmlFor="file-input" className="flex flex-col items-center justify-center gap-3 cursor-pointer">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-500 text-white flex items-center justify-center shadow">
            <Upload className="h-7 w-7" />
          </div>
          <div className="text-center">
            <p className="font-medium text-slate-900 dark:text-slate-100">Drag & drop CSV/XLSX or click to upload</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Instant preview and live dashboard generation</p>
          </div>
          {fileName && (
            <p className="text-xs text-slate-500 dark:text-slate-400">Selected: {fileName}</p>
          )}
        </label>
        <AnimatePresence>
          {(status === 'uploading' || status === 'processing') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-8 bottom-6"
            >
              <div className="h-2 w-full rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                {status === 'uploading' ? 'Uploading...' : 'Processing...'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {preview && (
        <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900/60">
            <p className="font-medium text-slate-800 dark:text-slate-200">Data Preview</p>
            <button
              onClick={() => onGenerate?.(preview)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 text-sm hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[.99]"
            >
              <RefreshCw className="h-4 w-4" />
              Generate Dashboard
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900/40">
                <tr>
                  {preview.columns.map((c) => (
                    <th key={c} className="px-3 py-2 text-left font-medium text-slate-700 dark:text-slate-200">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.rows.slice(0, 6).map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-slate-50 dark:odd:bg-slate-950 dark:even:bg-slate-900/40">
                    {preview.columns.map((c) => (
                      <td key={c} className="px-3 py-2 text-slate-700 dark:text-slate-300 whitespace-nowrap">{String(row[c] ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
