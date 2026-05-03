let currentTab = "pending";

(function(){
  const user = getUser();
  if (!user || user.role !== "admin") { window.location.href="admin-login.html"; return; }
  document.getElementById("admin-name").textContent = user.fullName||"Admin";
  loadPending();
})();

function setTab(tab){
  currentTab = tab;
  ["pending","approved","rejected"].forEach(t => {
    document.getElementById(`section-${t}`).style.display = t===tab ? "block" : "none";
    document.getElementById(`tab-${t}`).className = t===tab ? "btn btn-primary" : "btn btn-ghost";
  });
  if (tab==="pending")  loadPending();
  if (tab==="approved") loadAllDoctors(true);
  if (tab==="rejected") loadAllDoctors(false);
}

async function loadPending(){
  const grid = document.getElementById("pending-grid");
  grid.innerHTML = '<div class="card" style="grid-column:1/-1"><div class="card-body"><div class="empty-state"><div class="empty-icon">⏳</div><p>Loading…</p></div></div></div>';
  try {
    const res  = await fetch(`${API.ADMIN}/doctors/pending`, { headers: authHeaders() });
    const data = await res.json();
    if (!data.doctors.length) {
      grid.innerHTML = '<div class="card" style="grid-column:1/-1"><div class="card-body"><div class="empty-state"><div class="empty-icon">✅</div><p>No pending approvals</p></div></div></div>';
      return;
    }
    grid.innerHTML = data.doctors.map(d => `
      <div class="card" style="margin-bottom:0">
        <div class="card-body">
          <div style="display:flex;gap:12px;margin-bottom:14px">
            <div style="width:48px;height:48px;background:var(--teal-light);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">🩺</div>
            <div>
              <div style="font-weight:800;color:var(--navy)">${d.fullName}</div>
              <div style="font-size:12px;color:var(--gray)">${d.email}</div>
            </div>
          </div>
          <div style="background:var(--gray-light);border-radius:8px;padding:10px;font-size:12px;margin-bottom:14px">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
              <div><span style="color:var(--gray)">Specialty: </span><b>${d.doctorInfo?.specialty||"—"}</b></div>
              <div><span style="color:var(--gray)">Degree: </span><b>${d.doctorInfo?.degree||"—"}</b></div>
              <div><span style="color:var(--gray)">BMDC: </span><b>${d.doctorInfo?.bmdc||"—"}</b></div>
              <div><span style="color:var(--gray)">Phone: </span><b>${d.phone}</b></div>
            </div>
          </div>
          <div style="font-size:11px;color:var(--gray);margin-bottom:12px">Applied: ${new Date(d.createdAt).toLocaleDateString("en-BD")}</div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-success btn-sm" style="flex:1" onclick="approveDoc('${d._id}',true)"><i class="fa-solid fa-check"></i> Approve</button>
            <button class="btn btn-danger btn-sm"  style="flex:1" onclick="approveDoc('${d._id}',false)"><i class="fa-solid fa-xmark"></i> Reject</button>
          </div>
        </div>
      </div>`).join("");
  } catch(e){ grid.innerHTML = `<div class="card" style="grid-column:1/-1"><div class="card-body" style="color:var(--red-text)">Error: ${e.message}</div></div>`; }
}

async function loadAllDoctors(approved){
  const tbodyId = approved ? "approved-tbody" : "rejected-tbody";
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--gray)">Loading…</td></tr>';
  try {
    const res  = await fetch(`${API.ADMIN}/users?role=doctor&limit=100`, { headers: authHeaders() });
    const data = await res.json();
    const docs = data.users.filter(d => approved ? (d.isApproved && d.isActive) : (!d.isApproved || !d.isActive));
    if (!docs.length){ tbody.innerHTML=`<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--gray)">None found</td></tr>`; return; }
    tbody.innerHTML = docs.map((d,i) => `
      <tr>
        <td style="color:var(--gray);font-size:12px">${i+1}</td>
        <td><div style="font-weight:700">${d.fullName}</div><div style="font-size:11px;color:var(--gray)">${d.email}</div></td>
        <td>${d.doctorInfo?.specialty||"—"}</td>
        <td>${d.doctorInfo?.bmdc||"—"}</td>
        <td>${approved?`৳${d.doctorInfo?.consultationFee||0}`:new Date(d.createdAt).toLocaleDateString("en-BD")}</td>
        <td><span class="badge ${d.isActive?"badge-active":"badge-inactive"}">${d.isActive?"Active":"Inactive"}</span></td>
        <td>
          ${!approved ? `<button class="btn btn-success btn-sm" onclick="approveDoc('${d._id}',true)"><i class="fa-solid fa-check"></i> Re-approve</button>` :
            `<button class="btn btn-danger btn-sm" onclick="approveDoc('${d._id}',false)"><i class="fa-solid fa-ban"></i> Suspend</button>`}
        </td>
      </tr>`).join("");
  } catch(e){ tbody.innerHTML = `<tr><td colspan="7" style="color:var(--red-text);padding:16px">Error: ${e.message}</td></tr>`; }
}

async function approveDoc(id, approved){
  try {
    const res  = await fetch(`${API.ADMIN}/doctors/${id}/approve`, {
      method:"PATCH", headers: authHeaders(),
      body: JSON.stringify({ approved })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    showToast(data.message,"success");
    setTimeout(()=>setTab(currentTab), 600);
  } catch(e){ showToast(e.message,"error"); }
}

function closeModal(id){ document.getElementById(id).classList.remove("show"); }
function toggleSidebar(){ document.getElementById("sidebar").classList.toggle("open"); document.getElementById("drawer-overlay").classList.toggle("show"); }
function closeSidebar()  { document.getElementById("sidebar").classList.remove("open"); document.getElementById("drawer-overlay").classList.remove("show"); }
function doLogout(){ localStorage.clear(); window.location.href="admin-login.html"; }
function showToast(msg,type=""){ const t=document.getElementById("toast"); t.textContent=msg; t.className="show "+type; setTimeout(()=>t.className="",3200); }
