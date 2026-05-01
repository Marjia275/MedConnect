
let currentPage = 1, totalPages = 1, debounceTimer;

(function () {
    const user = getUser();
    if (!user || user.role !== "admin") { window.location.href = "admin-login.html"; return; }
    document.getElementById("admin-name").textContent = user.fullName || "Admin";
    loadUsers();
})();

function debounceLoad() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => { currentPage = 1; loadUsers(); }, 350);
}

async function loadUsers() {
    const search = document.getElementById("search").value.trim();
    const role = document.getElementById("role-filter").value;
    const tbody = document.getElementById("users-tbody");
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--gray)">Loading…</td></tr>';

    try {
    let url = `${API.ADMIN}/users?page=${currentPage}&limit=20`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (role) url += `&role=${role}`;

    const res = await fetch(url, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    totalPages = data.pages || 1;
    document.getElementById("total-count").textContent = `${data.total} users`;
    document.getElementById("page-info").textContent = `Page ${data.page} of ${totalPages} · ${data.total} total`;
    document.getElementById("prev-btn").disabled = currentPage <= 1;
    document.getElementById("next-btn").disabled = currentPage >= totalPages;

    const statusF = document.getElementById("status-filter").value;
    let users = data.users;
    if (statusF === "active") users = users.filter(u => u.isActive);
    if (statusF === "inactive") users = users.filter(u => !u.isActive);

    if (!users.length) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--gray)">No users found</td></tr>';
        return;
    }

    tbody.innerHTML = users.map((u, i) => `
    <tr>
    <td style="color:var(--gray);font-size:12px">${(currentPage - 1) * 20 + i + 1}</td>
    <td><div style="font-weight:700">${u.fullName}</div>${u.role === "doctor" ? `<div style="font-size:11px;color:var(--gray)">${u.doctorInfo?.specialty || ""}</div>` : ""}</td>
    <td style="color:var(--gray)">${u.email}</td>
    <td>${u.phone}</td>
    <td><span class="badge badge-${u.role}">${u.role}</span></td>
    <td><span class="badge ${u.isActive ? "badge-active" : "badge-inactive"}">${u.isActive ? "Active" : "Inactive"}</span></td>
    <td style="color:var(--gray);font-size:12px">${new Date(u.createdAt).toLocaleDateString("en-BD")}</td>
    <td>
        <div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm" onclick='viewUser(${JSON.stringify(u).replace(/'/g, "&apos;")})'><i class="fa-solid fa-eye"></i></button>
        <button class="btn btn-sm ${u.isActive ? "btn-danger" : "btn-success"}" onclick="toggleStatus('${u._id}','${u.fullName}',${u.isActive})">
            <i class="fa-solid ${u.isActive ? "fa-ban" : "fa-check"}"></i> ${u.isActive ? "Deactivate" : "Activate"}
        </button>
        </div>
    </td>
    </tr>`).join("");
    } catch (e) { tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--red-text)">Error: ${e.message}</td></tr>`; }
}

function viewUser(u) {
    const isDoc = u.role === "doctor";
    document.getElementById("view-modal-body").innerHTML = `
<div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
    <div style="width:52px;height:52px;border-radius:50%;background:var(--teal-light);display:flex;align-items:center;justify-content:center;font-size:26px">${isDoc ? "🩺" : "👤"}</div>
    <div>
    <div style="font-size:16px;font-weight:800;color:var(--navy)">${u.fullName}</div>
    <div style="font-size:12px;color:var(--gray)">${u.email} · ${u.phone}</div>
    <span class="badge badge-${u.role}" style="margin-top:5px">${u.role}</span>
    <span class="badge ${u.isActive ? "badge-active" : "badge-inactive"}" style="margin-top:5px">${u.isActive ? "Active" : "Inactive"}</span>
    </div>
</div>
${isDoc ? `
    <div style="background:var(--gray-light);border-radius:10px;padding:14px;margin-bottom:14px">
    <div style="font-size:11px;font-weight:800;text-transform:uppercase;color:var(--gray);margin-bottom:10px">Doctor Info</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">
        <div><span style="color:var(--gray)">Specialty: </span><b>${u.doctorInfo?.specialty || "—"}</b></div>
        <div><span style="color:var(--gray)">Degree: </span><b>${u.doctorInfo?.degree || "—"}</b></div>
        <div><span style="color:var(--gray)">BMDC: </span><b>${u.doctorInfo?.bmdc || "—"}</b></div>
        <div><span style="color:var(--gray)">Experience: </span><b>${u.doctorInfo?.experience || 0} yrs</b></div>
        <div><span style="color:var(--gray)">Fee: </span><b>৳${u.doctorInfo?.consultationFee || 0}</b></div>
        <div><span style="color:var(--gray)">Approved: </span><b>${u.isApproved ? "Yes" : "No"}</b></div>
    </div>
    </div>` : ""}
<div style="font-size:12px;color:var(--gray)">Registered: ${new Date(u.createdAt).toLocaleString("en-BD")}</div>`;
    document.getElementById("view-modal").classList.add("show");
}

async function toggleStatus(id, name, currentActive) {
    if (!confirm(`${currentActive ? "Deactivate" : "Activate"} ${name}?`)) return;
    try {
    const res = await fetch(`${API.ADMIN}/users/${id}/status`, { method: "PATCH", headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showToast(data.message, "success");
    loadUsers();
    } catch (e) { showToast(e.message, "error"); }
}

function changePage(dir) {
    const next = currentPage + dir;
    if (next < 1 || next > totalPages) return;
    currentPage = next; loadUsers();
}

function closeModal(id) { document.getElementById(id).classList.remove("show"); }
function toggleSidebar() { document.getElementById("sidebar").classList.toggle("open"); document.getElementById("drawer-overlay").classList.toggle("show"); }
function closeSidebar() { document.getElementById("sidebar").classList.remove("open"); document.getElementById("drawer-overlay").classList.remove("show"); }
function doLogout() { localStorage.clear(); window.location.href = "admin-login.html"; }
function showToast(msg, type = "") { const t = document.getElementById("toast"); t.textContent = msg; t.className = "show " + type; setTimeout(() => t.className = "", 3200); }
