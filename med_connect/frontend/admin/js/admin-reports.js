(function () {
    const user = getUser();
    if (!user || user.role !== "admin") { window.location.href = "admin-login.html"; return; }
    document.getElementById("admin-name").textContent = user.fullName || "Admin";
    loadReports();
})();

async function loadReports() {
    try {
    const [reportRes, statsRes] = await Promise.all([
        fetch(`${API.ADMIN}/reports`, { headers: authHeaders() }),
        fetch(`${API.ADMIN}/dashboard`, { headers: authHeaders() })
    ]);
    const report = await reportRes.json();
    const stats = await statsRes.json();

    if (!reportRes.ok) throw new Error(report.message);

    const s = stats.stats || {};
    document.getElementById("r-revenue").textContent = "৳" + (report.totalRevenue || 0).toLocaleString();
    document.getElementById("r-appts").textContent = s.totalAppointments || 0;
    document.getElementById("r-completed").textContent = s.completedAppointments || 0;
    document.getElementById("r-cancelled").textContent = s.cancelledAppointments || 0;

    const payTbody = document.getElementById("pay-tbody");
    if (!report.payments?.length) {
        payTbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--gray)">No payments yet</td></tr>';
    } else {
        payTbody.innerHTML = report.payments.map((p, i) => `
    <tr>
        <td style="color:var(--gray);font-size:12px">${i + 1}</td>
        <td>${p.patient?.fullName || "—"}</td>
        <td>${p.doctor?.fullName || "—"}</td>
        <td style="font-weight:700;color:var(--teal)">৳${p.amount}</td>
        <td><span class="badge badge-teal">${p.method || "bkash"}</span></td>
        <td style="font-size:11px;color:var(--gray);font-family:monospace">${p.transactionId || "—"}</td>
        <td style="color:var(--gray);font-size:12px">${new Date(p.paidAt || p.createdAt).toLocaleDateString("en-BD")}</td>
        <td><span class="badge badge-confirmed">${p.status}</span></td>
    </tr>`).join("");
    }

    const apptTbody = document.getElementById("appt-tbody");
    if (!report.appointments?.length) {
        apptTbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--gray)">No appointments yet</td></tr>';
    } else {
        apptTbody.innerHTML = report.appointments.map((a, i) => `
    <tr>
        <td style="color:var(--gray);font-size:12px">${i + 1}</td>
        <td>${a.patient?.fullName || a.patientName || "—"}</td>
        <td>${a.doctor?.fullName || a.doctorName || "—"}</td>
        <td>${a.appointmentDate}</td>
        <td>${a.appointmentTime}</td>
        <td style="font-weight:700">${a.serialNumber || "—"}</td>
        <td><span class="badge badge-${a.status === "confirmed" ? "confirmed" : a.status === "completed" ? "completed" : a.status === "cancelled" ? "rejected" : "pending"}">${a.status}</span></td>
        <td><span class="badge ${a.paymentStatus === "paid" ? "badge-confirmed" : "badge-pending"}">${a.paymentStatus}</span></td>
    </tr>`).join("");
    }
    } catch (e) { showToast("Failed to load reports: " + e.message, "error"); }
}

function setTab(tab) {
    ["payments", "appointments"].forEach(t => {
    document.getElementById(`section-${t}`).style.display = t === tab ? "block" : "none";
    document.getElementById(`tab-${t}`).className = t === tab ? "btn btn-primary" : "btn btn-ghost";
    });
}

function toggleSidebar() { document.getElementById("sidebar").classList.toggle("open"); document.getElementById("drawer-overlay").classList.toggle("show"); }
function closeSidebar() { document.getElementById("sidebar").classList.remove("open"); document.getElementById("drawer-overlay").classList.remove("show"); }
function doLogout() { localStorage.clear(); window.location.href = "admin-login.html"; }
function showToast(msg, type = "") { const t = document.getElementById("toast"); t.textContent = msg; t.className = "show " + type; setTimeout(() => t.className = "", 3200); }
