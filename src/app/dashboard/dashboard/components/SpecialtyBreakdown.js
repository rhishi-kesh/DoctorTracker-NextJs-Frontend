export default function SpecialtyBreakdown() {
  const specialties = [
    ["Cardiology", "34%", "bg-teal-600"],
    ["Neurology", "23%", "bg-violet-500"],
    ["Pediatrics", "18%", "bg-orange-400"],
    ["Orthopedics", "14%", "bg-rose-400"],
    ["Other", "11%", "bg-slate-300"],
  ];
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] sm:p-6">
      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Patients by specialty
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Distribution across departments
        </p>
      </div>
      <div className="flex items-center justify-center py-5">
        <div className="relative size-40">
          <svg
            viewBox="0 0 100 100"
            className="-rotate-90"
            role="img"
            aria-label="Patient distribution across five specialties"
          >
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="#e8eef0"
              strokeWidth="12"
            />
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="#0f9f92"
              strokeWidth="12"
              strokeDasharray="72 142"
            />
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="#7d75e8"
              strokeWidth="12"
              strokeDasharray="49 165"
              strokeDashoffset="-75"
            />
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="#f3a55d"
              strokeWidth="12"
              strokeDasharray="38 176"
              strokeDashoffset="-127"
            />
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke="#ef7c91"
              strokeWidth="12"
              strokeDasharray="30 184"
              strokeDashoffset="-168"
            />
          </svg>
          <div className="absolute inset-[18px] grid place-content-center rounded-full bg-white text-center">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              1,284
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">Total patients</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {specialties.map(([label, percent, color]) => (
          <div key={label} className="flex items-center gap-2.5 text-xs">
            <span className={`size-2 rounded-full ${color}`} />
            <span className="flex-1 text-slate-500">{label}</span>
            <span className="font-semibold text-slate-700">{percent}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
