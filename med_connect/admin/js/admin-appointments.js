let debounceTimer;
(function () {
  const user = getUser();
  if (!user || user.role !== "admin") { window.location.href = "admin-login.html"; return; }
  document.getElementById("admin-name").textContent = user.fullName || "Admin";
  loadAppts();
})();

function debounceLoad() { clearTimeout(debounceTimer); debounceTimer = setTimeout(loadAppts, 350); }

async function loadAppts() {
  const tbody = document.getElementById("appt-tbody");
  const date = document.getElementById("date-filter").value;
  const status = document.getElementById("status-filter").value;
  const search = document.getElementById("search").value.trim().toLowerCase();
  tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--gray)">Loading…</td></tr>';
  try {
    let url = `${API.APPOINTMENTS}?`;
    if (date) url += `&date=${date}`;
    if (status) url += `&status=${status}`;

    const res = await fetch(url, { headers: authHeaders() });
    const data = await res.json();
    let appts = data.appointments || [];
    if (search) appts = appts.filter(a =>
      (a.patient?.fullName || a.patientName || "").toLowerCase().includes(search) ||
      (a.doctor?.fullName || a.doctorName || "").toLowerCase().includes(search)
    );
    if (!appts.length) { tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--gray)">No appointments found</td></tr>'; return; }
    tbody.innerHTML = appts.map((a, i) => `
      <tr>
        <td style="color:var(--gray);font-size:12px">${i + 1}</td>
        <td>${a.patient?.fullName || a.patientName}</td>
        <td>${a.doctor?.fullName || a.doctorName}</td>
        <td>${a.appointmentDate}</td>
        <td>${a.appointmentTime}</td>
        <td style="font-weight:700;color:var(--teal)">${a.serialNumber || "—"}</td>
        <td><span class="badge badge-${a.status === "confirmed" ? "confirmed" : a.status === "completed" ? "completed" : a.status === "cancelled" ? "rejected" : "pending"}">${a.status}</span></td>
        <td><span class="badge ${a.paymentStatus === "paid" ? "badge-confirmed" : "badge-pending"}">${a.paymentStatus}</span></td>
      </tr>`).join("");
  } catch (e) { tbody.innerHTML = `<tr><td colspan="8" style="color:var(--red-text);padding:16px">Error: ${e.message}</td></tr>`; }
}

function toggleSidebar() { document.getElementById("sidebar").classList.toggle("open"); document.getElementById("drawer-overlay").classList.toggle("show"); }
function closeSidebar() { document.getElementById("sidebar").classList.remove("open"); document.getElementById("drawer-overlay").classList.remove("show"); }
function doLogout() { localStorage.clear(); window.location.href = "admin-login.html"; }
function showToast(msg, type = "") { const t = document.getElementById("toast"); t.textContent = msg; t.className = "show " + type; setTimeout(() => t.className = "", 3200); }
