(function(){
  const user = getUser();
  if (!user || user.role !== "admin") { window.location.href = "admin-login.html"; return; }
  document.getElementById("admin-name").textContent = user.fullName || "Admin";

  function tick(){
    const now = new Date();
    document.getElementById("topbar-date").textContent =
      now.toLocaleDateString("en-BD",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
  }
  tick(); setInterval(tick,60000);

  loadDashboard();
})();

async function loadDashboard(){
  try {
    const res  = await fetch(`${API.ADMIN}/dashboard`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    const s = data.stats;
    document.getElementById("s-patients").textContent  = s.totalPatients;
    document.getElementById("s-doctors").textContent   = s.totalDoctors;
    document.getElementById("s-pending").textContent   = s.pendingDoctors;
    document.getElementById("s-today").textContent     = s.todayAppointments;
    document.getElementById("s-completed").textContent = s.completedAppointments;
    document.getElementById("s-revenue").textContent   = "৳" + (s.totalRevenue||0).toLocaleString();
    document.getElementById("pending-count").textContent = s.pendingDoctors;

    const rub = document.getElementById("recent-users-body");
    if (!data.recentUsers || !data.recentUsers.length) {
      rub.innerHTML = '<div class="empty-state"><div class="empty-icon">👤</div><p>No users yet</p></div>';
    } else {
      rub.innerHTML = data.recentUsers.map(u => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
          <div style="width:36px;height:36px;border-radius:50%;background:var(--teal-light);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">
            ${u.role==="doctor"?"🩺":u.role==="patient"?"👤":"🛡️"}
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:700;color:var(--navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.fullName}</div>
            <div style="font-size:11px;color:var(--gray)">${u.email}</div>
          </div>
          <span class="badge badge-${u.role}">${u.role}</span>
        </div>`).join("");
    }

    const pdb = document.getElementById("pending-doctors-body");
    await loadPendingDoctors(pdb);
  } catch(e) {
    console.error(e);
    showToast("Failed to load dashboard: "+e.message,"error");
  }
}

async function loadPendingDoctors(container){
  try {
    const res  = await fetch(`${API.ADMIN}/doctors/pending`, { headers: authHeaders() });
    const data = await res.json();
    if (!data.doctors || !data.doctors.length) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon">✅</div><p>No pending approvals</p></div>';
      return;
    }
    container.innerHTML = data.doctors.slice(0,5).map(d => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700;color:var(--navy)">${d.fullName}</div>
          <div style="font-size:11px;color:var(--gray)">${d.doctorInfo?.specialty||""} · BMDC: ${d.doctorInfo?.bmdc||"N/A"}</div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-success btn-sm" onclick="approveDoc('${d._id}',true)"><i class="fa-solid fa-check"></i></button>
          <button class="btn btn-danger btn-sm"  onclick="approveDoc('${d._id}',false)"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>`).join("");
  } catch(e){ container.innerHTML = '<p style="color:var(--gray);font-size:13px;padding:8px">Could not load</p>'; }
}

async function approveDoc(id, approved){
  try {
    const res  = await fetch(`${API.ADMIN}/doctors/${id}/approve`, {
      method:"PATCH",headers:authHeaders(),
      body:JSON.stringify({approved})
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showToast(data.message,"success");
    setTimeout(()=>loadDashboard(),800);
  } catch(e){ showToast(e.message,"error"); }
}

function toggleSidebar(){ document.getElementById("sidebar").classList.toggle("open"); document.getElementById("drawer-overlay").classList.toggle("show"); }
function closeSidebar()  { document.getElementById("sidebar").classList.remove("open"); document.getElementById("drawer-overlay").classList.remove("show"); }
function doLogout(){ localStorage.removeItem("user"); localStorage.removeItem("token"); window.location.href="admin-login.html"; }

function showToast(msg, type=""){
  const t = document.getElementById("toast");
  t.textContent = msg; t.className = "show " + type;
  setTimeout(()=>{ t.className = ""; }, 3200);
}
