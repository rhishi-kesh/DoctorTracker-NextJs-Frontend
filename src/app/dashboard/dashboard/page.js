"use client";

import { Icon, SectionHeading } from "@/components/ui/management-ui";
import {
  getDashboardOverview,
  getDashboardStatistics,
  getPatientsPerDoctor,
} from "@/services/dashboardService";
import { getPatients } from "@/services/patientService";
import Link from "next/link";
import { useEffect, useState } from "react";
import PatientOverviewChart from "./components/PatientOverviewChart";
import StatCard from "./components/StatCard";

function getLastSevenDays() {
  const today = new Date();
  const endDate = today.toISOString().slice(0, 10);
  const start = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - 6,
    ),
  );
  return { startDate: start.toISOString().slice(0, 10), endDate };
}

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [specialtyData, setSpecialtyData] = useState([]);
  const [patientSeries, setPatientSeries] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");
      try {
        const dateRange = getLastSevenDays();
        const [overviewResult, doctorResult, statisticsResult, patientResult] =
          await Promise.all([
            getDashboardOverview(),
            getPatientsPerDoctor(),
            getDashboardStatistics(dateRange),
            getPatients({ page: 1, limit: 4 }),
          ]);

        if (!active) return;
        setOverview(overviewResult);
        setRecentPatients(patientResult.data || []);
        setPatientSeries(statisticsResult.patients || []);
      } catch (requestError) {
        if (active)
          setError(requestError.message || "Could not load dashboard data.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      active = false;
    };
  }, []);

  const totalDoctors = overview?.totalDoctors || 0;
  const totalPatients = overview?.totalPatients || 0;
  const averagePatients = totalDoctors
    ? (totalPatients / totalDoctors).toFixed(1)
    : "0";

  return (
    <>
      <SectionHeading
        eyebrow={new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })
          .format(new Date())
          .toUpperCase()}
        title="Good morning"
        description="Here’s what’s happening across your practice today."
        action={
          <Link
            href="/dashboard/doctors"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            <Icon name="plus" className="size-[18px]" /> Add a doctor
          </Link>
        }
      />

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {loading && (
        <p role="status" className="mt-5 text-sm text-slate-500">
          Loading dashboard data...
        </p>
      )}

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total doctors"
          value={overview ? totalDoctors.toLocaleString() : "—"}
          icon="users"
          tone="bg-teal-50 text-teal-700"
        />
        <StatCard
          label="Total patients"
          value={overview ? totalPatients.toLocaleString() : "—"}
          icon="heart"
          tone="bg-rose-50 text-rose-600"
        />
        <StatCard
          label="Avg. patients / doctor"
          value={overview ? averagePatients : "—"}
          icon="grid"
          tone="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Unassigned patients"
          value={
            overview ? (overview.unassignedPatients || 0).toLocaleString() : "—"
          }
          icon="calendar"
          tone="bg-violet-50 text-violet-600"
        />
      </div>

      <div className="mt-5">
        <PatientOverviewChart data={patientSeries} />
      </div>
    </>
  );
}
