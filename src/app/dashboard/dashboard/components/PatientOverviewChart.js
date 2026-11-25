import { Icon } from "@/components/ui/management-ui";

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function PatientOverviewChart({ data = [] }) {
  const counts = new Map(data.map((item) => [item._id, item.count]));
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 6 + index));
    return {
      key: dateKey(date),
      label: date.toLocaleDateString(undefined, { weekday: "short", timeZone: "UTC" }).slice(0, 3).toUpperCase(),
      count: counts.get(dateKey(date)) || 0,
    };
  });
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const maxValue = Math.max(4, ...days.map((day) => day.count));
  const points = days.map((day, index) => ({
    x: (700 / (days.length - 1)) * index,
    y: 168 - (day.count / maxValue) * 140,
  }));
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
  const area = `${line} L700 190 L0 190 Z`;
  const ticks = [maxValue, Math.ceil(maxValue / 2), 0];

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="text-base font-semibold text-slate-900">Patient overview</h2><p className="mt-1 text-xs text-slate-500">Patient registrations over the last 7 days</p></div>
        <span className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600"><Icon name="calendar" className="size-4 text-slate-400" /> Last 7 days</span>
      </div>
      <div className="mt-6 overflow-hidden">
        <div className="relative h-[200px]">
          <div className="absolute inset-0 flex flex-col justify-between">
            {ticks.map((tick, index) => <div key={`${tick}-${index}`} className="flex items-center gap-3"><span className="w-6 text-[10px] text-slate-400">{tick}</span><div className="h-px flex-1 border-t border-dashed border-slate-100" /></div>)}
          </div>
          <svg viewBox="0 0 700 190" preserveAspectRatio="none" className="absolute inset-x-7 top-1 h-[calc(100%-5px)] w-[calc(100%-36px)] overflow-visible" role="img" aria-label={`Patient registrations in the last seven days: ${total} patients`}>
            <defs><linearGradient id="patientChartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#0f9f92" stopOpacity=".17" /><stop offset="100%" stopColor="#0f9f92" stopOpacity="0" /></linearGradient></defs>
            <path d={area} fill="url(#patientChartFill)" />
            <path d={line} fill="none" stroke="#0f9f92" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            {points.map((point, index) => <circle key={days[index].key} cx={point.x} cy={point.y} r="4" fill="#fff" stroke="#0f9f92" strokeWidth="2" vectorEffect="non-scaling-stroke" />)}
          </svg>
        </div>
        <div className="ml-9 mt-3 flex justify-between text-[10px] font-medium text-slate-400">{days.map((day) => <span key={day.key}>{day.label}</span>)}</div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs"><span className="size-2 rounded-full bg-teal-600" /><span className="text-slate-500">New patients</span><span className="ml-auto font-semibold text-slate-800">{total.toLocaleString()}</span><span className="text-slate-400">last 7 days</span></div>
    </section>
  );
}
