
let allDoctors  = [];
let currentPage = 1;
const perPage   = 6;
let filteredDoctors = [];


async function fetchDoctors() {
  try {
    const res = await fetch(API.DOCTORS);
    const data = await res.json();

    const doctorsArray = Array.isArray(data) ? data : (data.doctors || []);

    allDoctors = doctorsArray.map(d => ({
      id: d.id || d._id,

   
      name: d.fullName || d.name || "Unknown Doctor",

      spec:
        d.doctorInfo?.specialty ||
        d.specialty ||
        "General",

      degree:
        d.doctorInfo?.degree ||
        d.degree ||
        "MBBS",

      exp:
        d.doctorInfo?.experience ||
        d.experience ||
        0,

      fee:
        d.doctorInfo?.consultationFee ||
        d.consultationFee ||
        0,

      chamber:
        d.doctorInfo?.chamberName ||
        d.chamberName ||
        "",

      chamberLocation:
        d.doctorInfo?.chamberAddress ||
        d.chamberAddress ||
        d.city ||
        "",

      location: d.city || d.location || "Bangladesh",

      avail: "available",

      emoji:
        '<i class="fa-solid fa-user-doctor" style="color:rgb(1,24,20)"></i>',

      rating: 4.7,
      reviews: 0,

      tags: [
        d.doctorInfo?.specialty ||
        d.specialty ||
        "General"
      ]
    }));

  } catch (err) {
    console.error("FETCH ERROR:", err);
    allDoctors = [];
  }

  readParams();
  applyFilters();
}


function applyFilters() {
  const nameQuery     = document.getElementById("q-name").value.trim().toLowerCase();
  const specialtyQuery= document.getElementById("q-spec").value;
  const locationQuery = document.getElementById("q-location").value;
  const availQuery    = document.getElementById("q-avail").value;
  const maxFee        = parseInt(document.getElementById("fee-slider").value, 10);
  const availToday    = document.getElementById("avail-today").checked;

  const selectedSpecs = [];
  document.querySelectorAll(".spec-cb:checked").forEach(cb => selectedSpecs.push(cb.value));

  const selectedExp = [];
  document.querySelectorAll(".exp-cb:checked").forEach(cb => selectedExp.push(parseInt(cb.value,10)));

  filteredDoctors = allDoctors.filter(d => {
    if (nameQuery && !d.name.toLowerCase().includes(nameQuery)) return false;
    if (specialtyQuery && d.spec !== specialtyQuery) return false;
    if (locationQuery  && d.location !== locationQuery) return false;
    if ((availQuery==="available"||availToday) && d.avail !== "available") return false;
    if (d.fee > maxFee) return false;
    if (selectedSpecs.length && !selectedSpecs.includes(d.spec)) return false;
    if (selectedExp.length && !selectedExp.some(min => d.exp >= min)) return false;
    return true;
  });

  const sortBy = document.getElementById("sort-by").value;
  if (sortBy==="rating")   filteredDoctors.sort((a,b) => b.rating - a.rating);
  if (sortBy==="fee-low")  filteredDoctors.sort((a,b) => a.fee - b.fee);
  if (sortBy==="fee-high") filteredDoctors.sort((a,b) => b.fee - a.fee);
  if (sortBy==="exp")      filteredDoctors.sort((a,b) => b.exp - a.exp);

  document.getElementById("result-count").textContent = filteredDoctors.length;
  document.getElementById("sort-info").textContent =
    "Showing " + filteredDoctors.length + " doctor" + (filteredDoctors.length !== 1 ? "s" : "");

  currentPage = 1;
  renderList();
  renderPagination();
}

