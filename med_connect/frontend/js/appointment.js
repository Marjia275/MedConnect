var selectedDate    = null;
var selectedDayName = null;
var currentDoc      = null;  
var docId           = null; 

var DAY_NAMES  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var DAY_SHORT  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var MONTH_NAMES= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


(async function init() {


  try {
    var navUser = getUser();
    var navEl   = document.getElementById("navbar-username");
    // FIX: only show name if logged-in user is a patient (not a doctor)
    if (navEl && navUser && navUser.role === "patient") {
      navEl.textContent = navUser.fullName || navUser.name || "User";
    }
  } catch(e) {}

  var params = new URLSearchParams(window.location.search);
  docId = params.get("id");

  if (!docId) {
    showDoctorError("No doctor selected. Please go back and choose a doctor.");
    return;
  }

  try {
    var res  = await fetch(API.DOCTORS + "/" + docId);
    var data = await res.json();
    if (!res.ok || !data.doctor) throw new Error(data.message || "Doctor not found");
    currentDoc = data.doctor;
    renderDoctorProfile();
    renderDates();
  } catch(e) {
    showDoctorError("Could not load doctor details: " + e.message);
  }

 
  var user = getUser();
  if (user && user.role === "patient") {
    var pName  = document.getElementById("p-name");
    var pPhone = document.getElementById("p-phone");
    if (pName  && !pName.value)  pName.value  = user.fullName || "";
    if (pPhone && !pPhone.value) pPhone.value = user.phone   || "";
  }
})();

function showDoctorError(msg) {
  var profile = document.getElementById("doctor-profile");
  if (profile) profile.innerHTML = '<div style="color:#CC2929;padding:20px;font-weight:700">⚠ ' + msg + '</div>';
}


function renderDoctorProfile() {
  var d = currentDoc;
  var info = d.doctorInfo || {};

  document.getElementById("bc-name").textContent = "Dr. " + d.fullName;
  document.title = "Book Appointment — Dr. " + d.fullName + " — MedConnect";

  document.getElementById("doctor-profile").innerHTML =
    '<div class="doctor-big-avatar" style="background:#E8F6F3"><i class="fa-solid fa-user-doctor"></i></div>' +
    '<div class="doctor-profile-info">' +
      '<div class="doctor-profile-name">Dr. ' + d.fullName +
        '<span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified</span>' +
      '</div>' +
      '<div class="doctor-profile-spec">' + (info.specialty || "General Physician") + '</div>' +
      '<div class="doctor-profile-degree">' + (info.degree||"MBBS") + ' · ' + (info.experience||0) + ' years experience' +
        (d.city ? ' · <i class="fa-solid fa-location-dot"></i> ' + d.city : '') + '</div>' +
      '<div class="doctor-profile-stats">' +
        '<div class="prof-stat"><span class="prof-stat-val">৳' + (info.consultationFee||0).toLocaleString() + '</span><span class="prof-stat-label">Consult Fee</span></div>' +
        '<div class="prof-stat"><span class="prof-stat-val">' + (info.experience||0) + ' yrs</span><span class="prof-stat-label">Experience</span></div>' +
        '<div class="prof-stat"><span class="prof-stat-val">' + (info.maxPatientsPerDay||"—") + '</span><span class="prof-stat-label">Daily Limit</span></div>' +
      '</div>' +
      (info.about ? '<div class="doctor-about"><h4>About</h4><p>' + info.about + '</p></div>' : '') +
      (info.chamberName ? '<div class="doctor-about"><h4>Chamber</h4><p>' + info.chamberName + (info.chamberAddress ? ' · ' + info.chamberAddress : '') + '</p></div>' : '') +
    '</div>';


  var sa = document.getElementById("sticky-avatar");
  if (sa) { sa.innerHTML = '<i class="fa-solid fa-user-doctor"></i>'; sa.style.background = "#E8F6F3"; }
  var sn = document.getElementById("sticky-doc-name"); if (sn) sn.textContent = "Dr. " + d.fullName;
  var ss = document.getElementById("sticky-doc-spec"); if (ss) ss.textContent = info.specialty || "";
  var sl = document.getElementById("sum-location");    if (sl) sl.textContent = d.city || "Bangladesh";

  var fee = info.consultationFee || 0;
  var fc = document.getElementById("fee-consult"); if (fc) fc.textContent = "৳" + fee.toLocaleString();
  var ft = document.getElementById("fee-total");   if (ft) ft.textContent = "৳" + (fee+30).toLocaleString();
  var sf = document.getElementById("sum-fee");     if (sf) sf.textContent = "৳" + (fee+30).toLocaleString();
}

