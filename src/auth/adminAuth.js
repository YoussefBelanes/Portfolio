export function loginAdmin(email, password) {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem("isAdmin", "true");
    return true;
  }

  return false;
}

export function isAdminLoggedIn() {
  return localStorage.getItem("isAdmin") === "true";
}

export function logoutAdmin() {
  localStorage.removeItem("isAdmin");
}
