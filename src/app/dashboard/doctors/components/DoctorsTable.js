import { Avatar, Icon } from "@/components/ui/management-ui";

function displayDate(value) {
  return value
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value))
    : "—";
}

export default function DoctorsTable({
  doctors,
  onViewPatients,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-y border-slate-100 bg-slate-50/60 text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
            <th className="px-6 py-3.5">Doctor</th>
            <th className="px-4 py-3.5">Specialty</th>
            <th className="px-4 py-3.5">Hospital</th>
            <th className="px-4 py-3.5">Patients</th>
            <th className="px-4 py-3.5">Joined date</th>
            <th className="px-5 py-3.5">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {doctors.map((doctor) => (
            <tr key={doctor._id} className="transition hover:bg-slate-50/60">
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    initials={doctor.name?.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}
                    color="bg-teal-100 text-teal-700"
                  />
                  <span className="text-sm font-semibold text-slate-800">
                    {doctor.name}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                {doctor.specialization}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                {doctor.hospital}
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                <button
                  onClick={() => onViewPatients(doctor._id)}
                  aria-label={`View patients for ${doctor.name}`}
                  className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 transition hover:bg-teal-100"
                >
                  {doctor.patientCount ?? 0}<span className="ml-1 font-normal">view</span>
                </button>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-500">
                {displayDate(doctor.createdAt)}
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(doctor)}
                    aria-label={`Edit ${doctor.name}`}
                    className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-teal-50 hover:text-teal-700"
                  >
                    <Icon name="edit" className="size-4" />
                  </button>
                  <button
                    onClick={() => onDelete(doctor)}
                    aria-label={`Delete ${doctor.name}`}
                    className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Icon name="trash" className="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {doctors.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-12 text-center text-sm text-slate-500">
                No doctors match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
