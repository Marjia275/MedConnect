var now = new Date();
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
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

document.getElementById("today-date").textContent =
  days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] +
  " " + now.getFullYear() + " · Today you have 8 appointments";

var patientData = {
  ayesha: {
    name: "Ayesha Khatun",
    username: "@ayesha_k",
    initial: "A",
    avatarBg: "#E8F6F3",
    avatarColor: "#0B8A75",
    age: "34 yrs",
    blood: "B+",
    gender: "Female",
    visits: "3",
    phone: "01712-345678",
    allergies: "None known",
    prescriptions: [
      {
        id: "rx-ayesha-1",
        date: "10 Jan 2026",
        byDoctor: "By You",
        status: "Completed",
        complaint: "Chest tightness on exertion",
        diagnosis: "Hypertensive Heart Disease",
        medicines: [
          {
            name: "Amlodipine",
            dose: "5mg",
            freq: "1+0+1",
            duration: "30 days",
          },
          { name: "Ramipril", dose: "5mg", freq: "0+0+1", duration: "30 days" },
        ],
        tests: "ECG, Lipid Profile, Echo",
        followup: "3 weeks · Bring Echo report",
        notes: "Low salt diet. Avoid strenuous activity. Monitor BP daily.",
      },
      {
        id: "rx-ayesha-2",
        date: "5 Oct 2025",
        byDoctor: "By You",
        status: "Completed",
        complaint: "Headache, dizziness",
        diagnosis: "Hypertension Stage I",
        medicines: [
          {
            name: "Losartan",
            dose: "50mg",
            freq: "1+0+0",
            duration: "30 days",
          },
          {
            name: "Amlodipine",
            dose: "5mg",
            freq: "0+0+1",
            duration: "30 days",
          },
        ],
        tests: "Serum Creatinine, Urine R/E",
        followup: "After 4 weeks",
        notes: "Reduce sodium intake.",
      },
    ],
  },
  mahmudul: {
    name: "Mahmudul Hasan",
    username: "@mahmudul_h",
    initial: "M",
    avatarBg: "#FFF0EB",
    avatarColor: "#F05A28",
    age: "48 yrs",
    blood: "O+",
    gender: "Male",
    visits: "1",
    phone: "01811-223344",
    allergies: "Penicillin",
    prescriptions: [
      {
        id: "rx-mahmudul-1",
        date: "5 Jan 2026",
        byDoctor: "By You",
        status: "Completed",
        complaint: "Chest pain radiating to left arm",
        diagnosis: "Stable Angina Pectoris",
        medicines: [
          {
            name: "Isosorbide Mononitrate",
            dose: "20mg",
            freq: "1+0+1",
            duration: "30 days",
          },
          { name: "Aspirin", dose: "75mg", freq: "1+0+0", duration: "30 days" },
          {
            name: "Atorvastatin",
            dose: "40mg",
            freq: "0+0+1",
            duration: "30 days",
          },
        ],
        tests: "Stress ECG, Lipid Profile, Troponin I",
        followup: "After 2 weeks · bring ECG report",
        notes: "Avoid heavy lifting. Sublingual GTN to be kept at all times.",
      },
    ],
  },
  razia: {
    name: "Razia Sultana",
    username: "@razia_s",
    initial: "R",
    avatarBg: "#eef2ff",
    avatarColor: "#5c6bc0",
    age: "55 yrs",
    blood: "A+",
    gender: "Female",
    visits: "2",
    phone: "01911-445566",
    allergies: "Aspirin",
    prescriptions: [
      {
        id: "rx-razia-1",
        date: "28 Dec 2025",
        byDoctor: "By You",
        status: "Completed",
        complaint: "Irregular heartbeat, palpitations",
        diagnosis: "Atrial Fibrillation",
        medicines: [
          {
            name: "Metoprolol",
            dose: "50mg",
            freq: "1+0+1",
            duration: "30 days",
          },
          { name: "Warfarin", dose: "5mg", freq: "0+0+1", duration: "30 days" },
        ],
        tests: "INR, Echocardiogram, Holter Monitor",
        followup: "After 2 weeks · bring INR result",
        notes: "Avoid leafy vegetables. Monitor INR weekly.",
      },
    ],
  },
  nazrul: {
    name: "Nazrul Islam",
    username: "@nazrul_i",
    initial: "N",
    avatarBg: "#fff9ec",
    avatarColor: "#b8860b",
    age: "62 yrs",
    blood: "B-",
    gender: "Male",
    visits: "4",
    phone: "01612-778899",
    allergies: "None",
    prescriptions: [
      {
        id: "rx-nazrul-1",
        date: "20 Dec 2025",
        byDoctor: "By You",
        status: "Completed",
        complaint: "Breathlessness on exertion, ankle swelling",
        diagnosis: "Heart Failure (NYHA Class II)",
        medicines: [
          {
            name: "Furosemide",
            dose: "40mg",
            freq: "1+0+0",
            duration: "30 days",
          },
          {
            name: "Digoxin",
            dose: "0.25mg",
            freq: "1+0+0",
            duration: "30 days",
          },
          {
            name: "Carvedilol",
            dose: "6.25mg",
            freq: "1+0+1",
            duration: "30 days",
          },
        ],
        tests: "Serum Electrolytes, BNP, Echo, Renal Function",
        followup: "After 1 week · urgent if worsening",
        notes:
          "Daily weight monitoring. Restrict fluid to 1.5L/day. Low sodium diet.",
      },
    ],
  },
  tanvir: {
    name: "Tanvir Ahmed",
    username: "@tanvir_a",
    initial: "T",
    avatarBg: "#E8F6F3",
    avatarColor: "#0B8A75",
    age: "39 yrs",
    blood: "AB+",
    gender: "Male",
    visits: "1",
    phone: "01512-001122",
    allergies: "None known",
    prescriptions: [],
  },
  farhana: {
    name: "Farhana Begum",
    username: "@farhana_b",
    initial: "F",
    avatarBg: "#f3e8ff",
    avatarColor: "#7c3aed",
    age: "44 yrs",
    blood: "O-",
    gender: "Female",
    visits: "1",
    phone: "01311-556677",
    allergies: "Sulfa drugs",
    prescriptions: [],
  },
  karim: {
    name: "Karim Miah",
    username: "@karim_m",
    initial: "K",
    avatarBg: "#e8f0fe",
    avatarColor: "#3a59c0",
    age: "51 yrs",
    blood: "A-",
    gender: "Male",
    visits: "1",
    phone: "01711-334455",
    allergies: "None",
    prescriptions: [],
  },
  jamal: {
    name: "Jamal Hossain",
    username: "@jamal_h",
    initial: "J",
    avatarBg: "#FFF0EB",
    avatarColor: "#F05A28",
    age: "29 yrs",
    blood: "B+",
    gender: "Male",
    visits: "1",
    phone: "01611-990011",
    allergies: "None",
    prescriptions: [],
  },
};