function renderDates() {
  var row   = document.getElementById("date-row");
  var today = new Date();
  var info  = (currentDoc && currentDoc.doctorInfo) || {};
  var avail = info.availability || [];
  var html  = "";

  for (var i = 0; i < 14; i++) {
    var d        = new Date(today);
    d.setDate(today.getDate() + i);
    var dayIdx   = d.getDay();
    var isoStr   = d.toISOString().slice(0,10);
    var label    = DAY_SHORT[dayIdx] + ", " + d.getDate() + " " + MONTH_NAMES[d.getMonth()];

    var noAvailSet = avail.length === 0 || avail.every(function(a) { return !a.enabled; });
    var slot = avail.find(function(a) {
      if (!a.day) return false;
      var dayFull  = DAY_NAMES[dayIdx].toLowerCase();
      var dayShort = DAY_SHORT[dayIdx].toLowerCase();
      var doctorDay = a.day.toLowerCase();
      return doctorDay === dayFull || doctorDay === dayShort;
    });
    var isAvailable = noAvailSet ? true : (slot && slot.enabled === true);
    var chamberTime = (slot && slot.enabled && slot.from && slot.to) ? slot.from + " – " + slot.to : "Consult doctor";
    var tooLate  = (i === 0 && today.getHours() >= 21);
    var disabled = !isAvailable || tooLate;

    html += '<button class="date-btn' + (disabled ? " unavailable" : "") + '"';
    html += ' data-date="' + isoStr + '"';
    html += ' data-label="' + label + '"';
    html += ' data-day="' + dayIdx + '"';
    html += ' data-time="' + (chamberTime || "") + '"';
    if (!disabled) html += ' onclick="selectDate(this)"';
    html += '>';
    html += '<span class="date-day">' + DAY_SHORT[dayIdx] + '</span>';
    html += '<span class="date-num">' + d.getDate() + '</span>';
    html += '<span class="date-month">' + MONTH_NAMES[d.getMonth()] + '</span>';
    if (!isAvailable) html += '<span class="date-unavail-label">Unavailable</span>';
    html += '</button>';
  }
  row.innerHTML = html;
}

function selectDate(el) {
  document.querySelectorAll(".date-btn").forEach(function(b) { b.classList.remove("selected"); });
  el.classList.add("selected");

  selectedDate    = el.getAttribute("data-date");
  var label       = el.getAttribute("data-label");
  var dayIdx      = parseInt(el.getAttribute("data-day"));
  var chamberTime = el.getAttribute("data-time") || "See doctor";
  selectedDayName = DAY_NAMES[dayIdx];

  var sd = document.getElementById("sum-date"); if (sd) { sd.textContent = label; sd.classList.remove("empty"); }
  var st = document.getElementById("sum-time"); if (st) { st.textContent = chamberTime; st.classList.remove("empty"); }

  renderChamberTime(dayIdx, chamberTime);
  updateStep(2);
}

function renderChamberTime(dayIdx, chamberTime) {
  var grid = document.getElementById("slots-grid");
  grid.innerHTML =
    '<div class="chamber-time-card">' +
      '<div class="chamber-time-header">' +
        '<i class="fa-solid fa-hospital"></i>' +
        '<span>Chamber Hours — ' + DAY_NAMES[dayIdx] + '</span>' +
      '</div>' +
      '<div class="chamber-time-range">' +
        '<i class="fa-regular fa-clock"></i>' +
        '<span class="chamber-time-value">' + chamberTime + '</span>' +
      '</div>' +
    '</div>';
}

