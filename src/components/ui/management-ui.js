"use client";

import { useState } from "react";

function Icon({ name, className = "size-5" }) {
  const paths = {
    grid: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </>
    ),
    users: (
      <>
        <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M20.5 20v-1.5a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    heart: (
      <>
        <path d="M20.8 8.6c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10a4.8 4.8 0 0 1 8.8-2.5 4.8 4.8 0 0 1 8.8 2.5Z" />
        <path d="M8 11h2l1.2-2.2 1.7 4.4 1.1-2.2h2" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
    close: (
      <>
        <path d="m18 6-12 12M6 6l12 12" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5m5 5H3" />
        <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || paths.grid}
    </svg>
  );
}

function Avatar({ initials, color, size = "size-10" }) {
  return (
    <div
      className={`grid ${size} shrink-0 place-items-center rounded-full text-xs font-semibold ${color}`}
    >
      {initials}
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="grid size-10 place-items-center rounded-2xl bg-teal-700 text-white shadow-sm shadow-teal-900/15">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-6"
          aria-hidden="true"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div>
        <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
          Doctor tracker
        </p>
      </div>
    </div>
  );
}

function SectionHeading({ title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]">
          {title}
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function AddRecordModal({
  type,
  onClose,
  onSave,
  record = null,
  doctors = [],
  defaultDoctorId = "",
}) {
  const isDoctor = type === "doctor";
  const isEditing = Boolean(record?._id);
  const [values, setValues] = useState(() => ({
    name: record?.name ?? "",
    email: record?.email ?? "",
    phone: record?.phone ?? "",
    specialization: record?.specialization ?? "",
    hospital: record?.hospital ?? "",
    condition: record?.condition ?? "",
    age: record?.age ?? "",
    gender: record?.gender ?? "",
    address: record?.address ?? "",
    notes: record?.notes ?? "",
    doctorId: record?.doctor?._id ?? defaultDoctorId,
  }));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    const payload = isDoctor
      ? {
          name: values.name.trim(),
          specialization: values.specialization.trim(),
          hospital: values.hospital.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
        }
      : {
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          age: Number(values.age),
          gender: values.gender,
          condition: values.condition.trim(),
          address: values.address.trim(),
          notes: values.notes.trim(),
          ...(isEditing ? {} : { doctorId: values.doctorId }),
        };

    try {
      await onSave(payload);
      onClose();
    } catch (saveError) {
      setError(saveError.message || "The record could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-teal-700 uppercase">
              {isEditing ? "Edit record" : "New record"}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {isEditing ? "Edit" : "Add"} {isDoctor ? "doctor" : "patient"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-9 place-items-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            {isDoctor ? "Doctor name" : "Patient name"}
            <input
              autoFocus
              required
              name="name"
              value={values.name}
              onChange={updateField}
              placeholder={isDoctor ? "Dr. Alex Rivera" : "Patient full name"}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
            />
          </label>
          {isDoctor ? (
            <>
              <label className="block text-sm font-medium text-slate-700">
                Specialty
                <input required name="specialization" value={values.specialization} onChange={updateField} placeholder="e.g. Cardiology" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Hospital or clinic
                <input required name="hospital" value={values.hospital} onChange={updateField} placeholder="Practice name" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Phone
                <input required name="phone" value={values.phone} onChange={updateField} maxLength={20} placeholder="Phone number" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input required type="email" name="email" value={values.email} onChange={updateField} maxLength={254} placeholder="doctor@clinic.com" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-slate-700">
                Condition
                <input required name="condition" value={values.condition} onChange={updateField} maxLength={150} placeholder="e.g. Seasonal allergy" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Phone
                <input required name="phone" value={values.phone} onChange={updateField} maxLength={20} placeholder="Phone number" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Email <span className="font-normal text-slate-400">(optional)</span>
                <input type="email" name="email" value={values.email} onChange={updateField} maxLength={254} placeholder="patient@email.com" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Age
                <input required type="number" name="age" value={values.age} onChange={updateField} min="0" max="120" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Gender
                <select required name="gender" value={values.gender} onChange={updateField} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10">
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </label>
              {!isEditing && (
                <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                  Assign to doctor
                  <select required name="doctorId" value={values.doctorId} onChange={updateField} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10">
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => <option key={doctor._id} value={doctor._id}>{doctor.name} · {doctor.specialization}</option>)}
                  </select>
                  {doctors.length === 0 && <span className="mt-1 block text-xs text-amber-700">Add a doctor before creating an assigned patient record.</span>}
                </label>
              )}
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Address <span className="font-normal text-slate-400">(optional)</span>
                <input name="address" value={values.address} onChange={updateField} maxLength={300} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Notes <span className="font-normal text-slate-400">(optional)</span>
                <textarea name="notes" value={values.notes} onChange={updateField} maxLength={2000} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-normal outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" />
              </label>
            </>
          )}
        </div>
        {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl px-4 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || (!isDoctor && !isEditing && doctors.length === 0)}
            className="h-10 rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditing ? "Save changes" : "Save record"}
          </button>
        </div>
      </form>
    </div>
  );
}

function SearchField({ value, onChange, placeholder, id = "page-search" }) {
  return (
    <label className="relative block w-full sm:max-w-[280px]">
      <span className="sr-only">Search records</span>
      <Icon
        name="search"
        className="absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-slate-400"
      />
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
      />
    </label>
  );
}

function FilterSelect({ value, onChange, children, label }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 min-w-32 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-xs font-medium text-slate-600 outline-none focus:border-teal-500"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
        ⌄
      </span>
    </label>
  );
}

function PatientTable({ patients, compact = false, onDelete, onEdit, onUnassign }) {
  const hasActions = Boolean(onDelete || onEdit || onUnassign);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] text-left">
        <thead>
          <tr className="border-y border-slate-100 bg-slate-50/60 text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
            <th className="px-5 py-3.5 sm:px-6">Patient</th>
            <th className="px-4 py-3.5">Condition</th>
            <th className="px-4 py-3.5">Assigned doctor</th>
            <th className="px-4 py-3.5">Last visit</th>
            <th className="px-5 py-3.5">Gender</th>
            {hasActions && (
              <th className="px-4 py-3.5">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {patients.map((patient) => (
            <tr key={patient._id || patient.name} className="transition hover:bg-slate-50/60">
              <td className="whitespace-nowrap px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-3">
                  <Avatar
                    initials={patient.initials || patient.name?.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}
                    color={patient.color || "bg-teal-100 text-teal-700"}
                    size="size-9"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {patient.name}
                    </p>
                    {!compact && (
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        Age {patient.age}
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-500">
                {patient.condition}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-500">
                {typeof patient.doctor === "object" ? patient.doctor?.name || "Unassigned" : patient.doctor || "Unassigned"}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
                {patient.createdAt
                  ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(patient.createdAt))
                  : patient.date || "—"}
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-xs capitalize text-slate-500">
                {patient.gender || "—"}
              </td>
              {hasActions && (
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    {onUnassign && typeof patient.doctor === "object" && patient.doctor?._id && (
                      <button
                        onClick={() => onUnassign(patient)}
                        aria-label={`Unassign ${patient.name} from ${patient.doctor.name}`}
                        className="rounded-lg px-2 py-1 text-[10px] font-medium text-amber-700 transition hover:bg-amber-50"
                      >
                        Unassign
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(patient)}
                        aria-label={`Edit ${patient.name}`}
                        className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-teal-50 hover:text-teal-700"
                      >
                        <Icon name="edit" className="size-4" />
                      </button>
                    )}
                    {onDelete && (
                  <button
                    onClick={() => onDelete(patient)}
                    aria-label={`Delete ${patient.name}`}
                    className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Icon name="trash" className="size-4" />
                  </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {patients.length === 0 && (
            <tr>
              <td
                colSpan={hasActions ? 6 : 5}
                className="px-6 py-12 text-center text-sm text-slate-500"
              >
                No patients match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export {
  AddRecordModal,
  Avatar,
  Brand,
  FilterSelect,
  Icon,
  PatientTable,
  SearchField,
  SectionHeading,
};
