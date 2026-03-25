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

document.getElementById("today-date").textContent =
  days[now.getDay()] +
  ", " +
  now.getDate() +
  " " +
  months[now.getMonth()] +
  " " +
  now.getFullYear() +
  " · Today you have 8 appointments";
document.getElementById("schedule-date").textContent =
  now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();

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