function updateStep(n) {
  if (n >= 2) {
    var s3c = document.getElementById("step3-circle"); if (s3c) s3c.classList.add("active");
    var s3l = document.getElementById("step3-label");  if (s3l) s3l.classList.add("active");
  }
  if (n >= 3) {
    var c2 = document.getElementById("conn2"); if (c2) c2.classList.add("done");
  }
}

function showConfirmModal() {
  if (!selectedDate) { showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please select a date first', "error"); return; }
  var name  = document.getElementById("p-name").value.trim();
  var phone = document.getElementById("p-phone").value.trim();
  if (!name || !phone) { showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please fill in your name and phone number', "error"); return; }

  var info = (currentDoc && currentDoc.doctorInfo) || {};
  document.getElementById("modal-details").innerHTML =
    "<strong>Dr. " + currentDoc.fullName + "</strong> · " + (info.specialty||"") + "<br>" +
    '<i class="fa-regular fa-calendar"></i> ' + document.getElementById("sum-date").textContent +
    " · " + document.getElementById("sum-time").textContent + "<br>" +
    '<i class="fa-solid fa-location-dot"></i> ' + (currentDoc.city || "Bangladesh");

  document.getElementById("confirm-modal").classList.add("show");
  var s4c = document.getElementById("step4-circle"); if (s4c) s4c.classList.add("active");
  var s4l = document.getElementById("step4-label");  if (s4l) s4l.classList.add("active");
  var c3  = document.getElementById("conn3");        if (c3)  c3.classList.add("done");
}

function closeModal() {
  document.getElementById("confirm-modal").classList.remove("show");
  selectedDate = null;
  document.querySelectorAll(".date-btn").forEach(function(b) { b.classList.remove("selected"); });
  document.getElementById("slots-grid").innerHTML =
    '<div class="slot-no-slots"><i class="fa-regular fa-hand-point-left"></i> Select a date first</div>';
  var sd = document.getElementById("sum-date"); if (sd) { sd.textContent="Not selected"; sd.classList.add("empty"); }
  var st = document.getElementById("sum-time"); if (st) { st.textContent="Not selected"; st.classList.add("empty"); }
}


async function submitAppointment() {
  var user  = getUser();
  if (!user || user.role !== "patient") {
    showToast("Please log in as a patient to book.", "error");
    setTimeout(()=>{ window.location.href="register.html?mode=login&role=patient"; }, 1200);
    return;
  }

  var name  = document.getElementById("p-name").value.trim();
  var phone = document.getElementById("p-phone").value.trim();
  var notes = document.getElementById("p-notes") ? document.getElementById("p-notes").value.trim() : "";
  var info  = (currentDoc && currentDoc.doctorInfo) || {};
  var time  = document.getElementById("sum-time").textContent;

  var btn = document.getElementById("confirm-btn");
  if (btn) { btn.disabled = true; btn.textContent = "Booking…"; }

  try {
    var res  = await fetch(API.APPOINTMENTS, {
      method:"POST",
      headers: authHeaders(),
      body: JSON.stringify({
        doctorId:        currentDoc._id || docId,
        patientName:     name,
        patientPhone:    phone,
        appointmentDate: selectedDate,
        appointmentTime: time,
        notes:           notes
      })
    });
    var data = await res.json();
    if (!res.ok) throw new Error(data.message);

    document.getElementById("confirm-modal").classList.remove("show");
    var fee = info.consultationFee || 0;
    var params = new URLSearchParams({
      appointmentId: data.appointment._id,
      doctor:        "Dr. " + currentDoc.fullName,
      spec:          info.specialty || "",
      date:          selectedDate,
      time:          time,
      fee:           fee
    });
    window.location.href = "payment.html?" + params.toString();
  } catch(e) {
    showToast("Booking failed: " + e.message, "error");
    if (btn) { btn.disabled=false; btn.textContent="Confirm Booking"; }
  }
}

function showToast(msg, type) {
  var ex = document.querySelector(".toast"); if (ex) ex.remove();
  var t  = document.createElement("div");
  t.className = "toast " + (type || "success");
  t.innerHTML = msg;
  document.body.appendChild(t);
  setTimeout(()=>t.classList.add("show"), 10);
  setTimeout(()=>{ t.classList.remove("show"); setTimeout(()=>t.remove(), 400); }, 3000);
}