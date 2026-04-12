const API_BASE_URL = "http://localhost:5000/api/patient";

function toggleDrawer() {
  var sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;
  var isOpen = sidebar.classList.contains("drawer-open");
  if (isOpen) {
    closeDrawer();
  } else {
    openDrawer();
  }
}

function openDrawer() {
  var hamburger = document.getElementById("hamburger-btn");
  var sidebar = document.querySelector(".sidebar");
  var overlay = document.getElementById("drawer-overlay");
  if (hamburger) hamburger.textContent = "✕";
  if (sidebar) sidebar.classList.add("drawer-open");
  if (overlay) overlay.classList.add("show");
}

function closeDrawer() {
  var hamburger = document.getElementById("hamburger-btn");
  var sidebar = document.querySelector(".sidebar");
  var overlay = document.getElementById("drawer-overlay");
  if (hamburger) hamburger.textContent = "☰";
  if (sidebar) sidebar.classList.remove("drawer-open");
  if (overlay) overlay.classList.remove("show");
}

function confirmLogout(e) {
  e.preventDefault();
  var modal = document.getElementById("logout-modal");
  if (modal) modal.classList.add("show");
}

function closeLogoutModal() {
  var modal = document.getElementById("logout-modal");
  if (modal) modal.classList.remove("show");
}

function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "register.html";
}

function toggleRecord(header) {
  var body = header.nextElementSibling;
  if (!body) return;

  var isOpen = body.classList.contains("open");

  document.querySelectorAll(".record-body").forEach(function (b) {
    b.classList.remove("open");
  });

  document.querySelectorAll(".record-header").forEach(function (h) {
    h.classList.remove("open");
  });

  if (!isOpen) {
    body.classList.add("open");
    header.classList.add("open");
  }
}

function handleOverlayClick(event) {
  if (event.target === document.getElementById("reminder-modal")) {
    closeReminderModal();
  }
}

function showReminderModal() {
  var modal = document.getElementById("reminder-modal");
  if (modal) modal.classList.add("show");
}

function closeReminderModal() {
  var modal = document.getElementById("reminder-modal");
  if (modal) modal.classList.remove("show");
}

function showAddReminder() {
  showReminderModal();
}

function toggleReminder(button) {
  if (!button) return;
  if (button.classList.contains("on")) {
    button.classList.remove("on");
    button.classList.add("off");
  } else {
    button.classList.remove("off");
    button.classList.add("on");
  }
}

function saveReminder() {
  closeReminderModal();
  showToast("Reminder saved", "success");
}

document.addEventListener("DOMContentLoaded", function () {
  var sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach(function (item) {
    item.addEventListener("click", function () {
      sidebarItems.forEach(function (i) {
        i.classList.remove("active");
      });
      item.classList.add("active");
    });
  });

  var now = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var todayDate = document.getElementById("today-date");
  if (todayDate) {
    todayDate.textContent =
      days[now.getDay()] +
      ", " +
      now.getDate() +
      " " +
      months[now.getMonth()] +
      " " +
      now.getFullYear() 
      ;
  }

  loadPatientDashboard();
});

function showToast(msg, type) {
  var existing = document.querySelector(".toast");
  if (existing) existing.remove();

  var t = document.createElement("div");
  t.className = "toast " + (type || "success");
  t.textContent = msg;
  document.body.appendChild(t);

  setTimeout(function () {
    t.classList.add("show");
  }, 10);

  setTimeout(function () {
    t.classList.remove("show");
    setTimeout(function () {
      t.remove();
    }, 400);
  }, 3000);
}

async function loadPatientDashboard() {
  try {
    var storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.id) {
      showToast("Please login first", "error");
      return;
    }

    var response = await fetch(`${API_BASE_URL}/dashboard/${storedUser.id}`);
    var data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load dashboard");
    }

    renderPatientDashboard(data);
  } catch (error) {
    console.error("Dashboard error:", error);
    showToast("Could not load dashboard", "error");
  }
}

