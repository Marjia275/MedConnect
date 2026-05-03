
const API_BASE_URL = "https://medconnect-e8ld.onrender.com/api/doctor";
var currentDoctor = null;

function formatDoctorName(name) {
  if (!name) return "Dr. Doctor";
  var cleanName = name.trim();
  if (cleanName.toLowerCase().startsWith("dr.")) {
    return cleanName;
  }
  return "Dr. " + cleanName;
}

document.addEventListener("DOMContentLoaded", function () {
  loadDoctorProfile();
});

async function loadDoctorProfile() {
  var user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "doctor") {
    showToast("Please login as doctor first", "error");
    setTimeout(function () {
      window.location.href = "./register.html?mode=login";
    }, 1200);
    return;
  }

  var doctorId = user._id || user.id;

  try {
    // FIX: now correctly hits /api/doctors/profile/:id
    var response = await fetch(API_BASE_URL + "/profile/" + doctorId);
    var data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Failed to load profile", "error");
      return;
    }

    currentDoctor = data.doctor;
    localStorage.setItem("user", JSON.stringify(data.doctor));
    fillDoctorProfile(data.doctor);
  } catch (error) {
    showToast("Cannot connect to backend server", "error");
  }
}

function fillDoctorProfile(doctor) {
  document.getElementById("f-name").value = doctor.fullName || "";
  document.getElementById("f-email").value = doctor.email || "";
  document.getElementById("f-phone").value = doctor.phone || "";
  document.getElementById("f-gender").value = doctor.gender || "Male";
  document.getElementById("f-city").value = doctor.city || "";
  document.getElementById("f-dob").value = doctor.dateOfBirth || "";

  document.getElementById("f-spec").value =
    doctor.doctorInfo?.specialty || "Cardiology";
  document.getElementById("f-deg").value = doctor.doctorInfo?.degree || "";
  document.getElementById("f-exp").value = doctor.doctorInfo?.experience || 0;
  document.getElementById("f-bmdc").value = doctor.doctorInfo?.bmdc || "";
  document.getElementById("f-fee").value =
    doctor.doctorInfo?.consultationFee || 0;
  document.getElementById("f-mp").value =
    doctor.doctorInfo?.maxPatientsPerDay || 0;
  document.getElementById("f-ch").value = doctor.doctorInfo?.chamberName || "";
  document.getElementById("f-cha").value =
    doctor.doctorInfo?.chamberAddress || "";
  document.getElementById("f-about").value = doctor.doctorInfo?.about || "";

  updateTopProfileUI(doctor);
  fillAvailability(doctor.doctorInfo?.availability || []);
}

function updateTopProfileUI(doctor) {
  var fullName = doctor.fullName || "Doctor Name";
  var specialty = doctor.doctorInfo?.specialty || "Specialist";
  var degree = doctor.doctorInfo?.degree || "";
  var city = doctor.city || "";
  var country = doctor.country || "Bangladesh";
  var experience = doctor.doctorInfo?.experience || 0;
  var chamberName = doctor.doctorInfo?.chamberName || "";
  var doctorId = doctor._id || doctor.id || "";

  var nameText = formatDoctorName(fullName);

  document.getElementById("ph-nm").textContent = nameText;
  document.getElementById("ph-sp").textContent = degree
    ? specialty + " · " + degree
    : specialty;
  document.getElementById("ph-loc").innerHTML =
    '<i class="fa-solid fa-location-dot"></i> ' +
    city +
    (city ? ", " : "") +
    country;
  document.getElementById("ph-id").textContent =
    "ID: " + doctorId.slice(-8).toUpperCase();

  var sideName = document.querySelector(".side-name");
  var sideRole = document.querySelector(".side-role");
  var navUser = document.querySelector(".nav-user");
  var bannerExp = document.querySelectorAll(".stat-val")[2];

  if (sideName) {
    sideName.textContent = nameText;
  }

  if (sideRole) {
    sideRole.textContent = specialty;
  }

  if (navUser) {
    navUser.innerHTML =
      '<div class="nav-avatar"><i class="fa-solid fa-stethoscope"></i></div>' +
      nameText;
  }

  if (bannerExp) {
    bannerExp.textContent = experience + " yrs";
  }

  if (chamberName && city) {
    document.getElementById("ph-loc").innerHTML =
      '<i class="fa-solid fa-location-dot"></i> ' + city + ", " + country;
  }
}

