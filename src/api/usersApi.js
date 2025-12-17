import axiosClient from "./axiosClient";

const RESOURCE = "/users";

export async function getUsers() {
  const res = await axiosClient.get(RESOURCE);
  return res.data;
}

export async function addUser(user) {
  const res = await axiosClient.post(RESOURCE, user);
  return res.data;
}

export async function updateUser(id, user) {
  const res = await axiosClient.put(`${RESOURCE}/${id}`, user);
  return res.data;
}

export async function deleteUser(id) {
  await axiosClient.delete(`${RESOURCE}/${id}`);
}