function renderPatientDashboard(data) {
  var patient = data.patient || {};
  var stats = data.stats || {};
  var recentAppointments = data.recentAppointments || [];
  var appointments = data.appointments || [];

  var fullName =
    `${patient.firstName || ""} ${patient.lastName || ""}`.trim() || "Patient";
  var firstName = patient.firstName || "Patient";
  var location = `${patient.city || ""} ${patient.country || ""}`.trim() || "-";
  var profileCompletion = stats.profileCompletion || 0;

  setText("patientName", fullName);
  setText("patientNameSidebar", fullName);
  setText("patientGreetingName", firstName);
  setText("patientProfileName", fullName);
  setText("patientId", patient._id || "-");
  setText("patientLocation", location);

  setText("profileCompletion", profileCompletion + "%");
  setText("totalAppointments", stats.totalAppointments || 0);
  setText("upcomingAppointments", stats.upcomingAppointments || 0);
  setText("completedAppointments", stats.completedAppointments || 0);

  var progressBarFill = document.querySelector(".progress-bar-fill");
  if (progressBarFill) {
    progressBarFill.style.width = profileCompletion + "%";
  }

  renderRecentAppointments(recentAppointments);
  renderAllAppointments(appointments);
}

function renderRecentAppointments(recentAppointments) {
  var container = document.getElementById("recentAppointmentsBody");
  if (!container) return;

  if (recentAppointments.length === 0) {
    container.innerHTML = `<div style="padding: 12px 0; color: #6b7280;">No recent appointments found</div>`;
    return;
  }

  container.innerHTML = recentAppointments
    .map(function (item) {
      return `
        <div class="appt-item">
          <div class="appt-avatar-sm">
            <i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>
          </div>
          <div class="appt-info">
            <div class="appt-doc-name">${item.doctorName || "-"}</div>
            <div class="appt-spec">${item.specialty || "-"}${item.serialNumber ? " · Serial #" + item.serialNumber : ""}</div>
            <div class="appt-time">
              <i class="fa-regular fa-calendar-days" style="color: rgb(0, 0, 0);"></i>
              ${item.appointmentDate || "-"} · ${item.appointmentTime || "-"}
            </div>
          </div>
          <div class="appt-actions">
            <span class="badge ${getBadgeClass(item.status)}">${formatStatus(item.status)}</span>
            <button class="btn btn-ghost btn-sm">Details</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderAllAppointments(appointments) {
  var body = document.getElementById("allAppointmentsBody");
  if (!body) return;

  if (appointments.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 20px;">No appointments found</td>
      </tr>
    `;
    return;
  }

  body.innerHTML = appointments
    .map(function (item) {
      return `
        <tr>
          <td>
            <div style="font-weight: 700; color: var(--navy)">
              ${item.doctorName || "-"}
            </div>
          </td>
          <td>${item.specialty || "-"}</td>
          <td>${item.appointmentDate || "-"} · ${item.appointmentTime || "-"}</td>
          <td>
            ${
              item.serialNumber
                ? `<span style="background: var(--teal-light); color: var(--teal); padding: 3px 10px; border-radius: 6px; font-family: var(--display); font-weight: 700;">#${item.serialNumber}</span>`
                : `<span style="color: var(--gray)">—</span>`
            }
          </td>
          <td>
            <span class="badge ${getBadgeClass(item.status)}">${formatStatus(item.status)}</span>
          </td>
          <td><button class="btn btn-ghost btn-sm">Details</button></td>
        </tr>
      `;
    })
    .join("");
}

function getBadgeClass(status) {
  if (status === "confirmed") return "badge-confirmed";
  if (status === "pending") return "badge-pending";
  if (status === "completed") return "badge-completed";
  return "";
}

function formatStatus(status) {
  if (!status) return "-";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function setText(id, value) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}
