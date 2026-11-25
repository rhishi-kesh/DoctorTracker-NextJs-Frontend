import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardShell from "./components/DashboardShell";

const API_URL = process.env.API_URL;

async function hasValidSession(token) {
  if (!API_URL) {
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}

export default async function DashboardLayout({ children }) {
  const token = (await cookies()).get("token")?.value;

  if (!token || !(await hasValidSession(token))) {
    redirect("/auth/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