var currentPatientId = null;
var editingRxId = null;

function selectPatient(patientId) {
  document.querySelectorAll(".patient-card").forEach(function (c) {
    c.classList.remove("selected");
  });
  var card = document.querySelector('[data-id="' + patientId + '"]');
  if (card) card.classList.add("selected");

  currentPatientId = patientId;
  var p = patientData[patientId];
  if (!p) return;

  var avatar = document.getElementById("panel-avatar");
  avatar.textContent = p.initial;
  avatar.style.background = p.avatarBg;
  avatar.style.color = p.avatarColor;
  document.getElementById("panel-name").textContent = p.name;
  document.getElementById("panel-username").textContent =
    p.username + " · Patient";
  document.getElementById("panel-age").textContent = p.age;
  document.getElementById("panel-blood").textContent = p.blood;
  document.getElementById("panel-gender").textContent = p.gender;
  document.getElementById("panel-visits").textContent = p.visits;
  document.getElementById("panel-phone").textContent = p.phone;
  document.getElementById("panel-allergies").textContent = p.allergies;

  renderPrescriptions(patientId);

  document.getElementById("panel-empty").style.display = "none";
  document.getElementById("panel-content").style.display = "block";

  if (window.innerWidth <= 900) {
    document.getElementById("detail-panel").classList.add("panel-open");
    showPanelOverlay();
  }
}

