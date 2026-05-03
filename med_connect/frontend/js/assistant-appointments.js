// assistant-appointments.js

let currentUser = null;
let activePaymentId = null; // appointment _id awaiting payment confirmation

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

function formatDate(str) {
  if (!str) return "—";
  const d = new Date(str + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function statusBadge(status) {
  const classes = {
    pending: "badge-pending",
    accepted: "badge-accepted",
    confirmed: "badge-confirmed",
    completed: "badge-completed",
    cancelled: "badge-cancelled",
    "no-show": "badge-no-show",
  };
  const labels = {
    pending: "Pending",
    accepted: "Accepted",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
    "no-show": "No-Show",
  };
  return `<span class="badge ${classes[status] || "badge-pending"}">${labels[status] || status}</span>`;
}

function paymentBadge(payStatus) {
  return payStatus === "paid"
    ? `<span class="badge badge-paid"><i class="fa-solid fa-check"></i> Paid</span>`
    : `<span class="badge badge-unpaid"><i class="fa-solid fa-clock"></i> Unpaid</span>`;
}

// Build the actions column based on status + paymentStatus
function actionsHtml(appt) {
  const { _id, status, paymentStatus, patientName, consultationFee } = appt;
  const pName = appt.patient?.fullName || patientName || "Patient";
  const fee = consultationFee || appt.consultationFee || 0;

  if (status === "pending") {
    return `
      <div class="action-group">
        <button class="btn btn-outline btn-sm" onclick="doAction('${_id}','accepted')">
          <i class="fa-solid fa-check"></i> Accept
        </button>
        <button class="btn btn-danger btn-sm" onclick="doAction('${_id}','cancelled')">
          <i class="fa-solid fa-xmark"></i> Reject
        </button>
      </div>`;
  }

  if (status === "accepted" && paymentStatus === "unpaid") {
    return `
      <div class="action-group">
        <button class="btn btn-gold btn-sm" onclick="openPaymentModal('${_id}','${pName.replace(/'/g, "\\'")}',${fee})">
          <i class="fa-solid fa-money-bill-wave"></i> Confirm Payment
        </button>
        <button class="btn btn-danger btn-sm" onclick="doAction('${_id}','cancelled')">
          <i class="fa-solid fa-xmark"></i> Cancel
        </button>
      </div>`;
  }

  if (status === "accepted" && paymentStatus === "paid") {
    // Should auto-move to confirmed, but show nothing actionable
    return `<span style="font-size:12px;color:var(--gray)">Processing…</span>`;
  }

  if (status === "confirmed") {
    return `
      <div class="action-group">
        <button class="btn btn-green btn-sm" onclick="doAction('${_id}','completed')">
          <i class="fa-solid fa-circle-check"></i> Completed
        </button>
        <button class="btn btn-ghost btn-sm" onclick="doAction('${_id}','no-show')">
          <i class="fa-solid fa-ghost"></i> No-Show
        </button>
      </div>`;
  }

  // completed, cancelled, no-show — view only
  return `<span style="font-size:12px;color:var(--gray)">—</span>`;
}

function renderTable(appointments) {
  const wrap = document.getElementById("table-wrap");
  document.getElementById("result-count").textContent = `${appointments.length} result${appointments.length !== 1 ? "s" : ""}`;

  if (!appointments.length) {
    wrap.innerHTML = `
      <div class="empty-state" style="padding:40px">
        <div class="ei"><i class="fa-regular fa-calendar-xmark" style="font-size:40px;opacity:0.4"></i></div>
        <div class="et">No Appointments Found</div>
        <div class="es">Try a different date or status filter.</div>
      </div>`;
    return;
  }

  const rows = appointments.map((a, i) => {
    const bloodBadge = a.patient?.bloodGroup
      ? `<span class="badge" style="background:#fee;color:#c33;font-size:10px;margin-left:4px">${a.patient.bloodGroup}</span>`
      : "";
    const serial = a.serialNumber ? `<strong>#${a.serialNumber}</strong>` : `<span style="color:var(--gray)">—</span>`;
    return `
      <tr>
        <td style="color:var(--gray);font-size:12px">${i + 1}</td>
        <td>
          <div style="font-weight:700">${a.patient?.fullName || a.patientName || "—"}${bloodBadge}</div>
        </td>
        <td style="font-size:12px">${a.patient?.phone || a.patientPhone || "—"}</td>
        <td style="font-size:12px">${formatDate(a.appointmentDate)}</td>
        <td style="font-size:12px">${a.appointmentTime || "—"}</td>
        <td>${serial}</td>
        <td>${statusBadge(a.status)}</td>
        <td>${paymentBadge(a.paymentStatus)}</td>
        <td>${actionsHtml(a)}</td>
      </tr>`;
  }).join("");

  wrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Patient</th>
          <th>Phone</th>
          <th>Date</th>
          <th>Time</th>
          <th>Serial</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

async function loadAppointments(date = "", status = "") {
  const wrap = document.getElementById("table-wrap");
  wrap.innerHTML = `<div class="loading"><div class="spinner"></div>Loading appointments…</div>`;

  const params = new URLSearchParams();
  if (date) params.set("date", date);
  if (status) params.set("status", status);

  try {
    const res = await fetch(`${API.ASSISTANT}/appointments/${currentUser.id}?${params}`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    renderTable(data.appointments || []);
  } catch (err) {
    wrap.innerHTML = `<div class="empty-state" style="padding:32px"><div class="et">Error loading appointments</div><div class="es">${err.message}</div></div>`;
    showToast("Failed to load: " + err.message, "error");
  }
}

async function doAction(appointmentId, status) {
  try {
    const res = await fetch(`${API.ASSISTANT}/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    const labels = {
      accepted: "Appointment accepted ✓",
      cancelled: "Appointment cancelled",
      completed: "Marked as completed ✓",
      "no-show": "Marked as no-show",
    };
    showToast(labels[status] || "Updated", status === "cancelled" ? "info" : "success");
    // Refresh current filters
    applyFilters();
  } catch (err) {
    showToast(err.message, "error");
  }
}

// ── Payment modal ──────────────────────────────────────────
function openPaymentModal(appointmentId, patientName, fee) {
  activePaymentId = appointmentId;
  document.getElementById("pm-patient-name").value = patientName;
  document.getElementById("pm-patient-label").textContent = `Patient: ${patientName}`;
  document.getElementById("pm-amount").value = fee;
  document.getElementById("pm-txn").value = "";
  document.getElementById("pm-bkash").value = "";
  document.getElementById("pm-method").value = "bkash";
  toggleBkashFields();
  document.getElementById("payment-modal").style.display = "flex";
}

function closePaymentModal() {
  document.getElementById("payment-modal").style.display = "none";
  activePaymentId = null;
}

function toggleBkashFields() {
  const method = document.getElementById("pm-method").value;
  const bkashFields = document.getElementById("bkash-fields");
  const cashNote = document.getElementById("cash-note");

  if (method === "bkash") {
    bkashFields.style.display = "block";
    cashNote.style.display = "none";
  } else if (method === "cash") {
    bkashFields.style.display = "none";
    cashNote.style.display = "block";
  } else {
    bkashFields.style.display = "block";
    cashNote.style.display = "none";
  }
}

async function confirmPayment() {
  const amount = parseFloat(document.getElementById("pm-amount").value);
  const method = document.getElementById("pm-method").value;
  const txnId = document.getElementById("pm-txn").value.trim();
  const bkashNumber = document.getElementById("pm-bkash").value.trim();

  if (!amount || amount <= 0) {
    showToast("Please enter a valid amount.", "error");
    return;
  }
  if (method === "bkash" && !txnId) {
    showToast("Transaction ID is required for bKash payment.", "error");
    return;
  }

  const btn = document.getElementById("pm-confirm-btn");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing…';

  try {
    const res = await fetch(API.PAYMENTS, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        appointmentId: activePaymentId,
        transactionId: txnId || `CASH-${Date.now()}`,
        bkashNumber,
        amount,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    const serial = data.appointment?.serialNumber || data.serialNumber || "";
    const serialMsg = serial ? ` Serial #${serial} assigned.` : "";
    showToast(`Payment confirmed!${serialMsg}`, "success");
    closePaymentModal();
    applyFilters();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Confirm Payment';
  }
}

// ── Filters ────────────────────────────────────────────────
function applyFilters() {
  const date = document.getElementById("filter-date").value;
  const status = document.getElementById("filter-status").value;
  loadAppointments(date, status);
}

function resetFilters() {
  document.getElementById("filter-date").value = "";
  document.getElementById("filter-status").value = "";
  loadAppointments();
}

// ── Init ───────────────────────────────────────────────────
(function init() {
  currentUser = getUser();
  if (!currentUser || currentUser.role !== "assistant") {
    window.location.href = "register.html?mode=login";
    return;
  }

  document.getElementById("nav-name").textContent = currentUser.fullName || "Assistant";
  document.getElementById("sb-name").textContent = currentUser.fullName || "Assistant";

  // Load linked doctor info for subtitle
  fetch(`${API.ASSISTANT}/dashboard/${currentUser.id}`, { headers: authHeaders() })
    .then(r => r.json())
    .then(data => {
      if (data.doctor) {
        document.getElementById("doctor-info-sub").textContent =
          `Managing appointments for Dr. ${data.doctor.fullName} · ${data.doctor.doctorInfo?.specialty || ""}`;
      } else {
        document.getElementById("doctor-info-sub").textContent = "No linked doctor";
      }
    })
    .catch(() => { });

  // Set today as default date
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("filter-date").value = today;

  loadAppointments(today, "");
})();