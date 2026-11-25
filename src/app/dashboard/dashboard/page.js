import { SectionHeading } from "@/components/ui/management-ui";
import PatientOverviewChart from "./components/PatientOverviewChart";
import SpecialtyBreakdown from "./components/SpecialtyBreakdown";
import StatCard from "./components/StatCard";
export default function DashboardPage() {
  return (
    <>
      <SectionHeading
        title="Good morning, Alex"
        description="Here’s what’s happening across your practice today."
      />
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total doctors"
          value="24"
          icon="users"
          tone="bg-teal-50 text-teal-700"
        />
        <StatCard
          label="Total patients"
          value="1,284"
          change="+12.5%"
          icon="heart"
          tone="bg-rose-50 text-rose-600"
          note="vs last month"
        />
        <StatCard
          label="Appointments today"
          value="38"
          change="+4.3%"
          icon="calendar"
          tone="bg-violet-50 text-violet-600"
          note="vs yesterday"
        />
        <StatCard
          label="Avg. patients / doctor"
          value="53.5"
          change="+2.1%"
          icon="grid"
          tone="bg-amber-50 text-amber-600"
          note="this quarter"
        />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <PatientOverviewChart />
        <SpecialtyBreakdown />
      </div>
    </>
  );
}