function showPanelOverlay() {
  var overlay = document.getElementById("panel-slide-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "panel-slide-overlay";
    overlay.className = "panel-slide-overlay";
    overlay.onclick = closeDetailPanel;
    document.body.appendChild(overlay);
  }
  overlay.classList.add("show");
}

function closeDetailPanel() {
  document.getElementById("detail-panel").classList.remove("panel-open");
  var overlay = document.getElementById("panel-slide-overlay");
  if (overlay) overlay.classList.remove("show");
  document.querySelectorAll(".patient-card").forEach(function (c) {
    c.classList.remove("selected");
  });
  currentPatientId = null;
}

function renderPrescriptions(patientId) {
  var p = patientData[patientId];
  var container = document.getElementById("panel-rx-list");
  container.innerHTML = "";

  if (p.prescriptions.length === 0) {
    container.innerHTML =
      '<div style="text-align:center;padding:24px;color:#8899AA;font-size:13px;"><div style="font-size:36px;margin-bottom:8px;"></div>No prescriptions yet for this patient.</div>';
    return;
  }

  p.prescriptions.forEach(function (rx, index) {
    var acc = document.createElement("div");
    acc.className = "rx-accordion";

    var medsHtml = "";
    rx.medicines.forEach(function (med) {
      medsHtml +=
        '<div class="rx-med-row"><div class="rx-med-name">' +
        med.name +
        ' <span style="font-weight:600;color:#8899AA;">' +
        med.dose +
        '</span></div><div class="rx-med-detail">' +
        med.freq +
        " · " +
        med.duration +
        "</div></div>";
    });

    acc.innerHTML =
      '<div class="rx-acc-header' +
      (index === 0 ? " open" : "") +
      '" onclick="toggleRxAccordion(this)">' +
      '<div><div class="rx-acc-date"> ' +
      rx.date +
      '</div><div class="rx-acc-doctor">' +
      rx.byDoctor +
      "</div></div>" +
      '<span class="badge-completed">' +
      rx.status +
      "</span>" +
      '<span class="rx-acc-chevron">▼</span>' +
      "</div>" +
      '<div class="rx-acc-body' +
      (index === 0 ? " open" : "") +
      '">' +
      '<div class="rx-field-label">Diagnosis</div><div class="rx-field-val">' +
      rx.diagnosis +
      "</div>" +
      '<div class="rx-field-label">Chief Complaint</div><div class="rx-field-val">' +
      rx.complaint +
      "</div>" +
      '<div class="rx-field-label">Medicines</div><div>' +
      medsHtml +
      "</div>" +
      '<div class="rx-field-label">Tests Advised</div><div class="rx-field-val">' +
      (rx.tests || "—") +
      "</div>" +
      '<div class="rx-field-label">Follow-Up</div><div class="rx-field-val">' +
      (rx.followup || "—") +
      "</div>" +
      (rx.notes
        ? '<div class="rx-field-label">Doctor\'s Notes</div><div class="rx-field-val">' +
          rx.notes +
          "</div>"
        : "") +
      '<div class="rx-acc-actions">' +
      '<button class="btn-rx-edit" onclick="openEditRxModal(\'' +
      patientId +
      "','" +
      rx.id +
      "')\"> Edit</button>" +
      '<button class="btn-rx-dl">📄 Download PDF</button>' +
      "</div>" +
      "</div>";

    container.appendChild(acc);
  });
}

function toggleRxAccordion(header) {
  var body = header.nextElementSibling;
  var isOpen = body.classList.contains("open");
  document.querySelectorAll(".rx-acc-body").forEach(function (b) {
    b.classList.remove("open");
  });
  document.querySelectorAll(".rx-acc-header").forEach(function (h) {
    h.classList.remove("open");
  });
  if (!isOpen) {
    body.classList.add("open");
    header.classList.add("open");
  }
}

