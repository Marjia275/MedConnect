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