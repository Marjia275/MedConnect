// ─── MedConnect API Configuration ────────────────────────────────────────────
// Change this ONE value when deploying to production.
// e.g. "https://your-backend.onrender.com/api"
const API_BASE = "http://localhost:5000/api";

const API = {
  AUTH:         `${API_BASE}/auth`,
  PATIENT:      `${API_BASE}/patient`,
  DOCTOR:       `${API_BASE}/doctor`,
  DOCTORS:      `${API_BASE}/doctors`,
  APPOINTMENTS: `${API_BASE}/appointments`,
  PRESCRIPTIONS:`${API_BASE}/prescriptions`,
  PAYMENTS:     `${API_BASE}/payments`,
  ASSISTANT:    `${API_BASE}/assistant`,
  ADMIN:        `${API_BASE}/admin`,
};

// ─── Auth helpers ─────────────────────────────────────────────────────────────
function getUser() {
  try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
}
function getToken() {
  return localStorage.getItem("token");
}
function authHeaders() {
  return {
    "Content-Type": "application/json",
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  };
}
function requireRole(role) {
  const user = getUser();
  if (!user) { window.location.href = getRoleLoginPage(role); return false; }
  if (role && user.role !== role) { window.location.href = getRoleLoginPage(role); return false; }
  return true;
}
function getRoleLoginPage(role) {
  if (role === "admin") return "/frontend/admin/pages/admin-login.html";
  return "/frontend/pages/register.html?mode=login";
}
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/frontend/pages/register.html?mode=login";
}
