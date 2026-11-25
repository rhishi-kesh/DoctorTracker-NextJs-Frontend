"use client";

import { Icon } from "@/components/ui/management-ui";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import Footer from "@/shared/footer";
import Header from "@/shared/header";
import Sidebar from "@/shared/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { label: "Dashboard", href: "/dashboard/dashboard", icon: "grid" },
  { label: "Doctors", href: "/dashboard/doctors", icon: "users" },
  { label: "Patients", href: "/dashboard/patients", icon: "heart" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentPage =
    navigation.find((item) => item.href === pathname)?.label ?? "Dashboard";

  function navigationLink(item, compact = false) {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`${compact ? "inline-flex shrink-0" : "flex w-full"} items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${compact ? "py-2 text-xs" : "h-11"} ${active ? "bg-teal-50 text-teal-800" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
      >
        <Icon name={item.icon} className={compact ? "size-4" : "size-[18px]"} />
        {item.label}
        {!compact && item.label === "Patients"}
      </Link>
    );
  }

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-[#f7f9fa] text-slate-900">
        <Sidebar navigation={navigation} navigationLink={navigationLink} />

        <div className="lg:pl-[248px]">
          <Header
            currentPage={currentPage}
            navigation={navigation}
            navigationLink={navigationLink}
          />

          <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
