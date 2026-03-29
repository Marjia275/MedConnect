const allDoctors = [
  { id: 1,  name: 'Dr. Rafiqul Islam',     spec: 'Cardiology',  emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, MD',   exp: 12, rating: 4.9, reviews: 128, fee: 800,  location: 'Sylhet',     avail: 'available', chamber: 'Ibn Sina Hospital',          chamberLocation: 'Zindabazar, Sylhet',     tags: ['Heart Specialist', 'ECG', 'Echocardiogram'] },
  { id: 2,  name: 'Dr. Nusrat Jahan',      spec: 'Neurology',   emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, FCPS', exp: 9,  rating: 4.8, reviews: 94,  fee: 1000, location: 'Dhaka',      avail: 'available', chamber: 'Square Hospital',             chamberLocation: 'Panthapath, Dhaka',      tags: ['Brain & Spine', 'Stroke', 'Epilepsy'] },
  { id: 3,  name: 'Dr. Kamal Hossain',     spec: 'Orthopedics', emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, MS',   exp: 15, rating: 4.7, reviews: 76,  fee: 700,  location: 'Sylhet',     avail: 'busy',      chamber: 'Sylhet MAG Osmani Hospital',   chamberLocation: 'Kumarpara, Sylhet',      tags: ['Bone & Joint', 'Fractures', 'Sports Injury'] },
  { id: 4,  name: 'Dr. Shirin Akter',      spec: 'Pediatrics',  emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, DCH',  exp: 7,  rating: 5.0, reviews: 211, fee: 600,  location: 'Chittagong', avail: 'available', chamber: 'Chittagong Medical College',   chamberLocation: 'K.B. Fazlul Kader Road', tags: ['Child Health', 'Vaccination', 'Growth'] },
  { id: 5,  name: 'Dr. Tarek Mahmud',      spec: 'Dentistry',   emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'BDS, MDS',   exp: 10, rating: 4.6, reviews: 63,  fee: 500,  location: 'Sylhet',     avail: 'available', chamber: 'Sylhet Dental Clinic',         chamberLocation: 'Amberkhana, Sylhet',     tags: ['Root Canal', 'Braces', 'Implants'] },
  { id: 6,  name: 'Dr. Israt Jahan',       spec: 'Eye Care',    emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, FCPS', exp: 8,  rating: 4.8, reviews: 102, fee: 750,  location: 'Dhaka',      avail: 'available', chamber: 'National Eye Care Center',     chamberLocation: 'Dhanmondi, Dhaka',       tags: ['Cataract', 'Glasses', 'Lasik'] },
  { id: 7,  name: 'Dr. Habibur Rahman',    spec: 'Cardiology',  emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, MD',   exp: 18, rating: 4.9, reviews: 195, fee: 1200, location: 'Dhaka',      avail: 'busy',      chamber: 'Apollo Hospital',              chamberLocation: 'Bashundhara, Dhaka',     tags: ['Interventional Cardiology', 'Angioplasty'] },
  { id: 8,  name: 'Dr. Mahjabeen Sultana', spec: 'Neurology',   emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, MD',   exp: 11, rating: 4.7, reviews: 88,  fee: 900,  location: 'Rajshahi',   avail: 'available', chamber: 'Rajshahi Medical College',     chamberLocation: 'Laxmipur, Rajshahi',     tags: ['Headache', 'Migraine', 'Memory'] },
  { id: 9,  name: 'Dr. Ferdous Ali',       spec: 'Dermatology', emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, MD',   exp: 6,  rating: 4.5, reviews: 55,  fee: 600,  location: 'Sylhet',     avail: 'available', chamber: 'Skin Care Clinic',             chamberLocation: 'Subhanighat, Sylhet',    tags: ['Skin', 'Acne', 'Allergy'] },
  { id: 10, name: 'Dr. Amena Khatun',      spec: 'Gynecology',  emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, FCPS', exp: 13, rating: 4.9, reviews: 183, fee: 1000, location: 'Dhaka',      avail: 'available', chamber: 'Dhaka Medical College',        chamberLocation: 'Bakshi Bazar, Dhaka',    tags: ['Pregnancy', 'Women Health', 'Infertility'] },
  { id: 11, name: 'Dr. Rezaul Karim',      spec: 'Orthopedics', emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, MS',   exp: 20, rating: 4.8, reviews: 149, fee: 800,  location: 'Chittagong', avail: 'available', chamber: 'Chittagong General Hospital',  chamberLocation: 'Pahartali, Chittagong',  tags: ['Spine Surgery', 'Joint Replacement'] },
  { id: 12, name: 'Dr. Farida Begum',      spec: 'Pediatrics',  emoji: '<i class="fa-solid fa-user-doctor" style="color: rgb(1, 24, 20);"></i>', degree: 'MBBS, FCPS', exp: 16, rating: 4.7, reviews: 142, fee: 700,  location: 'Sylhet',     avail: 'busy',      chamber: 'Sylhet Women Medical College', chamberLocation: 'Shahi Eidgah, Sylhet',   tags: ['Neonatal Care', 'Nutrition', 'Allergy'] }
];

/*
  NOTE FOR BACKEND CONNECTION:
  When backend is ready, replace the allDoctors array above with an API call.
  Each doctor object from the API should include:
  - chamber
  - chamberLocation
  - avail
  - location
*/

let currentPage = 1;
const perPage = 6;
let filteredDoctors = allDoctors.slice();

function getNumber(value) {
  return Number.parseInt(value, 10);
}

function applyFilters() {
  const nameQuery = document.getElementById('q-name').value.trim().toLowerCase();
  const specialtyQuery = document.getElementById('q-spec').value;
  const locationQuery = document.getElementById('q-location').value;
  const availabilityQuery = document.getElementById('q-avail').value;
  const maxFee = getNumber(document.getElementById('fee-slider').value);
  const availableTodayOnly = document.getElementById('avail-today').checked;

  const selectedSpecialties = [];
  document.querySelectorAll('.spec-cb:checked').forEach(function (checkbox) {
    selectedSpecialties.push(checkbox.value);
  });

  const selectedExperience = [];
  document.querySelectorAll('.exp-cb:checked').forEach(function (checkbox) {
    selectedExperience.push(getNumber(checkbox.value));
  });

  filteredDoctors = allDoctors.filter(function (doctor) {
    if (nameQuery && !doctor.name.toLowerCase().includes(nameQuery)) {
      return false;
    }

    if (specialtyQuery && doctor.spec !== specialtyQuery) {
      return false;
    }

    if (locationQuery && doctor.location !== locationQuery) {
      return false;
    }

    if ((availabilityQuery === 'available' || availableTodayOnly) && doctor.avail !== 'available') {
      return false;
    }

    if (doctor.fee > maxFee) {
      return false;
    }

    if (selectedSpecialties.length > 0 && !selectedSpecialties.includes(doctor.spec)) {
      return false;
    }

    if (selectedExperience.length > 0) {
      const matchedExperience = selectedExperience.some(function (minimumExperience) {
        return doctor.exp >= minimumExperience;
      });

      if (!matchedExperience) {
        return false;
      }
    }

    return true;
  });

  const sortBy = document.getElementById('sort-by').value;

  if (sortBy === 'rating') {
    filteredDoctors.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }

  if (sortBy === 'fee-low') {
    filteredDoctors.sort(function (a, b) {
      return a.fee - b.fee;
    });
  }

  if (sortBy === 'fee-high') {
    filteredDoctors.sort(function (a, b) {
      return b.fee - a.fee;
    });
  }

  if (sortBy === 'exp') {
    filteredDoctors.sort(function (a, b) {
      return b.exp - a.exp;
    });
  }

  document.getElementById('result-count').textContent = filteredDoctors.length;
  document.getElementById('sort-info').textContent =
    'Showing ' + filteredDoctors.length + ' doctor' + (filteredDoctors.length !== 1 ? 's' : '');

  currentPage = 1;
  renderList();
  renderPagination();
}

function renderList() {
  const container = document.getElementById('doc-list-container');
  const startIndex = (currentPage - 1) * perPage;
  const doctorsOnPage = filteredDoctors.slice(startIndex, startIndex + perPage);

  if (doctorsOnPage.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div style="font-size:56px;margin-bottom:16px;">😔</div>
        <h3>No doctors found</h3>
        <p>Try adjusting your filters or search terms.</p>
        <button class="btn btn-primary mt-16" onclick="clearAllFilters()">Clear All Filters</button>
      </div>
    `;
    return;
  }

  let html = '';

  doctorsOnPage.forEach(function (doctor) {
    const avatarBg = doctor.avail === 'available' ? '#E8F6F3' : '#FFF8E1';

    let tagsHtml = '';
    doctor.tags.forEach(function (tag) {
      tagsHtml += `<span class="doc-list-tag">${tag}</span>`;
    });

    const availabilityHtml =
      doctor.avail === 'available'
        ? '<span class="doc-avail-text"><span class="dot"></span> Available Today</span>'
        : '<span class="doc-avail-text busy"><span class="dot"></span> Next: Tomorrow</span>';

    html += `
      <div class="doc-list-card" onclick="window.location='appointment.html?id=${doctor.id}'">
        <div class="doc-list-avatar" style="background:${avatarBg};">${doctor.emoji}</div>

        <div class="doc-list-info">
          <div class="doc-list-name">${doctor.name}</div>
          <div class="doc-list-spec">${doctor.spec}</div>
          <div class="doc-list-meta">${doctor.degree} · ${doctor.exp} years experience</div>

          <div class="doc-list-chamber">
            <i class="fa-solid fa-hospital" style="font-size:11px;margin-right:5px;"></i>${doctor.chamber}
          </div>

          <div class="doc-list-chamber-loc">
            <i class="fa-solid fa-location-dot" style="font-size:11px;margin-right:5px;"></i>${doctor.chamberLocation}
          </div>

          <div class="doc-list-tags">${tagsHtml}</div>

          <div class="doc-list-rating">
            ⭐ ${doctor.rating}
            <span style="color:var(--gray);font-weight:500;font-size:12px;">(${doctor.reviews} reviews)</span>
          </div>
        </div>

        <div class="doc-list-side">
          <div class="doc-list-fee">৳${doctor.fee.toLocaleString()}<br><span>per visit</span></div>
          ${availabilityHtml}
          <a href="appointment.html?id=${doctor.id}" class="btn ${doctor.avail === 'available' ? 'btn-primary' : 'btn-ghost'} btn-sm">Book Now</a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderPagination() {
  const totalPages = Math.ceil(filteredDoctors.length / perPage);
  const paginationContainer = document.getElementById('pagination');

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let html = '';

  if (currentPage > 1) {
    html += `<button class="page-btn" onclick="goPage(${currentPage - 1})">‹</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
  }

  if (currentPage < totalPages) {
    html += `<button class="page-btn" onclick="goPage(${currentPage + 1})">›</button>`;
  }

  paginationContainer.innerHTML = html;
}

function goPage(pageNumber) {
  currentPage = pageNumber;
  renderList();
  renderPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearSpec() {
  document.querySelectorAll('.spec-cb').forEach(function (checkbox) {
    checkbox.checked = false;
  });

  applyFilters();
}

function clearAllFilters() {
  document.getElementById('q-name').value = '';
  document.getElementById('q-spec').value = '';
  document.getElementById('q-location').value = '';
  document.getElementById('q-avail').value = '';
  document.getElementById('fee-slider').value = 2000;
  document.getElementById('fee-label').textContent = '৳2,000';
  document.getElementById('avail-today').checked = false;

  document.querySelectorAll('.spec-cb').forEach(function (checkbox) {
    checkbox.checked = false;
  });

  document.querySelectorAll('.exp-cb').forEach(function (checkbox) {
    checkbox.checked = false;
  });

  applyFilters();
}

function updateFee(element) {
  document.getElementById('fee-label').textContent = '৳' + getNumber(element.value).toLocaleString();
  applyFilters();
}

function readParams() {
  const params = new URLSearchParams(window.location.search);
  const specialty = params.get('specialty');
  const name = params.get('name');
  const location = params.get('location');

  if (specialty) {
    document.getElementById('q-spec').value = specialty;
  }

  if (name) {
    document.getElementById('q-name').value = name;
  }

  if (location) {
    document.getElementById('q-location').value = location;
  }
}

readParams();
applyFilters();