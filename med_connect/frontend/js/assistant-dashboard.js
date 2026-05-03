// assistant-dashboard.js

let currentUser = null;

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

function formatDate(d) {
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function statusBadge(status) {
  const map = {
    pending:   "badge-pending",
    accepted:  "badge-accepted",
    confirmed: "badge-confirmed",
    completed: "badge-completed",
    cancelled: "badge-cancelled",
    "no-show": "badge-no-show",
  };
  return `<span class="badge ${map[status] || "badge-pending"}">${status}</span>`;
}

function renderTodayList(appointments) {
  const container = document.getElementById("today-list");
  document.getElementById("today-count").textContent = `${appointments.length} appointment${appointments.length !== 1 ? "s" : ""}`;

  if (!appointments.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="ei"><i class="fa-regular fa-calendar-xmark" style="font-size:36px;opacity:0.4"></i></div>
        <div class="et">No Appointments Today</div>
        <div class="es">Nothing scheduled for today.</div>
      </div>`;
    return;
  }

  container.innerHTML = appointments.map(a => {
    const serial = a.serialNumber ? `<span class="serial-badge">#${a.serialNumber}</span>` : `<span class="serial-badge" style="background:var(--gray)">—</span>`;
    return `
      <div class="schedule-item">
        ${serial}
        <div style="flex:1;min-width:0">
          <div class="schedule-name">${a.patient?.fullName || a.patientName || "—"}</div>
          <div class="schedule-meta">${a.appointmentTime || "—"}</div>
        </div>
        ${statusBadge(a.status)}
        <a class="btn btn-ghost btn-sm" href="assistant-appointments.html" style="margin-left:6px">View</a>
      </div>`;
  }).join("");
}

function renderPendingList(appointments, onAction) {
  const container = document.getElementById("pending-list");
  const pending = appointments.filter(a => a.status === "pending");
  document.getElementById("pending-count").textContent = `${pending.length} pending`;

  const badge = document.getElementById("pending-badge");
  if (pending.length > 0) {
    badge.style.display = "inline";
    badge.textContent = pending.length;
  } else {
    badge.style.display = "none";
  }

  if (!pending.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="ei"><i class="fa-solid fa-circle-check" style="font-size:36px;opacity:0.4;color:var(--green-text)"></i></div>
        <div class="et">All Caught Up!</div>
        <div class="es">No pending appointment requests right now.</div>
      </div>`;
    return;
  }

  container.innerHTML = pending.map(a => `
    <div class="schedule-item" id="pending-row-${a._id}">
      <div style="flex:1;min-width:0">
        <div class="schedule-name">${a.patient?.fullName || a.patientName || "—"}</div>
        <div class="schedule-meta">${formatDate(a.appointmentDate)} · ${a.appointmentTime || "—"}</div>
      </div>
      <div class="action-group">
        <button class="btn btn-outline btn-sm" onclick="handleAction('${a._id}','accepted')">
          <i class="fa-solid fa-check"></i> Accept
        </button>
        <button class="btn btn-danger btn-sm" onclick="handleAction('${a._id}','cancelled')">
          <i class="fa-solid fa-xmark"></i> Reject
        </button>
      </div>
    </div>`).join("");
}

async function handleAction(appointmentId, status) {
  try {
    const res  = await fetch(`${API.ASSISTANT}/appointments/${appointmentId}`, {
      method:  "PATCH",
      headers: authHeaders(),
      body:    JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    const label = status === "accepted" ? "accepted ✓" : "rejected";
    showToast(`Appointment ${label}`, status === "accepted" ? "success" : "info");
    // Remove row and refresh counts
    const row = document.getElementById(`pending-row-${appointmentId}`);
    if (row) row.remove();
    // Refresh stats
    await loadDashboard();
  } catch (err) {
    showToast(err.message, "error");
  }
}

async function loadDashboard() {
  try {
    const res  = await fetch(`${API.ASSISTANT}/dashboard/${currentUser.id}`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    document.getElementById("init-loading").style.display = "none";

    if (!data.doctor) {
      document.getElementById("no-doctor-state").style.display = "block";
      return;
    }

    document.getElementById("dashboard-content").style.display = "block";

    // Banner
    document.getElementById("doctor-banner-name").textContent = `Dr. ${data.doctor.fullName}`;
    document.getElementById("doctor-banner-meta").textContent =
      `Managing appointments · ${data.doctor.doctorInfo?.specialty || ""}`;

    // Stats
    document.getElementById("stat-today").textContent     = data.stats.today;
    document.getElementById("stat-pending").textContent   = data.stats.pending;
    document.getElementById("stat-confirmed").textContent = data.stats.confirmed;
    document.getElementById("stat-total").textContent     = data.stats.total;

    renderTodayList(data.todayAppointments || []);
    renderPendingList(data.recentAppointments || []);
  } catch (err) {
    document.getElementById("init-loading").style.display = "none";
    showToast("Failed to load dashboard: " + err.message, "error");
  }
}

// ── Init ───────────────────────────────────────────────────
(function init() {
  currentUser = getUser();
  if (!currentUser || currentUser.role !== "assistant") {
    window.location.href = "register.html?mode=login";
    return;
  }

  const today = new Date();
  const opts  = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  document.getElementById("welcome-title").textContent = `Welcome, ${currentUser.firstName || "Assistant"} 👋`;
  document.getElementById("today-date").textContent    = today.toLocaleDateString("en-US", opts);
  document.getElementById("nav-name").textContent      = currentUser.fullName || "Assistant";
  document.getElementById("sb-name").textContent       = currentUser.fullName || "Assistant";

  loadDashboard();
})();