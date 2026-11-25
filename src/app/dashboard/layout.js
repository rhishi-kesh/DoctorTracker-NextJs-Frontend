"use client";

import { Avatar, Brand, Icon } from "@/components/ui/management-ui";
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
    <div className="min-h-screen bg-[#f7f9fa] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-slate-100 bg-white px-5 py-6 lg:flex">
        <Brand />
        <div className="mt-12">
          <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
            Pages
          </p>
          <nav className="space-y-1" aria-label="Main navigation">
            {navigation.map((item) => navigationLink(item))}
          </nav>
        </div>
        <div className="mt-auto">
          <button className="mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50">
            <Avatar
              initials="AM"
              color="bg-violet-100 text-violet-700"
              size="size-9"
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-slate-800">
                Alex Morgan
              </span>
              <span className="mt-0.5 block text-[10px] text-slate-400">
                Administrator
              </span>
            </span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-9">
            <Link
              href="/dashboard/dashboard"
              className="flex items-center gap-3 lg:hidden"
            >
              <Brand />
            </Link>
            <div className="hidden text-xs text-slate-400 sm:block">
              <span className="text-slate-500">Dashboard</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-slate-700">{currentPage}</span>
            </div>
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2 transition hover:bg-slate-50">
                <Avatar
                  initials="AM"
                  color="bg-violet-100 text-violet-700"
                  size="size-8"
                />
                <span className="hidden text-left sm:block">
                  <span className="block text-xs font-semibold text-slate-700">
                    Alex Morgan
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    Administrator
                  </span>
                </span>
              </button>
              <button
                title="Sign out"
                onClick={() => router.push("/")}
                className="ml-1 grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 cursor-pointer"
              >
                <Icon name="logout" className="size-[18px]" />
              </button>
            </div>
          </div>
          <nav
            className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden"
            aria-label="Main navigation"
          >
            {navigation.map((item) => navigationLink(item, true))}
          </nav>
        </header>

        <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
          {children}
          <footer className="mt-8 flex flex-col justify-between gap-2 pb-2 text-[10px] text-slate-400 sm:flex-row">
            <span>© 2026 RKB</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
