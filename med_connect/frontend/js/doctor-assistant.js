// doctor-assistant.js — Doctor manages their assistant

let currentUser = null;
let currentAssistant = null;

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

function doLogout(e) {
  e && e.preventDefault();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "register.html?mode=login";
}

function showToast(msg, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icons = { success: "fa-circle-check", error: "fa-circle-xmark", info: "fa-circle-info" };
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function renderAssistant(asst) {
  currentAssistant = asst;
  if (asst) {
    document.getElementById("asst-name").textContent = asst.fullName;
    document.getElementById("asst-email").textContent = asst.email;
    document.getElementById("asst-phone").textContent = asst.phone;
    document.getElementById("assistant-section").style.display = "block";
    document.getElementById("invite-section").style.display = "none";
  } else {
    document.getElementById("assistant-section").style.display = "none";
    document.getElementById("invite-section").style.display = "block";
  }
  document.getElementById("loading-state").style.display = "none";
}

async function loadAssistant() {
  try {
    const res = await fetch(`${API.DOCTOR_ASSISTANT}/my-assistant/${currentUser.id}`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    renderAssistant(data.assistant);
  } catch (err) {
    document.getElementById("loading-state").style.display = "none";
    document.getElementById("invite-section").style.display = "block";
    showToast("Could not load assistant info: " + err.message, "error");
  }
}

async function inviteAssistant() {
  const fullName = document.getElementById("inv-name").value.trim();
  const email = document.getElementById("inv-email").value.trim();
  const phone = document.getElementById("inv-phone").value.trim();

  if (!fullName || !email || !phone) {
    showToast("Please fill in all fields.", "error");
    return;
  }

  const btn = document.getElementById("invite-btn");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Linking…';

  try {
    const res = await fetch(`${API.DOCTOR_ASSISTANT}/invite`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ fullName, email, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showToast(data.message, "success");
    // Reload to show card
    await loadAssistant();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-link"></i> Send Invite & Link Assistant';
  }
}

function confirmRemove() {
  const name = document.getElementById("asst-name").textContent;
  document.getElementById("remove-name").textContent = name;
  document.getElementById("remove-modal").style.display = "flex";
}

async function removeAssistant() {
  if (!currentAssistant) return;
  const btn = document.getElementById("confirm-remove-btn");
  btn.disabled = true;

  try {
    const res = await fetch(`${API.DOCTOR_ASSISTANT}/remove/${currentAssistant._id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    document.getElementById("remove-modal").style.display = "none";
    showToast(data.message, "success");
    currentAssistant = null;
    renderAssistant(null);
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    btn.disabled = false;
  }
}

// ── Init ───────────────────────────────────────────────────
(function init() {
  currentUser = getUser();
  if (!currentUser || currentUser.role !== "doctor") {
    window.location.href = "register.html?mode=login";
    return;
  }
  document.getElementById("nav-name").textContent = currentUser.fullName || "Doctor";
  document.getElementById("sb-name").textContent = currentUser.fullName || "Doctor";
  document.getElementById("sb-role").textContent = currentUser.doctorInfo?.specialty || "Specialist";
  loadAssistant();
})();