function renderList() {
  const container = document.getElementById("doc-list-container");
  const start = (currentPage - 1) * perPage;
  const page  = filteredDoctors.slice(start, start + perPage);

  if (!page.length) {
    container.innerHTML = `
      <div class="no-results">
        <div style="font-size:56px;margin-bottom:16px;">😔</div>
        <h3>No doctors found</h3>
        <p>Try adjusting your filters or search terms.</p>
        <button class="btn btn-primary mt-16" onclick="clearAllFilters()">Clear All Filters</button>
      </div>`;
    return;
  }

  container.innerHTML = page.map(d => {
    const avatarBg = d.avail === "available" ? "#E8F6F3" : "#FFF8E1";
    const tagsHtml = d.tags.map(t => `<span class="doc-list-tag">${t}</span>`).join("");
    const availHtml = d.avail === "available"
      ? '<span class="doc-avail-text"><span class="dot"></span> Available Today</span>'
      : '<span class="doc-avail-text busy"><span class="dot"></span> Next: Tomorrow</span>';

    return `
      <div class="doc-list-card" onclick="window.location='appointment.html?id=${d.id}'">
        <div class="doc-list-avatar" style="background:${avatarBg}">${d.emoji}</div>
        <div class="doc-list-info">
          <div class="doc-list-name">${d.name}</div>
          <div class="doc-list-spec">${d.spec}</div>
          <div class="doc-list-meta">${d.degree} · ${d.exp} years experience</div>
          ${d.chamber ? `<div class="doc-list-chamber"><i class="fa-solid fa-hospital" style="font-size:11px;margin-right:5px"></i>${d.chamber}</div>` : ""}
          ${d.chamberLocation ? `<div class="doc-list-chamber-loc"><i class="fa-solid fa-location-dot" style="font-size:11px;margin-right:5px"></i>${d.chamberLocation}</div>` : ""}
          <div class="doc-list-tags">${tagsHtml}</div>
          ${d.reviews > 0 ? `<div class="doc-list-rating">⭐ ${d.rating} <span style="color:var(--gray);font-size:12px">(${d.reviews} reviews)</span></div>` : ""}
        </div>
        <div class="doc-list-side">
          <div class="doc-list-fee">৳${d.fee.toLocaleString()}<br><span>per visit</span></div>
          ${availHtml}
          <a href="appointment.html?id=${d.id}" class="btn ${d.avail==="available"?"btn-primary":"btn-ghost"} btn-sm">Book Now</a>
        </div>
      </div>`;
  }).join("");
}

function renderPagination() {
  const totalPages = Math.ceil(filteredDoctors.length / perPage);
  const pg = document.getElementById("pagination");
  if (totalPages <= 1) { pg.innerHTML = ""; return; }

  let html = "";
  if (currentPage > 1) html += `<button class="page-btn" onclick="goPage(${currentPage-1})">‹</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i===currentPage?"active":""}" onclick="goPage(${i})">${i}</button>`;
  }
  if (currentPage < totalPages) html += `<button class="page-btn" onclick="goPage(${currentPage+1})">›</button>`;
  pg.innerHTML = html;
}

function goPage(p) { currentPage = p; renderList(); renderPagination(); window.scrollTo({top:0,behavior:"smooth"}); }

function clearSpec() {
  document.querySelectorAll(".spec-cb").forEach(cb => cb.checked = false);
  applyFilters();
}

function clearAllFilters() {
  document.getElementById("q-name").value = "";
  document.getElementById("q-spec").value = "";
  document.getElementById("q-location").value = "";
  document.getElementById("q-avail").value = "";
  document.getElementById("fee-slider").value = 2000;
  document.getElementById("fee-label").textContent = "৳2,000";
  document.getElementById("avail-today").checked = false;
  document.querySelectorAll(".spec-cb,.exp-cb").forEach(cb => cb.checked = false);
  applyFilters();
}

function updateFee(el) {
  document.getElementById("fee-label").textContent = "৳" + parseInt(el.value,10).toLocaleString();
  applyFilters();
}

function readParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("specialty")) document.getElementById("q-spec").value = params.get("specialty");
  if (params.get("name"))      document.getElementById("q-name").value = params.get("name");
  if (params.get("location"))  document.getElementById("q-location").value = params.get("location");
}


function setNavbarUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && (user.fullName || user.name)) {
      document.getElementById("navbar-username").textContent =
        user.fullName || user.name;
    }
  } catch (err) {
    console.log(err);
  }
}


setNavbarUser();
fetchDoctors();