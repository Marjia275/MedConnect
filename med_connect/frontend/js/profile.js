const API_BASE_URL = "https://medconnect-e8ld.onrender.com/api/patient";
var currentPatient = null;

function toggleDrawer() {
  var sidebar = document.querySelector(".sidebar");
  if (sidebar.classList.contains("drawer-open")) {
    closeDrawer();
  } else {
    openDrawer();
  }
}

function openDrawer() {
  document.getElementById("hamburger-btn").textContent = "✕";
  document.querySelector(".sidebar").classList.add("drawer-open");
  document.getElementById("drawer-overlay").classList.add("show");
}

function closeDrawer() {
  document.getElementById("hamburger-btn").textContent = "☰";
  document.querySelector(".sidebar").classList.remove("drawer-open");
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
  window.location.href = "register.html";
}

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

function formatMemberSince(dateString) {
  if (!dateString) return "—";
  var date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[date.getMonth()] + " " + date.getFullYear();
}

function setValue(id, value) {
  var el = document.getElementById(id);
  if (el) {
    el.value = value || "";
  }
}

function setText(id, value) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = value || "";
  }
}

function populateProfile(patient, profileCompletion) {
  currentPatient = patient;

  var fullName = (
    (patient.firstName || "") +
    " " +
    (patient.lastName || "")
  ).trim();

  setText("nav-user-name", fullName || "Patient");
  setText("sidebar-user-name", fullName || "Patient");
  setText("side-name", fullName || "Patient");
  setText("side-phone", patient.phone || "—");
  setText("side-blood", patient.bloodGroup || "—");
  setText("side-location", patient.country || "—");
  setText("side-patient-id", patient._id || "—");
  setText("side-member-since", formatMemberSince(patient.createdAt));

  setText("completion-pct", (profileCompletion || 0) + "%");
  document.getElementById("completion-fill").style.width =
    (profileCompletion || 0) + "%";

  setValue("f-fname", patient.firstName);
  setValue("f-lname", patient.lastName);
  setValue("f-dob", patient.dateOfBirth);
  setValue("f-gender", patient.gender);
  setValue("f-blood", patient.bloodGroup);
  setValue("f-phone", patient.phone);
  setValue("f-email", patient.email);
  setValue("f-division", patient.country);
  setValue("f-city", patient.city);
  setValue("f-address", patient.address);
  setValue("f-height", patient.height);
  setValue("f-weight", patient.weight);
  setValue("f-allergy", patient.allergies);
  setValue("f-conditions", patient.medicalConditions);
  setValue("f-ename", patient.emergencyContactName);
  setValue("f-erel", patient.emergencyContactRelationship);
  setValue("f-ephone", patient.emergencyContactPhone);

  updateSidebarPreview();
}

function updateSidebarPreview() {
  var fname = document.getElementById("f-fname").value.trim();
  var lname = document.getElementById("f-lname").value.trim();
  var phone = document.getElementById("f-phone").value.trim();
  var blood = document.getElementById("f-blood").value.trim();
  var division = document.getElementById("f-division").value.trim();

  var fullName = (fname + " " + lname).trim();

  setText("nav-user-name", fullName || "Patient");
  setText("sidebar-user-name", fullName || "Patient");
  setText("side-name", fullName || "Patient");
  setText("side-phone", phone || "—");
  setText("side-blood", blood || "—");
  setText("side-location", division || "—");
}

function validateProfileForm() {
  var fname = document.getElementById("f-fname").value.trim();
  var lname = document.getElementById("f-lname").value.trim();
  var phone = document.getElementById("f-phone").value.trim();

  if (!fname) {
    showToast("First name cannot be empty", "error");
    return false;
  }

  if (!lname) {
    showToast("Last name cannot be empty", "error");
    return false;
  }

  if (!phone) {
    showToast("Phone number cannot be empty", "error");
    return false;
  }

  return true;
}

async function loadProfile() {
  try {
    var user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "patient") {
      window.location.href = "register.html";
      return;
    }

    var response = await fetch(API_BASE_URL + "/profile/" + user.id);
    var data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Failed to load profile", "error");
      return;
    }

    populateProfile(data.patient, data.profileCompletion);
  } catch (error) {
    showToast("Cannot connect to backend server", "error");
  }
}

async function saveProfile() {
  try {
    if (!validateProfileForm()) {
      return;
    }

    var user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "patient") {
      window.location.href = "register.html";
      return;
    }

    var payload = {
      firstName: document.getElementById("f-fname").value.trim(),
      lastName: document.getElementById("f-lname").value.trim(),
      phone: document.getElementById("f-phone").value.trim(),
      gender: document.getElementById("f-gender").value,
      dateOfBirth: document.getElementById("f-dob").value,
      bloodGroup: document.getElementById("f-blood").value,
      address: document.getElementById("f-address").value.trim(),
      city: document.getElementById("f-city").value.trim(),
      country: document.getElementById("f-division").value,
      height: document.getElementById("f-height").value.trim(),
      weight: document.getElementById("f-weight").value.trim(),
      allergies: document.getElementById("f-allergy").value.trim(),
      medicalConditions: document.getElementById("f-conditions").value.trim(),
      emergencyContactName: document.getElementById("f-ename").value.trim(),
      emergencyContactRelationship: document.getElementById("f-erel").value,
      emergencyContactPhone: document.getElementById("f-ephone").value.trim(),
    };

    var response = await fetch(API_BASE_URL + "/profile/" + user.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    var data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Failed to save profile", "error");
      return;
    }

    var updatedUser = JSON.parse(localStorage.getItem("user")) || {};
    updatedUser.firstName = data.patient.firstName;
    updatedUser.lastName = data.patient.lastName;
    updatedUser.fullName = data.patient.fullName;
    updatedUser.phone = data.patient.phone;
    localStorage.setItem("user", JSON.stringify(updatedUser));

    populateProfile(data.patient, data.profileCompletion);

    var banner = document.getElementById("success-banner");
    banner.classList.add("show");
    setTimeout(function () {
      banner.classList.remove("show");
    }, 4000);

    showToast("Profile updated successfully", "success");
  } catch (error) {
    showToast("Cannot connect to backend server", "error");
  }
}

function resetForm() {
  if (confirm("Discard all changes and reload the page?")) {
    loadProfile();
  }
}

loadProfile();
