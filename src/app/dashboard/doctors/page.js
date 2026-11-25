"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AddRecordModal,
  FilterSelect,
  Icon,
  SearchField,
  SectionHeading,
} from "@/components/ui/management-ui";
import {
  createDoctor,
  deleteDoctor as deleteDoctorRequest,
  getDoctors,
  updateDoctor,
} from "@/services/doctorService";
import DoctorsTable from "./components/DoctorsTable";

const PAGE_SIZE = 10;

export default function DoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All specialties");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 });
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getDoctors({
        search: query.trim() || undefined,
        specialization: specialty === "All specialties" ? undefined : specialty,
        page,
        limit: PAGE_SIZE,
      })
      .then((response) => {
        if (active) {
          setDoctors(response.data || []);
          setPagination(response.pagination || { page, limit: PAGE_SIZE, total: 0, totalPages: 1 });
          setError("");
        }
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Could not load doctors.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query, specialty, page, refreshKey]);

  useEffect(() => {
    let active = true;
    getDoctors({ limit: 100 })
      .then((response) => {
        if (active) {
          setSpecialties([...new Set((response.data || []).map((doctor) => doctor.specialization).filter(Boolean))]);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [refreshKey]);

  async function saveDoctor(values) {
    setLoading(true);
    setError("");
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor._id, values);
      } else {
        await createDoctor(values);
      }
    } catch (requestError) {
      setLoading(false);
      throw requestError;
    }
    setEditingDoctor(null);
    setShowAddModal(false);
    setPage(1);
    setRefreshKey((current) => current + 1);
  }

  async function removeDoctor(doctor) {
    if (!window.confirm(`Delete ${doctor.name}?`)) return;
    setLoading(true);
    setError("");
    try {
      await deleteDoctorRequest(doctor._id);
      setError("");
      setRefreshKey((current) => current + 1);
    } catch (requestError) {
      setError(requestError.message || "Could not delete this doctor.");
      setLoading(false);
    }
  }

  function closeModal() {
    setShowAddModal(false);
    setEditingDoctor(null);
  }

  const from = pagination.total ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const to = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <>
      <SectionHeading
        title="Doctors"
        description="Manage your clinical team and their patient panels."
        action={
          <button
            onClick={() => {
              setEditingDoctor(null);
              setShowAddModal(true);
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            <Icon name="plus" className="size-[18px]" /> Add a doctor
          </button>
        }
      />

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          [pagination.total.toLocaleString(), "Total doctors"],
          [specialties.length.toLocaleString(), "Specialties"],
          [`${from}–${to}`, "Doctors shown"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
            <p className="mt-1 text-xs font-medium text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.025)]">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              All doctors <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">{pagination.total}</span>
            </h2>
            <p className="mt-1 text-xs text-slate-500">Your registered healthcare professionals</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <SearchField value={query} onChange={(value) => { setLoading(true); setError(""); setQuery(value); setPage(1); }} placeholder="Search doctors..." />
            <FilterSelect label="Filter by specialty" value={specialty} onChange={(value) => { setLoading(true); setError(""); setSpecialty(value); setPage(1); }}>
              <option>All specialties</option>
              {specialties.map((item) => <option key={item}>{item}</option>)}
            </FilterSelect>
          </div>
        </div>

        {error && <p role="alert" className="mx-6 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {loading ? (
          <p className="px-6 py-10 text-center text-sm text-slate-500">Loading doctors...</p>
        ) : (
          <DoctorsTable
            doctors={doctors}
            onViewPatients={(doctorId) => router.push(`/dashboard/patients?doctor=${encodeURIComponent(doctorId)}`)}
            onEdit={setEditingDoctor}
            onDelete={removeDoctor}
          />
        )}

        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:px-6">
          <span>Showing <strong className="font-semibold text-slate-700">{from}–{to}</strong> of {pagination.total} doctors</span>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1 || loading} onClick={() => { setLoading(true); setPage((current) => Math.max(1, current - 1)); }} aria-label="Previous page" className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 disabled:text-slate-300">
              <Icon name="chevron" className="size-4 rotate-180" />
            </button>
            <span>{pagination.page} / {Math.max(1, pagination.totalPages)}</span>
            <button disabled={page >= pagination.totalPages || loading} onClick={() => { setLoading(true); setPage((current) => current + 1); }} aria-label="Next page" className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 disabled:text-slate-300">
              <Icon name="chevron" className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {(showAddModal || editingDoctor) && (
        <AddRecordModal type="doctor" record={editingDoctor} onClose={closeModal} onSave={saveDoctor} />
      )}
    </>
  );
}
