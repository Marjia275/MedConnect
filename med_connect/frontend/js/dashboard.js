const API_BASE_URL = "http://localhost:5000/api/patient";
function toggleDrawer() {
          var isOpen = document.querySelector('.sidebar').classList.contains('drawer-open');
          if (isOpen) {
            closeDrawer();
          } else {
            openDrawer();
          }
        }
        function openDrawer() {
          document.getElementById('hamburger-btn').textContent = '✕';
          document.querySelector('.sidebar').classList.add('drawer-open');
          document.getElementById('drawer-overlay').classList.add('show');
        }
        function closeDrawer() {
          document.getElementById('hamburger-btn').textContent = '☰';
          document.querySelector('.sidebar').classList.remove('drawer-open');
          document.getElementById('drawer-overlay').classList.remove('show');
        }
        function confirmLogout(e) {
            e.preventDefault();
            document.getElementById('logout-modal').classList.add('show');
        }
        function closeLogoutModal() {
          document.getElementById('logout-modal').classList.remove('show');
        }
      var sidebarItems = document.querySelectorAll('.sidebar-item');
      sidebarItems.forEach(function(item) {
        item.addEventListener('click', function() {
          sidebarItems.forEach(function(i) { i.classList.remove('active'); });
          item.classList.add('active');
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
      document.getElementById("today-date").textContent =
        days[now.getDay()] +
        ", " +
        now.getDate() +
        " " +
        months[now.getMonth()] +
        " " +
        now.getFullYear() +
        " · Here's your health overview";

      function toggleRecord(header) {
        var body = header.nextElementSibling;
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

     document.addEventListener("DOMContentLoaded", function () {
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
      return;
    }

    var response = await fetch(`${API_BASE_URL}/dashboard/${storedUser.id}`);
    var data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load dashboard");
    }

    renderPatientDashboard(data);
  } catch (error) {
    console.error(error);
  }
}

function renderPatientDashboard(data) {
  var patient = data.patient || {};
  var stats = data.stats || {};

  var fullName = `${patient.firstName || ""} ${patient.lastName || ""}`.trim();
  var firstName = patient.firstName || "Patient";

  setText("patientName", fullName);
  setText("patientNameSidebar", fullName);
  setText("patientGreetingName", firstName);
  setText("patientProfileName", fullName);

  setText("patientId", patient._id || "-");
  setText("patientLocation", `${patient.city || ""} ${patient.country || ""}`.trim() || "-");

  setText("profileCompletion", `${stats.profileCompletion || 0}%`);
  setText("totalAppointments", stats.totalAppointments || 0);
  setText("upcomingAppointments", stats.upcomingAppointments || 0);
  setText("completedAppointments", stats.completedAppointments || 0);
}

function setText(id, value) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