function openNewRxModal() {
  editingRxId = null;
  document.getElementById("rx-edit-id").value = "";
  document.getElementById("rx-modal-title").textContent = " New E-Prescription";
  document.getElementById("rx-modal-sub").textContent =
    "Patient: " +
    (currentPatientId
      ? patientData[currentPatientId].name
      : "Select a Patient");
  document.getElementById("rx-complaint").value = "";
  document.getElementById("rx-diagnosis").value = "";
  document.getElementById("rx-tests").value = "";
  document.getElementById("rx-followup").value = "";
  document.getElementById("rx-notes").value = "";
  resetMedRows([{}, {}, {}]);
  document.getElementById("rx-modal").classList.add("show");
}

function openEditRxModal(patientId, rxId) {
  var p = patientData[patientId];
  var rx = null;
  p.prescriptions.forEach(function (item) {
    if (item.id === rxId) rx = item;
  });
  if (!rx) return;

  editingRxId = rxId;
  currentPatientId = patientId;
  document.getElementById("rx-edit-id").value = rxId;
  document.getElementById("rx-modal-title").textContent =
    "Edit Prescription";
  document.getElementById("rx-modal-sub").textContent =
    "Patient: " + p.name + " · " + rx.date;
  document.getElementById("rx-complaint").value = rx.complaint;
  document.getElementById("rx-diagnosis").value = rx.diagnosis;
  document.getElementById("rx-tests").value = rx.tests || "";
  document.getElementById("rx-followup").value = rx.followup || "";
  document.getElementById("rx-notes").value = rx.notes || "";
  resetMedRows(rx.medicines);
  document.getElementById("rx-modal").classList.add("show");
}

function resetMedRows(medsArray) {
  document.getElementById("med-rows").innerHTML = "";
  if (medsArray.length === 0) medsArray = [{}, {}];
  medsArray.forEach(function (med) {
    addMedRow(
      med.name || "",
      med.dose || "",
      med.freq || "",
      med.duration || "",
    );
  });
}

function addMedRow(name, dose, freq, duration) {
  var row = document.createElement("div");
  row.className = "med-table-row";
  row.innerHTML =
    '<input class="form-input" placeholder="Medicine name" value="' +
    (name || "") +
    '" />' +
    '<input class="form-input" placeholder="e.g. 5mg" value="' +
    (dose || "") +
    '" />' +
    '<input class="form-input" placeholder="e.g. 1+0+1" value="' +
    (freq || "") +
    '" />' +
    '<input class="form-input" placeholder="e.g. 30 days" value="' +
    (duration || "") +
    '" />' +
    '<button class="med-remove-btn" onclick="removeMedRow(this)">✕</button>';
  document.getElementById("med-rows").appendChild(row);
}

function removeMedRow(btn) {
  var container = document.getElementById("med-rows");
  if (container.querySelectorAll(".med-table-row").length > 1) {
    btn.closest(".med-table-row").remove();
  } else {
    showToast(" At least one medicine row is required", "error");
  }
}

function savePrescription() {
  var complaint = document.getElementById("rx-complaint").value.trim();
  var diagnosis = document.getElementById("rx-diagnosis").value.trim();
  if (!complaint) {
    showToast(" Please enter the chief complaint", "error");
    return;
  }
  if (!diagnosis) {
    showToast("Please enter a diagnosis", "error");
    return;
  }

  var medicines = [];
  document.querySelectorAll("#med-rows .med-table-row").forEach(function (row) {
    var inputs = row.querySelectorAll("input");
    var name = inputs[0].value.trim();
    if (name)
      medicines.push({
        name: name,
        dose: inputs[1].value.trim(),
        freq: inputs[2].value.trim(),
        duration: inputs[3].value.trim(),
      });
  });
  if (medicines.length === 0) {
    showToast("Please add at least one medicine", "error");
    return;
  }

  var tests = document.getElementById("rx-tests").value.trim();
  var followup = document.getElementById("rx-followup").value.trim();
  var notes = document.getElementById("rx-notes").value.trim();
  var today =
    now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();

  if (!currentPatientId) {
    showToast(" Please select a patient first", "error");
    return;
  }
  var p = patientData[currentPatientId];

  if (editingRxId) {
    p.prescriptions.forEach(function (rx) {
      if (rx.id === editingRxId) {
        rx.complaint = complaint;
        rx.diagnosis = diagnosis;
        rx.medicines = medicines;
        rx.tests = tests;
        rx.followup = followup;
        rx.notes = notes;
      }
    });
    showToast("✔ Prescription updated successfully", "success");
  } else {
    var newRx = {
      id: "rx-" + currentPatientId + "-" + Date.now(),
      date: today,
      byDoctor: "By You",
      status: "Completed",
      complaint: complaint,
      diagnosis: diagnosis,
      medicines: medicines,
      tests: tests,
      followup: followup,
      notes: notes,
    };
    p.prescriptions.unshift(newRx);
    p.visits = String(parseInt(p.visits || "0") + 1);
    showToast("✔ Prescription saved for " + p.name, "success");
    addToRecentRxTable(p, newRx);
  }

  closeRxModal();
  selectPatient(currentPatientId);
}

