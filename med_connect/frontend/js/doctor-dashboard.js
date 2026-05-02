// FIX: was "http://localhost:5000/api/doctor" (missing 's') — backend registers as /api/doctors
const API_BASE_URL = "https://medconnect-e8ld.onrender.com/api/doctors";

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

function formatDoctorName(name) {
  if (!name) return "Dr. Doctor";
  var cleanName = name.trim();
  if (cleanName.toLowerCase().startsWith("dr.")) {
    return cleanName;
  }
  return "Dr. " + cleanName;
}

function formatTodayText(total) {
  return (
    days[now.getDay()] +
    ", " +
    now.getDate() +
    " " +
    months[now.getMonth()] +
    " " +
    now.getFullYear() +
    " · Today you have " +
    total +
    " appointments"
  );
}

function toggleDrawer() {
  var s = document.getElementById("sidebar");
  if (s.classList.contains("drawer-open")) {
    closeDrawer();
  } else {
    openDrawer();
  }
}

function openDrawer() {
  document.getElementById("hamburger-btn").textContent = "✕";
  document.getElementById("sidebar").classList.add("drawer-open");
  document.getElementById("drawer-overlay").classList.add("show");
}

function closeDrawer() {
  document.getElementById("hamburger-btn").textContent = "☰";
  document.getElementById("sidebar").classList.remove("drawer-open");
  document.getElementById("drawer-overlay").classList.remove("show");
}

function confirmLogout(e) {
  e.preventDefault();
  document.getElementById("logout-modal").classList.add("show");
}

function closeLogoutModal() {
  document.getElementById("logout-modal").classList.remove("show");
}

function logoutUser() {
  localStorage.removeItem("user");
  window.location.href = "./register.html?mode=login";
}

function showToast(msg, type) {
  var old = document.querySelector(".toast");
  if (old) old.remove();

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

function getInitial(name) {
  if (!name) return "D";
  return name.charAt(0).toUpperCase();
}

function formatMoney(amount) {
  return "৳" + Number(amount || 0).toLocaleString();
}

function formatDoctorMeta(doctor) {
  var specialty =
    doctor.doctorInfo && doctor.doctorInfo.specialty
      ? doctor.doctorInfo.specialty
      : "Doctor";
  var degree =
    doctor.doctorInfo && doctor.doctorInfo.degree
      ? doctor.doctorInfo.degree
      : "No degree added";
  var experience =
    doctor.doctorInfo && doctor.doctorInfo.experience
      ? doctor.doctorInfo.experience
      : 0;

  return (
    specialty +
    " · " +
    degree +
    " · " +
    experience +
    " yrs experience · ID: " +
    String(doctor._id || doctor.id || "").slice(-8).toUpperCase()
  );
}

function renderSchedule(list) {
  var scheduleList = document.getElementById("schedule-list");

  if (!list || !list.length) {
    scheduleList.innerHTML =
      '<div class="scard">' +
      '<div class="snum">#00</div>' +
      '<div class="sav">—</div>' +
      '<div class="sinfo">' +
      '<div class="sn">No appointments for today</div>' +
      '<div class="st">Your schedule is empty</div>' +
      "</div>" +
      '<a class="btn3" href="Doctor_My_patients.html">' +
      '<i class="fa-solid fa-user-group" style="color:#e8f0fe"></i>' +
      "View Patients" +
      "</a>" +
      "</div>";
    return;
  }

  scheduleList.innerHTML = list
    .map(function (item, index) {
      var patientName =
        item.patientName ||
        (item.patient &&
          (item.patient.fullName ||
            ((item.patient.firstName || "") +
              " " +
              (item.patient.lastName || "")).trim())) ||
        "Patient";

      var timeText = item.appointmentTime || "Time not set";

      return (
        '<div class="scard">' +
        '<div class="snum">#' +
        String(index + 1).padStart(2, "0") +
        "</div>" +
        '<div class="sav">' +
        getInitial(patientName) +
        "</div>" +
        '<div class="sinfo">' +
        '<div class="sn">' +
        patientName +
        "</div>" +
        '<div class="st">' +
        timeText +
        "</div>" +
        "</div>" +
        '<a class="btn3" href="Doctor_My_patients.html">' +
        '<i class="fa-solid fa-file-prescription" style="color:#e8f0fe"></i>' +
        "Prescribe" +
        "</a>" +
        "</div>"
      );
    })
    .join("");
}

async function loadDoctorDashboard() {
  try {
    var user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "doctor") {
      window.location.href = "./register.html?mode=login";
      return;
    }

    var doctorId = user._id || user.id;

    document.getElementById("schedule-date").textContent =
      now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();

    // FIX: URL now correctly hits /api/doctors/dashboard/:id
    var response = await fetch(API_BASE_URL + "/dashboard/" + doctorId);
    var data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Failed to load dashboard", "error");
      return;
    }

    var doctor = data.doctor || {};
    var stats = data.stats || {};
    var doctorName = formatDoctorName(doctor.fullName || "Doctor");

    document.getElementById("today-date").textContent = formatTodayText(
      stats.todayAppointments || 0
    );

    document.getElementById("nav-doctor-name").textContent = doctorName;
    document.getElementById("sidebar-doctor-name").textContent = doctorName;
    document.getElementById("sidebar-doctor-role").textContent =
      doctor.doctorInfo && doctor.doctorInfo.specialty
        ? doctor.doctorInfo.specialty
        : "Specialist";

    document.getElementById("doctor-name").textContent = doctorName;
    document.getElementById("doctor-meta").textContent =
      formatDoctorMeta(doctor);

    document.getElementById("total-patients-strip").textContent =
      (stats.totalPatients || 0) + " Total Patients";

    document.getElementById("appointments-done-strip").textContent =
      (stats.completedAppointments || 0) + " Appointments Done";

    document.getElementById("patients-badge").textContent =
      stats.totalPatients || 0;

    document.getElementById("stat-today-appointments").textContent =
      stats.todayAppointments || 0;
    document.getElementById("stat-pending-requests").textContent =
      stats.pendingRequests || 0;
    document.getElementById("stat-total-patients").textContent =
      stats.totalPatients || 0;
    document.getElementById("stat-monthly-earnings").textContent = formatMoney(
      stats.monthlyEarnings || 0
    );

    renderSchedule(data.todaySchedule || []);
  } catch (error) {
    showToast("Cannot connect to backend server", "error");
  }
}

loadDoctorDashboard();