function fillAvailability(availability) {
  if (!availability || !availability.length) {
    return;
  }

  var rows = document.querySelectorAll(".avail-day-row");

  rows.forEach(function (row) {
    var dayCode = row.getAttribute("data-day");
    var matched = availability.find(function (item) {
      return item.day === dayCode;
    });

    if (!matched) {
      return;
    }

    var button = row.querySelector(".tog");
    var timesWrap = row.querySelector(".avail-day-times");
    var timeInputs = row.querySelectorAll('input[type="time"]');

    if (timeInputs[0]) {
      timeInputs[0].value = matched.from || "09:00";
    }

    if (timeInputs[1]) {
      timeInputs[1].value = matched.to || "17:00";
    }

    if (matched.enabled) {
      button.classList.remove("off");
      button.classList.add("on");
      timesWrap.classList.remove("dis");
      timeInputs.forEach(function (input) {
        input.disabled = false;
      });
    } else {
      button.classList.remove("on");
      button.classList.add("off");
      timesWrap.classList.add("dis");
      timeInputs.forEach(function (input) {
        input.disabled = true;
      });
    }
  });
}

function getAvailabilityData() {
  var rows = document.querySelectorAll(".avail-day-row");
  var data = [];

  rows.forEach(function (row) {
    var day = row.getAttribute("data-day");
    var enabled = row.querySelector(".tog").classList.contains("on");
    var timeInputs = row.querySelectorAll('input[type="time"]');

    data.push({
      day: day,
      enabled: enabled,
      from: timeInputs[0] ? timeInputs[0].value : "",
      to: timeInputs[1] ? timeInputs[1].value : ""
    });
  });

  return data;
}

async function saveSection(s) {
  var user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "doctor") {
    showToast("Doctor login not found", "error");
    return;
  }

  var doctorId = user._id || user.id;

  var fullName = document.getElementById("f-name").value.trim();
  var email = document.getElementById("f-email").value.trim();
  var phone = document.getElementById("f-phone").value.trim();
  var gender = document.getElementById("f-gender").value;
  var city = document.getElementById("f-city").value.trim();
  var dateOfBirth = document.getElementById("f-dob").value;

  var specialty = document.getElementById("f-spec").value;
  var degree = document.getElementById("f-deg").value.trim();
  var experience = document.getElementById("f-exp").value;
  var bmdc = document.getElementById("f-bmdc").value.trim();
  var consultationFee = document.getElementById("f-fee").value;
  var maxPatientsPerDay = document.getElementById("f-mp").value;
  var chamberName = document.getElementById("f-ch").value.trim();
  var chamberAddress = document.getElementById("f-cha").value.trim();
  var about = document.getElementById("f-about").value.trim();
  var availability = getAvailabilityData();

  if (!fullName || !email || !phone) {
    showToast("Full name, email and phone are required", "error");
    return;
  }

  try {
    // FIX: now correctly hits /api/doctors/profile/:id
    var response = await fetch(API_BASE_URL + "/profile/" + doctorId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        phone: phone,
        gender: gender,
        city: city,
        dateOfBirth: dateOfBirth,
        specialty: specialty,
        degree: degree,
        experience: experience,
        bmdc: bmdc,
        consultationFee: consultationFee,
        maxPatientsPerDay: maxPatientsPerDay,
        chamberName: chamberName,
        chamberAddress: chamberAddress,
        about: about,
        availability: availability
      })
    });

    var data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Failed to save profile", "error");
      return;
    }

    // FIX: backend now returns { message, doctor } — update local state and UI
    if (data.doctor) {
      currentDoctor = data.doctor;
      localStorage.setItem("user", JSON.stringify(data.doctor));
      fillDoctorProfile(data.doctor);
    }

    if (s === "personal") {
      showToast("Personal information saved", "success");
    } else if (s === "professional") {
      showToast("Professional information saved", "success");
    } else if (s === "availability") {
      showToast("Availability saved", "success");
    } else {
      showToast("Profile updated successfully", "success");
    }
  } catch (error) {
    showToast("Cannot connect to backend server", "error");
  }
}

