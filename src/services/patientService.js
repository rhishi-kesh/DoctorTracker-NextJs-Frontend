import { apiRequest, queryString } from "./api";

export async function getPatients(params = {}) {
  return apiRequest(`/patients${queryString(params)}`);
}

export async function getPatient(id) {
  const response = await apiRequest(`/patients/${id}`);
  return response.data;
}

export async function updatePatient(id, updates) {
  const response = await apiRequest(`/patients/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
  return response.data;
}

export async function deletePatient(id) {
  return apiRequest(`/patients/${id}`, { method: "DELETE" });
}
