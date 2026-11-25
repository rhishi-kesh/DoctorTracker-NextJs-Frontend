"use client";

import { Avatar, Brand, Icon } from "@/components/ui/management-ui";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ currentPage, navigation, navigationLink }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logout();

      router.replace("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
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
          <div className="flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2">
            <Avatar
              initials={initials}
              color="bg-violet-100 text-violet-700"
              size="size-8"
            />

            <span className="hidden text-left sm:block">
              <span className="block text-xs font-semibold text-slate-700">
                {user?.name || "Admin"}
              </span>

              <span className="block text-[10px] text-slate-400">
                {user?.email || "Administrator"}
              </span>
            </span>
          </div>

          <button
            title="Sign out"
            onClick={handleLogout}
            disabled={loggingOut}
            className="ml-1 grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name="logout" className="size-[18px]" />
          </button>
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden"
        aria-label="Main navigation"
      >
        {navigation?.map((item) => navigationLink(item, true))}
      </nav>
    </header>
  );
}
