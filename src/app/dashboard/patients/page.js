"use client";

import {
  AddRecordModal,
  FilterSelect,
  Icon,
  PatientTable,
  SearchField,
  SectionHeading,
} from "@/components/ui/management-ui";
import { initialPatients } from "@/data/patients";
import { use, useMemo, useState } from "react";

export default function PatientsPage({ searchParams }) {
  const { doctor } = use(searchParams);
  const initialDoctor = typeof doctor === "string" ? doctor : "";
  const [patients, setPatients] = useState(initialPatients);
  const [query, setQuery] = useState(initialDoctor);
  const [condition, setCondition] = useState("All conditions");
  const [dateRange, setDateRange] = useState("Any date");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPatients = useMemo(
    () =>
      patients.filter(
        (patient) =>
          `${patient.name} ${patient.condition} ${patient.doctor}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (condition === "All conditions" || patient.condition === condition) &&
          (dateRange === "Any date" ||
            (dateRange === "Today" && patient.date.startsWith("Today")) ||
            (dateRange === "Last 7 days" &&
              ["Today", "Yesterday", "Nov 23, 2026"].some((date) =>
                patient.date.startsWith(date),
              )) ||
            dateRange === "Last 30 days"),
      ),
    [patients, query, condition, dateRange],
  );

  function addPatient({ name, detail }) {
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    setPatients((current) => [
      {
        name,
        age: "—",
        condition: detail,
        doctor: "Unassigned",
        date: "Today",
        status: "Active",
        initials,
        color: "bg-teal-100 text-teal-700",
      },
      ...current,
    ]);
  }

  return (
    <>
      <SectionHeading
        title="Patients"
        description="Keep every patient record organized and easy to find."
        action={
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            <Icon name="plus" className="size-[18px]" /> Add a patient
          </button>
        }
      />
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          ["1,284", "Total patients"],
          ["38", "Added this month"],
          ["92%", "Follow-up rate"],
        ].map(([number, label], index) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4"
          >
            <div
              className={`grid size-10 place-items-center rounded-xl ${index === 0 ? "bg-rose-50 text-rose-600" : index === 1 ? "bg-teal-50 text-teal-700" : "bg-violet-50 text-violet-600"}`}
            >
              <Icon
                name={index === 0 ? "heart" : index === 1 ? "plus" : "grid"}
              />
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight text-slate-900">
                {number}
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-600">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.025)]">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              All patients{" "}
              <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                {filteredPatients.length}
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Patient records across your practice
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Search patients..."
            />
            <FilterSelect
              label="Filter by condition"
              value={condition}
              onChange={setCondition}
            >
              <option>All conditions</option>
              {[...new Set(patients.map((patient) => patient.condition))].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </FilterSelect>
            <FilterSelect
              label="Filter by date"
              value={dateRange}
              onChange={setDateRange}
            >
              <option>Any date</option>
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </FilterSelect>
          </div>
        </div>
        <PatientTable
          patients={filteredPatients}
          onDelete={(patientName) =>
            setPatients((current) =>
              current.filter((patient) => patient.name !== patientName),
            )
          }
        />
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:px-6">
          <span>
            Showing{" "}
            <strong className="font-semibold text-slate-700">
              {filteredPatients.length}
            </strong>{" "}
            of 1,284 patients
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
          type="patient"
          onClose={() => setShowAddModal(false)}
          onSave={addPatient}
        />
      )}
    </>
  );
}
