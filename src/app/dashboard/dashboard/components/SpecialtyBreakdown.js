const colors = ["#0f9f92", "#7d75e8", "#f3a55d", "#ef7c91", "#94a3b8", "#22c55e"];
const circumference = 2 * Math.PI * 34;

export default function SpecialtyBreakdown({ data = [] }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const segments = data.map((item, index) => {
    const length = total ? (item.count / total) * circumference : 0;
    const priorCount = data.slice(0, index).reduce((sum, prior) => sum + prior.count, 0);
    const offset = total ? (priorCount / total) * circumference : 0;
    const segment = { ...item, color: colors[index % colors.length], length, offset };
    return segment;
  });

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] sm:p-6">
      <div><h2 className="text-base font-semibold text-slate-900">Patients by specialty</h2><p className="mt-1 text-xs text-slate-500">Assigned patients across doctor specialties</p></div>
      <div className="flex items-center justify-center py-5">
        <div className="relative size-40">
          <svg viewBox="0 0 100 100" className="-rotate-90" role="img" aria-label={`${total} assigned patients across ${data.length} specialties`}>
            <circle cx="50" cy="50" r="34" fill="none" stroke="#e8eef0" strokeWidth="12" />
            {segments.map((segment) => <circle key={segment.name} cx="50" cy="50" r="34" fill="none" stroke={segment.color} strokeWidth="12" strokeDasharray={`${segment.length} ${circumference - segment.length}`} strokeDashoffset={-segment.offset} />)}
          </svg>
          <div className="absolute inset-[18px] grid place-content-center rounded-full bg-white text-center"><p className="text-2xl font-semibold tracking-tight text-slate-900">{total.toLocaleString()}</p><p className="mt-0.5 text-[10px] text-slate-400">Assigned patients</p></div>
        </div>
      </div>
      {segments.length ? (
        <div className="space-y-3">{segments.map((segment) => <div key={segment.name} className="flex items-center gap-2.5 text-xs"><span className="size-2 rounded-full" style={{ backgroundColor: segment.color }} /><span className="flex-1 text-slate-500">{segment.name}</span><span className="font-semibold text-slate-700">{Math.round((segment.count / total) * 100)}%</span></div>)}</div>
      ) : <p className="py-3 text-center text-xs text-slate-400">No specialty data yet.</p>}
    </section>
  );
}
