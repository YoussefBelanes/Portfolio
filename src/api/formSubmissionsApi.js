import axiosClient from './axiosClient'; // ton instance axios avec baseURL http://localhost:4000
const RESOURCE =

'/formsubmissions';

export async function createFormSubmission(payload) {
const res = await axiosClient.post(RESOURCE, payload);
return res.data;
}
export async function getFormSubmissions() {
const res = await axiosClient.get(RESOURCE);
return res.data;
}
export async function updateFormSubmission(id, payload) {
const res = await axiosClient.put(`${RESOURCE}/${id}`, payload);
return res.data;
}
export async function deleteFormSubmission(id) {
await axiosClient.delete(`${RESOURCE}/${id}`);
return true;
}