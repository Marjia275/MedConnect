var doctors = [
  {
    name: "Dr. Rafiqul Islam",
    specialty: "Cardiology",
    degree: "MBBS, MD",
    experience: "12 yrs exp",
    rating: "4.9",
    reviews: "128 reviews",
    fee: "৳800",
    status: "available",
    emoji: "<i class='fa-solid fa-user-doctor' style='color: rgb(1, 24, 20);'></i>",
    bg: "#E8F6F3",
    button: "Book Now",
  },
  {
    name: "Dr. Nusrat Jahan",
    specialty: "Neurology",
    degree: "MBBS, FCPS",
    experience: "9 yrs exp",
    rating: "4.8",
    reviews: "94 reviews",
    fee: "৳1,000",
    status: "available",
    emoji: "<i class='fa-solid fa-user-doctor' style='color: rgb(0, 12, 9);'></i>",
    bg: "#E8F6F3",
    button: "Book Now",
  },
  {
    name: "Dr. Kamal Hossain",
    specialty: "Orthopedics",
    degree: "MBBS, MS",
    experience: "15 yrs exp",
    rating: "4.7",
    reviews: "76 reviews",
    fee: "৳700",
    status: "busy",
    emoji: "<i class='fa-solid fa-user-doctor' style='color: rgb(1, 24, 20);'></i>",
    bg: "#E8F6F3",
    button: "View Profile",
  },
  {
    name: "Dr. Shirin Akter",
    specialty: "Pediatrics",
    degree: "MBBS, DCH",
    experience: "7 yrs exp",
    rating: "5.0",
    reviews: "211 reviews",
    fee: "৳600",
    status: "available",
    emoji: "<i class='fa-solid fa-user-doctor' style='color: rgb(1, 24, 20);'></i>",
    bg: "#E8F6F3",
    button: "Book Now",
  },
  {
    name: "Dr. Tarek Mahmud",
    specialty: "Dentistry",
    degree: "BDS, MDS",
    experience: "10 yrs exp",
    rating: "4.6",
    reviews: "63 reviews",
    fee: "৳500",
    status: "available",
    emoji: "<i class='fa-solid fa-user-doctor' style='color: rgb(1, 24, 20);'></i>",
    bg: "#E8F6F3",
    button: "Book Now",
  },
  {
    name: "Dr. Sabrina Rahman",
    specialty: "Eye Care",
    degree: "MBBS, FCPS",
    experience: "8 yrs exp",
    rating: "4.8",
    reviews: "102 reviews",
    fee: "৳750",
    status: "available",
    emoji: "<i class='fa-solid fa-user-doctor' style='color: rgb(1, 24, 20);'></i>",
    bg: "#E8F6F3",
    button: "Book Now",
  },
  {
    name: "Dr. Habibur Rahman",
    specialty: "Cardiology",
    degree: "MBBS, MD",
    experience: "18 yrs exp",
    rating: "4.9",
    reviews: "195 reviews",
    fee: "৳1,200",
    status: "busy",
    emoji: "<i class='fa-solid fa-user-doctor' style='color: rgb(1, 24, 20);'></i>",
    bg: "#E8F6F3",
    button: "View Profile",
  },
  {
    name: "Dr. Mahjabeen Sultana",
    specialty: "Neurology",
    degree: "MBBS, MD",
    experience: "11 yrs exp",
    rating: "4.7",
    reviews: "88 reviews",
    fee: "৳900",
    status: "available",
    emoji: "<i class='fa-solid fa-user-doctor' style='color: rgb(1, 24, 20);'></i>",
    bg: "#E8F6F3",
    button: "Book Now",
  },
];

function renderDoctors(filter) {
  var grid = document.getElementById("doctorGrid");
  var html = "";

  for (var i = 0; i < doctors.length; i++) {
    var doctor = doctors[i];

    if (filter === "all" || doctor.specialty === filter) {
      var statusText = "";
      if (doctor.status === "available") {
        statusText =
          '<div class="doctor-status available">Available Today</div>';
      } else {
        statusText = '<div class="doctor-status busy">Next: Tomorrow</div>';
      }

      html += `
        <div class="doctor-card">
          <div class="doctor-avatar" style="background: ${doctor.bg};">
            ${doctor.emoji}
            <span class="avatar-dot ${doctor.status}"></span>
          </div>
          <h3>${doctor.name}</h3>
          <div class="doctor-specialty">${doctor.specialty}</div>
          <div class="doctor-meta">${doctor.degree} · ${doctor.experience}</div>
          <div class="doctor-rating">⭐ ${doctor.rating} (${doctor.reviews})</div>
          <div class="doctor-fee">Consultation: <strong>${doctor.fee}</strong></div>
          ${statusText}
          <a href="pages/register.html?mode=login" class="btn btn-primary card-btn">${doctor.button}</a>
        </div>
      `;
    }
  }

  grid.innerHTML = html;
}

function setActiveFilter(clickedButton) {
  var buttons = document.querySelectorAll(".filter-btn");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  clickedButton.classList.add("active");
}

function goToAuth(mode) {
  window.location.href = "pages/register.html?mode=" + mode;
}

function scrollToSection(id) {
  var section = document.getElementById(id);
  var navbar = document.getElementById("navbar");

  if (!section) {
    return;
  }

  var topPosition = section.offsetTop - navbar.offsetHeight - 18;

  window.scrollTo({
    top: topPosition,
    behavior: "smooth",
  });
}

function updateActiveNav() {
  var links = document.querySelectorAll(".nav-link");
  var sections = ["home", "how-it-works", "doctors", "contact"];
  var currentSection = "home";

  for (var i = 0; i < sections.length; i++) {
    var section = document.getElementById(sections[i]);

    if (section && window.pageYOffset >= section.offsetTop - 160) {
      currentSection = sections[i];
    }
  }

  for (var j = 0; j < links.length; j++) {
    var target = links[j].getAttribute("data-target");

    if (target === currentSection) {
      links[j].classList.add("active");
    } else {
      links[j].classList.remove("active");
    }
  }
}

function setupSectionLinks() {
  var links = document.querySelectorAll(".nav-section-link");
  var navLinks = document.getElementById("navLinks");

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();

      var target = this.getAttribute("data-target");
      scrollToSection(target);

      if (navLinks) {
        navLinks.classList.remove("show");
      }
    });
  }
}

function setupFilters() {
  var buttons = document.querySelectorAll(".filter-btn");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      var filter = this.getAttribute("data-filter");
      setActiveFilter(this);
      renderDoctors(filter);
    });
  }
}

function setupButtons() {
  var searchBtn = document.getElementById("searchDoctorsBtn");
  var heroFindDoctorBtn = document.getElementById("heroFindDoctorBtn");
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      goToAuth("login");
    });
  }

  if (heroFindDoctorBtn) {
    heroFindDoctorBtn.addEventListener("click", function () {
      scrollToSection("doctors");
    });
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  }
}

function updateNavbarState() {
  var navbar = document.getElementById("navbar");

  if (window.pageYOffset > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderDoctors("all");
  setupSectionLinks();
  setupFilters();
  setupButtons();
  updateNavbarState();
  updateActiveNav();

  window.addEventListener("scroll", function () {
    updateNavbarState();
    updateActiveNav();
  });
});
