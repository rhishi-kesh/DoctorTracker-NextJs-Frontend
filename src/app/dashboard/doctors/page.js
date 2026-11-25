"use client";

import {
  AddRecordModal,
  FilterSelect,
  Icon,
  SearchField,
  SectionHeading,
} from "@/components/ui/management-ui";
import { initialDoctors } from "@/data/doctors";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import DoctorsTable from "./components/DoctorsTable";

export default function DoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState(initialDoctors);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All specialties");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredDoctors = useMemo(
    () =>
      doctors.filter(
        (doctor) =>
          `${doctor.name} ${doctor.specialty} ${doctor.hospital}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (specialty === "All specialties" || doctor.specialty === specialty),
      ),
    [doctors, query, specialty],
  );

  function addDoctor({ name, detail }) {
    const cleanName = name.startsWith("Dr.") ? name : `Dr. ${name}`;
    const initials = cleanName
      .replace(/^Dr\.\s*/i, "")
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    setDoctors((current) => [
      {
        name: cleanName,
        specialty: detail,
        hospital: "New practice",
        patients: 0,
        joined: "Nov 25, 2026",
        initials,
        color: "bg-teal-100 text-teal-700",
      },
      ...current,
    ]);
  }

  return (
    <>
      <SectionHeading
        title="Doctors"
        description="Manage your clinical team and their patient panels."
        action={
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            <Icon name="plus" className="size-[18px]" /> Add a doctor
          </button>
        }
      />
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          ["24", "Total doctors"],
          ["8", "Specialties"],
          ["1,284", "Patients supported"],
        ].map(([number, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-100 bg-white p-4"
          >
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              {number}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-600">{label}</p>
          </div>
        ))}
      </div>
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.025)]">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              All doctors{" "}
              <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                {filteredDoctors.length}
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Your registered healthcare professionals
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Search doctors..."
            />
            <FilterSelect
              label="Filter by specialty"
              value={specialty}
              onChange={setSpecialty}
            >
              <option>All specialties</option>
              {[...new Set(doctors.map((doctor) => doctor.specialty))].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </FilterSelect>
          </div>
        </div>
        <DoctorsTable
          doctors={filteredDoctors}
          onViewPatients={(doctorName) =>
            router.push(
              `/dashboard/patients?doctor=${encodeURIComponent(doctorName)}`,
            )
          }
        />
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:px-6">
          <span>
            Showing{" "}
            <strong className="font-semibold text-slate-700">
              {filteredDoctors.length}
            </strong>{" "}
            of 24 doctors
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled
              className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-300"
            >
              <Icon name="chevron" className="size-4 rotate-180" />
            </button>
            <button className="grid size-8 place-items-center rounded-lg bg-teal-700 text-xs font-semibold text-white">
              1
            </button>
            <button className="grid size-8 place-items-center rounded-lg text-xs hover:bg-slate-100">
              2
            </button>
            <button className="grid size-8 place-items-center rounded-lg text-xs hover:bg-slate-100">
              3
            </button>
            <button className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500">
              <Icon name="chevron" className="size-4" />
            </button>
          </div>
        </div>
      </section>
      {showAddModal && (
        <AddRecordModal
          type="doctor"
          onClose={() => setShowAddModal(false)}
          onSave={addDoctor}
        />
      )}
    </>
  );
}
