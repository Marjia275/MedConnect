
const API_BASE_URL = "https://medconnect-e8ld.onrender.com/api";

const API = {
  AUTH: `${API_BASE_URL}/auth`,
  PATIENT: `${API_BASE_URL}/patient`,
  DOCTOR: `${API_BASE_URL}/doctor`,
  DOCTORS: `${API_BASE_URL}/doctors`,
  APPOINTMENTS: `${API_BASE_URL}/appointments`,
  PRESCRIPTIONS: `${API_BASE_URL}/prescriptions`,
  PAYMENTS: `${API_BASE_URL}/payments`,
  ASSISTANT: `${API_BASE_URL}/assistant`,
  ADMIN: `${API_BASE_URL}/admin`,
};

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
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
  if (!user) {
    window.location.href = getRoleLoginPage(role);
    return false;
  }
  if (role && user.role !== role) {
    window.location.href = getRoleLoginPage(role);
    return false;
  }
  return true;
}

function getRoleLoginPage(role) {
  if (role === "admin") return "../pages/admin-login.html";
  if (role === "assistant") return "../pages/register.html?mode=login";
  return "../pages/register.html?mode=login";
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  const user = getUser();
  window.location.href = "../pages/register.html?mode=login";
}