import { Avatar, Icon } from "@/components/ui/management-ui";

export default function DoctorsTable({ doctors, onViewPatients }) {
  return (
    <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left">
      <thead><tr className="border-y border-slate-100 bg-slate-50/60 text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase"><th className="px-6 py-3.5">Doctor</th><th className="px-4 py-3.5">Specialty</th><th className="px-4 py-3.5">Hospital</th><th className="px-4 py-3.5">Patients</th><th className="px-4 py-3.5">Joined date</th><th className="px-5 py-3.5" /></tr></thead>
      <tbody className="divide-y divide-slate-100">
        {doctors.map((doctor) => <tr key={doctor.name} className="transition hover:bg-slate-50/60"><td className="whitespace-nowrap px-6 py-4"><div className="flex items-center gap-3"><Avatar initials={doctor.initials} color={doctor.color} /><span className="text-sm font-semibold text-slate-800">{doctor.name}</span></div></td><td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">{doctor.specialty}</td><td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">{doctor.hospital}</td><td className="whitespace-nowrap px-4 py-4"><button onClick={() => onViewPatients(doctor.name)} aria-label={`View patients for ${doctor.name}`} className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 transition hover:bg-teal-100">{doctor.patients}<span className="ml-1 font-normal">view</span></button></td><td className="whitespace-nowrap px-4 py-4 text-xs text-slate-500">{doctor.joined}</td><td className="px-5 py-4"><button aria-label={`More options for ${doctor.name}`} className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><Icon name="more" className="size-4" /></button></td></tr>)}
        {doctors.length === 0 && <tr><td colSpan="6" className="px-6 py-12 text-center text-sm text-slate-500">No doctors match your search.</td></tr>}
      </tbody>
    </table></div>
  );
}
