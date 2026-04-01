function saveSection(s) {
  if (s === "personal") {
    var city = document.getElementById("f-city").value.trim();
    if (city)
      document.getElementById("ph-loc").textContent = city + ", Bangladesh";
    showToast("✔ Personal information saved", "success");
  }

  if (s === "professional") {
    var name = document.getElementById("f-name").value.trim();
    var spec = document.getElementById("f-spec").value;
    var deg = document.getElementById("f-deg").value.trim();

    if (name) document.getElementById("ph-nm").textContent = name;
    if (spec && deg)
      document.getElementById("ph-sp").textContent = spec + " · " + deg;

    document.querySelector(".side-name").textContent =
      name || "Dr. Rafiqul Islam";
    document.querySelector(".side-role").textContent = spec || "Cardiologist";

    var navUser = document.querySelector(".nav-user");
    if (navUser) {
      navUser.childNodes.forEach(function (node) {
        if (node.nodeType === 3)
          node.textContent = " " + (name || "Dr. Rafiqul Islam");
      });
    }

    showToast("✔ Professional information saved", "success");
  }

  if (s === "availability") {
    showToast("✔ Availability schedule saved", "success");
  }
}

function toggleDay(btn) {
  var isOn = btn.classList.contains("on");
  var row = btn.closest(".avail-day-row");
  var times = row.querySelector(".avail-day-times");
  var inputs = times.querySelectorAll('input[type="time"]');

  if (isOn) {
    btn.classList.replace("on", "off");
    times.classList.add("dis");
    inputs.forEach(function (i) {
      i.disabled = true;
    });
  } else {
    btn.classList.replace("off", "on");
    times.classList.remove("dis");
    inputs.forEach(function (i) {
      i.disabled = false;
    });
  }
}

function addSlot() {
  var list = document.getElementById("avail-list");
  var row = document.createElement("div");
  row.className = "avail-row";

  row.innerHTML =
    '<div class="avail-row-inner">' +
    '<div class="avail-top-row">' +
    '<div class="day-toggle-wrap">' +
    '<button class="tog on" onclick="toggleDay(this)" type="button"></button>' +
    '<input type="date" class="inp date-inp">' +
    "</div>" +
    '<button class="del-btn" onclick="deleteSlot(this)" type="button">✕</button>' +
    "</div>" +
    '<div class="time-group">' +
    '<div class="tgrp"><label>From</label><input class="inp tinp" type="time" value="09:00" /></div>' +
    '<span class="tsep">to</span>' +
    '<div class="tgrp"><label>To</label><input class="inp tinp" type="time" value="17:00" /></div>' +
    "</div>" +
    "</div>";

  list.appendChild(row);
}

function deleteSlot(btn) {
  btn.closest(".avail-row").remove();
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
    { l: "Very Strong", c: "#1b7a3e", w: "100%" },
  ];

  var lv = levels[Math.min(score, 4)];
  bar.style.width = lv.w;
  bar.style.background = lv.c;
  txt.textContent = lv.l;
  txt.style.color = lv.c;
}

function changePassword() {
  var cur = document.getElementById("pw0").value;
  var nw = document.getElementById("pw1").value;
  var cf = document.getElementById("pw2").value;

  if (!cur) {
    showToast(" Please enter your current password", "error");
    document.getElementById("pw0").focus();
    return;
  }

  if (nw.length < 6) {
    showToast(" New password must be at least 6 characters", "error");
    document.getElementById("pw1").focus();
    return;
  }

  if (nw !== cf) {
    showToast(" Passwords do not match", "error");
    document.getElementById("pw2").focus();
    return;
  }

  document.getElementById("swrap").style.display = "none";

  showToast("✔ Password updated successfully", "success");
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
