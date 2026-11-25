import { Icon } from "@/components/ui/management-ui";

export default function PatientOverviewChart() {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Patient overview
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Patient registrations over time
          </p>
        </div>
        <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50">
          <Icon name="calendar" className="size-4 text-slate-400" /> Last 7 days{" "}
          <span className="text-[10px]">⌄</span>
        </button>
      </div>
      <div className="mt-6 overflow-hidden">
        <div className="relative h-[200px]">
          <div className="absolute inset-0 flex flex-col justify-between">
            {[240, 180, 120, 60].map((number) => (
              <div key={number} className="flex items-center gap-3">
                <span className="w-6 text-[10px] text-slate-400">{number}</span>
                <div className="h-px flex-1 border-t border-dashed border-slate-100" />
              </div>
            ))}
            <div className="flex items-center gap-3">
              <span className="w-6 text-[10px] text-slate-400">0</span>
              <div className="h-px flex-1 border-t border-slate-100" />
            </div>
          </div>
          <svg
            viewBox="0 0 700 190"
            preserveAspectRatio="none"
            className="absolute inset-x-7 top-1 h-[calc(100%-5px)] w-[calc(100%-36px)] overflow-visible"
            role="img"
            aria-label="Patient registrations trend increasing throughout the week"
          >
            <defs>
              <linearGradient id="patientChartFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#0f9f92" stopOpacity=".17" />
                <stop offset="100%" stopColor="#0f9f92" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 148 C35 136 43 118 80 125 S135 135 175 99 S225 109 268 83 S330 95 360 70 S414 79 447 52 S500 71 535 43 S590 62 622 28 S666 36 700 17 L700 190 L0 190 Z"
              fill="url(#patientChartFill)"
            />
            <path
              d="M0 148 C35 136 43 118 80 125 S135 135 175 99 S225 109 268 83 S330 95 360 70 S414 79 447 52 S500 71 535 43 S590 62 622 28 S666 36 700 17"
              fill="none"
              stroke="#0f9f92"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="447"
              cy="52"
              r="5"
              fill="#fff"
              stroke="#0f9f92"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="ml-9 mt-3 flex justify-between text-[10px] font-medium text-slate-400">
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
          <span>SUN</span>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs">
        <span className="size-2 rounded-full bg-teal-600" />
        <span className="text-slate-500">New patients</span>
        <span className="ml-auto font-semibold text-slate-800">+18.6%</span>
        <span className="text-slate-400">vs last week</span>
      </div>
    </section>
  );
}
