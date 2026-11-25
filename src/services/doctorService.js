import { apiRequest, queryString } from "./api";

export async function getDoctors(params = {}) {
  return apiRequest(`/doctors${queryString(params)}`);
}

export async function getDoctor(id) {
  const response = await apiRequest(`/doctors/${id}`);
  return response.data;
}

export async function createDoctor(doctor) {
  const response = await apiRequest("/doctors", {
    method: "POST",
    body: JSON.stringify(doctor),
  });
  return response.data;
}

export async function updateDoctor(id, updates) {
  const response = await apiRequest(`/doctors/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
  return response.data;
}

export async function deleteDoctor(id) {
  return apiRequest(`/doctors/${id}`, { method: "DELETE" });
}

export async function getDoctorPatients(id, params = {}) {
  return apiRequest(`/doctors/${id}/patients${queryString(params)}`);
}

export async function addPatientToDoctor(id, patient) {
  const response = await apiRequest(`/doctors/${id}/patients`, {
    method: "POST",
    body: JSON.stringify(patient),
  });
  return response.data;
}

export async function unassignPatientFromDoctor(id, patientId) {
  const response = await apiRequest(
    `/doctors/${id}/patients/${patientId}/unassign`,
    { method: "PATCH" },
  );
  return response.data;
}
