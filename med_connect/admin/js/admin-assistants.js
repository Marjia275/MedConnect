(function () {
      const user = getUser();
      if (!user || user.role !== "admin") { window.location.href = "admin-login.html"; return; }
      document.getElementById("admin-name").textContent = user.fullName || "Admin";
      loadAssistants();
      loadDoctors();
    })();

    async function loadAssistants() {
      const tbody = document.getElementById("asst-tbody");
      try {
        const res = await fetch(`${API.ADMIN}/users?role=assistant&limit=100`, { headers: authHeaders() });
        const data = await res.json();
        if (!data.users.length) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--gray)">No assistants yet</td></tr>'; return; }
        tbody.innerHTML = data.users.map((a, i) => `
      <tr>
        <td style="color:var(--gray);font-size:12px">${i + 1}</td>
        <td><div style="font-weight:700">${a.fullName}</div></td>
        <td style="color:var(--gray)">${a.email}</td>
        <td>${a.phone}</td>
        <td>${a.linkedDoctor ? `<span class="badge badge-teal">Linked</span>` : '<span class="badge badge-inactive">None</span>'}</td>
        <td><span class="badge ${a.isActive ? "badge-active" : "badge-inactive"}">${a.isActive ? "Active" : "Inactive"}</span></td>
        <td>
          <button class="btn btn-sm ${a.isActive ? "btn-danger" : "btn-success"}" onclick="toggleStatus('${a._id}','${a.fullName}',${a.isActive})">
            <i class="fa-solid ${a.isActive ? "fa-ban" : "fa-check"}"></i> ${a.isActive ? "Deactivate" : "Activate"}
          </button>
        </td>
      </tr>`).join("");
      } catch (e) { tbody.innerHTML = `<tr><td colspan="7" style="color:var(--red-text);padding:16px">Error: ${e.message}</td></tr>`; }
    }

    async function loadDoctors() {
      try {
        const res = await fetch(`${API.ADMIN}/users?role=doctor&limit=100`, { headers: authHeaders() });
        const data = await res.json();
        const sel = document.getElementById("f-doctor");
        data.users.filter(d => d.isApproved && d.isActive).forEach(d => {
          const opt = document.createElement("option");
          opt.value = d._id; opt.textContent = `Dr. ${d.fullName} — ${d.doctorInfo?.specialty || ""}`;
          sel.appendChild(opt);
        });
      } catch { }
    }

    async function createAssistant() {
      const fname = document.getElementById("f-fname").value.trim();
      const lname = document.getElementById("f-lname").value.trim();
      const email = document.getElementById("f-email").value.trim();
      const phone = document.getElementById("f-phone").value.trim();
      const pass = document.getElementById("f-pass").value;
      const doc = document.getElementById("f-doctor").value;
      const errEl = document.getElementById("modal-err");
      const btn = document.getElementById("create-btn");

      errEl.style.display = "none";
      if (!fname || !lname || !email || !phone || !pass) { errEl.textContent = "All fields except doctor link are required."; errEl.style.display = "block"; return; }
      if (pass.length < 6) { errEl.textContent = "Password must be at least 6 characters."; errEl.style.display = "block"; return; }

      btn.disabled = true;
      try {
        const res = await fetch(`${API.ADMIN}/assistants`, {
          method: "POST", headers: authHeaders(),
          body: JSON.stringify({ firstName: fname, lastName: lname, email, phone, password: pass, linkedDoctorId: doc || undefined })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        showToast("Assistant account created!", "success");
        closeModal();
        loadAssistants();
      } catch (e) { errEl.textContent = e.message; errEl.style.display = "block"; }
      btn.disabled = false;
    }

    async function toggleStatus(id, name, current) {
      if (!confirm(`${current ? "Deactivate" : "Activate"} ${name}?`)) return;
      try {
        const res = await fetch(`${API.ADMIN}/users/${id}/status`, { method: "PATCH", headers: authHeaders() });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        showToast(data.message, "success");
        loadAssistants();
      } catch (e) { showToast(e.message, "error"); }
    }

    function openModal() { document.getElementById("create-modal").classList.add("show"); }
    function closeModal() { document.getElementById("create-modal").classList.remove("show"); document.getElementById("modal-err").style.display = "none"; }
    function toggleSidebar() { document.getElementById("sidebar").classList.toggle("open"); document.getElementById("drawer-overlay").classList.toggle("show"); }
    function closeSidebar() { document.getElementById("sidebar").classList.remove("open"); document.getElementById("drawer-overlay").classList.remove("show"); }
    function doLogout() { localStorage.clear(); window.location.href = "admin-login.html"; }
    function showToast(msg, type = "") { const t = document.getElementById("toast"); t.textContent = msg; t.className = "show " + type; setTimeout(() => t.className = "", 3200); }
    