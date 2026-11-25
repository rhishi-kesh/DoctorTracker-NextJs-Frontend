import { apiRequest, queryString } from "./api";

export async function getDashboardOverview() {
  const response = await apiRequest("/dashboard/overview");
  return response.data;
}

export async function getPatientsPerDoctor() {
  const response = await apiRequest("/dashboard/patients-per-doctor");
  return response.data;
}

export async function getDashboardStatistics(params = {}) {
  const response = await apiRequest(
    `/dashboard/statistics${queryString(params)}`,
  );
  return response.data;
}