function toggleDay(btn) {
  var isOn = btn.classList.contains("on");
  var row = btn.closest(".avail-day-row");
  var times = row.querySelector(".avail-day-times");
  var inputs = times.querySelectorAll('input[type="time"]');

  if (isOn) {
    btn.classList.remove("on");
    btn.classList.add("off");
    times.classList.add("dis");
    inputs.forEach(function (i) {
      i.disabled = true;
    });
  } else {
    btn.classList.remove("off");
    btn.classList.add("on");
    times.classList.remove("dis");
    inputs.forEach(function (i) {
      i.disabled = false;
    });
  }
}

function checkStrength(pw) {
  var wrap = document.getElementById("swrap");
  var bar = document.getElementById("strbar");
  var txt = document.getElementById("stext");

  if (!pw) {
    wrap.style.display = "none";
    return;
  }

  wrap.style.display = "block";

  var score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  var levels = [
    { l: "Very Weak", c: "#e74c3c", w: "20%" },
    { l: "Weak", c: "#e67e22", w: "40%" },
    { l: "Fair", c: "#f1c40f", w: "60%" },
    { l: "Strong", c: "#27ae60", w: "80%" },
    { l: "Very Strong", c: "#1b7a3e", w: "100%" }
  ];

  var lv = levels[Math.min(score, 4)];
  bar.style.width = lv.w;
  bar.style.background = lv.c;
  txt.textContent = lv.l;
  txt.style.color = lv.c;
}

async function changePassword() {
  var user = JSON.parse(localStorage.getItem("user"));
  var cur = document.getElementById("pw0").value;
  var nw = document.getElementById("pw1").value;
  var cf = document.getElementById("pw2").value;

  if (!user || user.role !== "doctor") {
    showToast("Doctor login not found", "error");
    return;
  }

  var doctorId = user._id || user.id;

  if (!cur) {
    showToast("Please enter your current password", "error");
    document.getElementById("pw0").focus();
    return;
  }

  if (nw.length < 6) {
    showToast("New password must be at least 6 characters", "error");
    document.getElementById("pw1").focus();
    return;
  }

  if (nw !== cf) {
    showToast("Passwords do not match", "error");
    document.getElementById("pw2").focus();
    return;
  }

  try {
    // FIX: now correctly hits /api/doctors/change-password/:id
    var response = await fetch(API_BASE_URL + "/change-password/" + doctorId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentPassword: cur,
        newPassword: nw
      })
    });

    var data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Failed to change password", "error");
      return;
    }

    document.getElementById("pw0").value = "";
    document.getElementById("pw1").value = "";
    document.getElementById("pw2").value = "";
    document.getElementById("swrap").style.display = "none";

    showToast("Password updated successfully", "success");
  } catch (error) {
    showToast("Cannot connect to backend server", "error");
  }
}

function togglePw(id, btn) {
  var inp = document.getElementById(id);
  if (inp.type === "password") {
    inp.type = "text";
    btn.textContent = "🕳";
  } else {
    inp.type = "password";
    btn.textContent = "👁";
  }
}

function confirmDeactivate() {
  document.getElementById("dmod").classList.add("show");
}

function closeDeactivate() {
  document.getElementById("dmod").classList.remove("show");
}

function toggleDrawer() {
  document.getElementById("sidebar").classList.contains("open")
    ? closeDrawer()
    : openDrawer();
}

function openDrawer() {
  document.getElementById("hambtn").textContent = "✕";
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("dov").classList.add("show");
}

function closeDrawer() {
  document.getElementById("hambtn").textContent = "☰";
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("dov").classList.remove("show");
}

function confirmLogout(e) {
  e.preventDefault();
  localStorage.removeItem("user");
  document.getElementById("lmod").classList.add("show");
}

function closeLogoutModal() {
  document.getElementById("lmod").classList.remove("show");
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