"use client";

import { use, useEffect, useState } from "react";
import {
  AddRecordModal,
  FilterSelect,
  Icon,
  PatientTable,
  SearchField,
  SectionHeading,
} from "@/components/ui/management-ui";
import { getDashboardOverview } from "@/services/dashboardService";
import {
  addPatientToDoctor,
  getDoctors,
  unassignPatientFromDoctor,
} from "@/services/doctorService";
import {
  deletePatient as deletePatientRequest,
  getPatients,
  updatePatient,
} from "@/services/patientService";

const PAGE_SIZE = 10;

function dateRangeParams(range) {
  if (range === "Any date") return {};
  const days = range === "Today" ? 1 : range === "Last 7 days" ? 7 : 30;
  const now = new Date();
  const endDate = now.toISOString().slice(0, 10);
  const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - days + 1)).toISOString().slice(0, 10);
  return { startDate, endDate };
}

export default function PatientsPage({ searchParams }) {
  const { doctor } = use(searchParams);
  const doctorFromUrl = typeof doctor === "string" ? doctor : "";
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [overview, setOverview] = useState(null);
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("All conditions");
  const [dateRange, setDateRange] = useState("Any date");
  const [doctorFilter, setDoctorFilter] = useState(doctorFromUrl);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPatients({
        search: query.trim() || undefined,
        condition: condition === "All conditions" ? undefined : condition,
        doctor: doctorFilter || undefined,
        ...dateRangeParams(dateRange),
        page,
        limit: PAGE_SIZE,
      })
      .then((response) => {
        if (active) {
          setPatients(response.data || []);
          setPagination(response.pagination || { page, limit: PAGE_SIZE, total: 0, totalPages: 1 });
          setError("");
        }
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Could not load patients.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query, condition, doctorFilter, dateRange, page, refreshKey]);

  useEffect(() => {
    let active = true;
    getDoctors({ page: 1, limit: 100 })
      .then((response) => {
        if (active) setDoctors(response.data || []);
      })
      .catch(() => {
        if (active) setDoctors([]);
      });
    return () => {
      active = false;
    };
  }, [refreshKey]);

  useEffect(() => {
    let active = true;
    getDashboardOverview()
      .then((result) => {
        if (active) setOverview(result);
      })
      .catch(() => {
        if (active) setOverview(null);
      });
    return () => {
      active = false;
    };
  }, [refreshKey]);

  async function savePatient(values) {
    setLoading(true);
    setError("");
    try {
      if (editingPatient) {
        await updatePatient(editingPatient._id, values);
      } else {
        const { doctorId, ...patient } = values;
        await addPatientToDoctor(doctorId, patient);
      }
    } catch (requestError) {
      setLoading(false);
      throw requestError;
    }
    setEditingPatient(null);
    setShowAddModal(false);
    setPage(1);
    setRefreshKey((current) => current + 1);
  }

  async function removePatient(patient) {
    if (!window.confirm(`Delete ${patient.name}?`)) return;
    setLoading(true);
    setError("");
    try {
      await deletePatientRequest(patient._id);
      setError("");
      setRefreshKey((current) => current + 1);
    } catch (requestError) {
      setError(requestError.message || "Could not delete this patient.");
      setLoading(false);
    }
  }

  async function unassignPatient(patient) {
    const doctorId = patient.doctor?._id;
    if (!doctorId || !window.confirm(`Unassign ${patient.name} from ${patient.doctor.name}?`)) return;
    setLoading(true);
    setError("");
    try {
      await unassignPatientFromDoctor(doctorId, patient._id);
      setRefreshKey((current) => current + 1);
    } catch (requestError) {
      setError(requestError.message || "Could not unassign this patient.");
      setLoading(false);
    }
  }

  function closeModal() {
    setShowAddModal(false);
    setEditingPatient(null);
  }

  const from = pagination.total ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const to = Math.min(pagination.page * pagination.limit, pagination.total);
  const conditionOptions = [...new Set(patients.map((patient) => patient.condition).filter(Boolean))];

  return (
    <>
      <SectionHeading
        title="Patients"
        description="Keep every patient record organized and easy to find."
        action={
          <button onClick={() => { setEditingPatient(null); setShowAddModal(true); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800">
            <Icon name="plus" className="size-[18px]" /> Add a patient
          </button>
        }
      />

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          [(overview?.totalPatients ?? 0).toLocaleString(), "Total patients"],
          [(overview?.assignedPatients ?? 0).toLocaleString(), "Assigned to doctors"],
          [(overview?.unassignedPatients ?? 0).toLocaleString(), "Unassigned patients"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">{overview ? value : "—"}</p>
            <p className="mt-1 text-xs font-medium text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.025)]">
        <div className="flex flex-col gap-4 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">All patients <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">{pagination.total}</span></h2>
            <p className="mt-1 text-xs text-slate-500">Patient records across your practice</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <SearchField value={query} onChange={(value) => { setLoading(true); setError(""); setQuery(value); setPage(1); }} placeholder="Search patients..." />
            <FilterSelect label="Filter by condition" value={condition} onChange={(value) => { setLoading(true); setError(""); setCondition(value); setPage(1); }}>
              <option>All conditions</option>
              {conditionOptions.map((item) => <option key={item}>{item}</option>)}
            </FilterSelect>
            <FilterSelect label="Filter by doctor" value={doctorFilter} onChange={(value) => { setLoading(true); setError(""); setDoctorFilter(value); setPage(1); }}>
              <option value="">All doctors</option>
              {doctors.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
            </FilterSelect>
            <FilterSelect label="Filter by date" value={dateRange} onChange={(value) => { setLoading(true); setError(""); setDateRange(value); setPage(1); }}>
              <option>Any date</option><option>Today</option><option>Last 7 days</option><option>Last 30 days</option>
            </FilterSelect>
          </div>
        </div>

        {error && <p role="alert" className="mx-6 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {loading ? (
          <p className="px-6 py-10 text-center text-sm text-slate-500">Loading patients...</p>
        ) : (
          <PatientTable patients={patients} onEdit={setEditingPatient} onDelete={removePatient} onUnassign={unassignPatient} />
        )}

        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:px-6">
          <span>Showing <strong className="font-semibold text-slate-700">{from}–{to}</strong> of {pagination.total} patients</span>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1 || loading} onClick={() => { setLoading(true); setPage((current) => Math.max(1, current - 1)); }} aria-label="Previous page" className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 disabled:text-slate-300"><Icon name="chevron" className="size-4 rotate-180" /></button>
            <span>{pagination.page} / {Math.max(1, pagination.totalPages)}</span>
            <button disabled={page >= pagination.totalPages || loading} onClick={() => { setLoading(true); setPage((current) => current + 1); }} aria-label="Next page" className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 disabled:text-slate-300"><Icon name="chevron" className="size-4" /></button>
          </div>
        </div>
      </section>

      {(showAddModal || editingPatient) && (
        <AddRecordModal
          type="patient"
          record={editingPatient}
          doctors={doctors}
          defaultDoctorId={doctorFilter}
          onClose={closeModal}
          onSave={savePatient}
        />
      )}
    </>
  );
}
