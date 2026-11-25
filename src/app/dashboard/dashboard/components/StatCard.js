import { Icon } from "@/components/ui/management-ui";

export default function StatCard({ label, value, change, icon, tone, note }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)]">
      <div className="flex items-start justify-between">
        <div className={`grid size-10 place-items-center rounded-xl ${tone}`}>
          <Icon name={icon} />
        </div>
      </div>
      <p className="mt-5 text-[13px] font-medium text-slate-500">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <p className="text-[28px] font-semibold tracking-tight text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}
