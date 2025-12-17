// api/settingsApi.js
import axiosClient from "./axiosClient";

const RESOURCE = "/settings";

export async function getSettings() {
  const res = await axiosClient.get(RESOURCE);
  return res.data;
}

export async function updateSettings(data) {
  const res = await axiosClient.put(RESOURCE, data);
  return res.data;
}