function addToRecentRxTable(patient, rx) {
  var tbody = document.getElementById("recent-rx-tbody");
  var row = document.createElement("tr");
  row.innerHTML =
    '<td><div class="td-patient"><div class="mini-av" style="background:' +
    patient.avatarBg +
    ";color:" +
    patient.avatarColor +
    ';">' +
    patient.initial +
    "</div><strong>" +
    patient.name +
    "</strong></div></td>" +
    "<td>" +
    rx.date +
    "</td>" +
    "<td>" +
    rx.diagnosis +
    "</td>" +
    '<td style="color:#8899AA;">' +
    rx.medicines
      .map(function (m) {
        return m.name + " " + m.dose;
      })
      .join(", ") +
    "</td>" +
    '<td><button class="btn-view-rx" onclick="selectPatient(\'' +
    currentPatientId +
    "')\">View Rx</button></td>";
  tbody.insertBefore(row, tbody.firstChild);
}

function closeRxModal() {
  document.getElementById("rx-modal").classList.remove("show");
  editingRxId = null;
}

function handleRxBackdrop(event) {
  if (event.target === document.getElementById("rx-modal")) closeRxModal();
}

function searchPatients(query) {
  var q = query.toLowerCase().trim();
  var visibleCount = 0;

  document.querySelectorAll(".patient-card").forEach(function (card) {
    var name = card.getAttribute("data-name") || "";
    var show = name.toLowerCase().includes(q) || q === "";
    card.style.display = show ? "flex" : "none";
    if (show) visibleCount++;
  });

  if (q === "") {
    document.getElementById("no-results").style.display = "none";
    document.getElementById("today-patient-list").style.display = "";
    document.getElementById("recent-rx-section").style.display = "";
    document.querySelectorAll(".section-header-row").forEach(function (h) {
      h.style.display = "";
    });
  } else {
    if (visibleCount === 0) {
      document.getElementById("no-results").style.display = "block";
      document.getElementById("no-results-query").textContent = query;
    } else {
      document.getElementById("no-results").style.display = "none";
    }
    document.querySelectorAll(".section-header-row").forEach(function (h) {
      h.style.display = "none";
    });
    document.getElementById("recent-rx-section").style.display = "none";
  }
}

(function () {
  var modal = document.getElementById("rx-modal-box");
  var handle = document.getElementById("rx-drag-handle");
  if (!modal || !handle) return;
  var dragging = false,
    startX,
    startY,
    startLeft,
    startTop;
  handle.addEventListener("mousedown", function (e) {
    dragging = true;
    var rect = modal.getBoundingClientRect();
    modal.style.position = "fixed";
    modal.style.left = rect.left + "px";
    modal.style.top = rect.top + "px";
    modal.style.margin = "0";
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;
    document.body.style.userSelect = "none";
  });
  document.addEventListener("mousemove", function (e) {
    if (!dragging) return;
    modal.style.left = startLeft + e.clientX - startX + "px";
    modal.style.top = startTop + e.clientY - startY + "px";
  });
  document.addEventListener("mouseup", function () {
    dragging = false;
    document.body.style.userSelect = "";
  });
})();

function toggleDrawer() {
  var sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("drawer-open")) closeDrawer();
  else openDrawer();
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
