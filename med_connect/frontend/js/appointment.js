

var doctors = {
  1: {
    name: 'Dr. Rafiqul Islam', spec: 'Cardiology',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#E8F6F3', degree: 'MBBS, MD', exp: 12, rating: 4.9, reviews: 128,
    fee: 800, location: 'Sylhet',
    about: 'Dr. Rafiqul Islam is a renowned Cardiologist with over 12 years of experience in treating heart diseases. He completed his MD from Dhaka Medical College and has extensive training in interventional cardiology.',
    schedule: {
      0: null,
      1: '4:00 PM – 8:00 PM',
      2: '9:00 AM – 1:00 PM',
      3: '4:00 PM – 8:00 PM',
      4: null,
      5: '9:00 AM – 2:00 PM',
      6: null
    }
  },
  2: {
    name: 'Dr. Nusrat Jahan', spec: 'Neurology',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#FFF0EB', degree: 'MBBS, FCPS', exp: 9, rating: 4.8, reviews: 94,
    fee: 1000, location: 'Dhaka',
    about: 'Dr. Nusrat Jahan is an experienced Neurologist specializing in brain and spine disorders. She completed her FCPS in Neurology from BCPS Bangladesh.',
    schedule: {
      0: '10:00 AM – 2:00 PM',
      1: null,
      2: '3:00 PM – 7:00 PM',
      3: null,
      4: '3:00 PM – 7:00 PM',
      5: '10:00 AM – 2:00 PM',
      6: null
    }
  },
  3: {
    name: 'Dr. Kamal Hossain', spec: 'Orthopedics',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#EEF2FF', degree: 'MBBS, MS', exp: 15, rating: 4.7, reviews: 76,
    fee: 700, location: 'Sylhet',
    about: 'Dr. Kamal Hossain is a Senior Orthopedic Surgeon with 15 years of experience specializing in joint replacement, sports injuries, and spinal disorders.',
    schedule: {
      0: null,
      1: '9:00 AM – 1:00 PM',
      2: null,
      3: '9:00 AM – 1:00 PM',
      4: '5:00 PM – 9:00 PM',
      5: '9:00 AM – 1:00 PM',
      6: null
    }
  },
  4: {
    name: 'Dr. Shirin Akter', spec: 'Pediatrics',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#FFF9EC', degree: 'MBBS, DCH', exp: 7, rating: 5.0, reviews: 211,
    fee: 600, location: 'Chittagong',
    about: 'Dr. Shirin Akter is a highly-rated Pediatrician specializing in child health, neonatal care, and childhood immunization.',
    schedule: {
      0: '9:00 AM – 1:00 PM',
      1: '4:00 PM – 8:00 PM',
      2: '9:00 AM – 1:00 PM',
      3: null,
      4: '4:00 PM – 8:00 PM',
      5: '9:00 AM – 1:00 PM',
      6: null
    }
  },
  5: {
    name: 'Dr. Tarek Mahmud', spec: 'Dentistry',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#F0F4FF', degree: 'BDS, MDS', exp: 10, rating: 4.6, reviews: 63,
    fee: 500, location: 'Sylhet',
    about: 'Dr. Tarek Mahmud is a skilled Dental Surgeon with expertise in cosmetic dentistry, orthodontics, and oral surgery.',
    schedule: {
      0: null,
      1: '9:00 AM – 3:00 PM',
      2: '9:00 AM – 3:00 PM',
      3: null,
      4: '9:00 AM – 3:00 PM',
      5: '9:00 AM – 3:00 PM',
      6: null
    }
  },
  6: {
    name: 'Dr. Israt Jahan', spec: 'Gastroenterologist',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#FFF0F5', degree: 'MBBS, FCPS', exp: 8, rating: 4.8, reviews: 102,
    fee: 750, location: 'Dhaka',
    about: 'Dr. Israt Jahan is an experienced Gastroenterologist with expertise in digestive disorders, liver diseases, and endoscopic procedures.',
    schedule: {
      0: '10:00 AM – 2:00 PM',
      1: null,
      2: '3:00 PM – 7:00 PM',
      3: '10:00 AM – 2:00 PM',
      4: null,
      5: '3:00 PM – 7:00 PM',
      6: null
    }
  },
  7: {
    name: 'Dr. Habibur Rahman', spec: 'Cardiology',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#E8F6F3', degree: 'MBBS, MD', exp: 18, rating: 4.9, reviews: 195,
    fee: 1200, location: 'Dhaka',
    about: 'Dr. Habibur Rahman is one of the most experienced Interventional Cardiologists in Bangladesh with 18 years of practice.',
    schedule: {
      0: null,
      1: '5:00 PM – 9:00 PM',
      2: null,
      3: '5:00 PM – 9:00 PM',
      4: '5:00 PM – 9:00 PM',
      5: '9:00 AM – 1:00 PM',
      6: null
    }
  },
  8: {
    name: 'Dr. Mahjabeen Sultana', spec: 'Neurology',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#FFF0EB', degree: 'MBBS, MD', exp: 11, rating: 4.7, reviews: 88,
    fee: 900, location: 'Rajshahi',
    about: 'Dr. Mahjabeen Sultana is a Neurologist based in Rajshahi specializing in headache disorders, migraine treatment, and memory-related conditions.',
    schedule: {
      0: '10:00 AM – 2:00 PM',
      1: '4:00 PM – 7:00 PM',
      2: null,
      3: '4:00 PM – 7:00 PM',
      4: '10:00 AM – 2:00 PM',
      5: null,
      6: null
    }
  },
  9: {
    name: 'Dr. Ferdous Ali', spec: 'Dermatology',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#FFF5EE', degree: 'MBBS, MD', exp: 6, rating: 4.5, reviews: 55,
    fee: 600, location: 'Sylhet',
    about: 'Dr. Ferdous Ali is a Dermatologist specializing in skin conditions, acne treatment, and allergies.',
    schedule: {
      0: null,
      1: '9:00 AM – 2:00 PM',
      2: '9:00 AM – 2:00 PM',
      3: null,
      4: '9:00 AM – 2:00 PM',
      5: '9:00 AM – 2:00 PM',
      6: null
    }
  },
  10: {
    name: 'Dr. Amena Khatun', spec: 'Gynecology',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#FCF0F8', degree: 'MBBS, FCPS', exp: 13, rating: 4.9, reviews: 183,
    fee: 1000, location: 'Dhaka',
    about: 'Dr. Amena Khatun is a senior Gynecologist and Obstetrician with 13 years of experience specializing in high-risk pregnancy and infertility treatment.',
    schedule: {
      0: '9:00 AM – 1:00 PM',
      1: null,
      2: '3:00 PM – 7:00 PM',
      3: '3:00 PM – 7:00 PM',
      4: null,
      5: '9:00 AM – 1:00 PM',
      6: null
    }
  },
  11: {
    name: 'Dr. Rezaul Karim', spec: 'Orthopedics',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#EEF2FF', degree: 'MBBS, MS', exp: 20, rating: 4.8, reviews: 149,
    fee: 800, location: 'Chittagong',
    about: 'Dr. Rezaul Karim is a veteran Orthopedic Surgeon with two decades of experience specializing in spine surgery and joint replacement.',
    schedule: {
      0: null,
      1: '9:00 AM – 1:00 PM',
      2: '4:00 PM – 8:00 PM',
      3: '9:00 AM – 1:00 PM',
      4: null,
      5: '9:00 AM – 1:00 PM',
      6: null
    }
  },
  12: {
    name: 'Dr. Farida Begum', spec: 'Pediatrics',
    emoji: '<i class="fa-solid fa-user-doctor"></i>',
    bg: '#FFF9EC', degree: 'MBBS, FCPS', exp: 16, rating: 4.7, reviews: 142,
    fee: 700, location: 'Sylhet',
    about: 'Dr. Farida Begum is a senior Pediatrician with 16 years of experience in child healthcare with expertise in neonatal care and pediatric allergy management.',
    schedule: {
      0: '9:00 AM – 2:00 PM',
      1: '4:00 PM – 8:00 PM',
      2: null,
      3: '4:00 PM – 8:00 PM',
      4: '9:00 AM – 2:00 PM',
      5: null,
      6: null
    }
  }
};

var selectedDate    = null;
var selectedDayName = null;
var currentDoc      = null;
var docId           = 1;

var urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('id')) docId = parseInt(urlParams.get('id'));
if (!doctors[docId]) docId = 1;
currentDoc = doctors[docId];

/* ─── Day name helpers ─── */
var DAY_NAMES  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var DAY_SHORT  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function renderDoctorProfile() {
  var doc = currentDoc;
  document.getElementById('bc-name').textContent = doc.name;
  document.title = 'Book Appointment — ' + doc.name + ' — MedConnect';

  document.getElementById('doctor-profile').innerHTML =
    '<div class="doctor-big-avatar" style="background:' + doc.bg + ';">' + doc.emoji + '</div>' +
    '<div class="doctor-profile-info">' +
      '<div class="doctor-profile-name">' + doc.name +
        '<span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verified</span>' +
      '</div>' +
      '<div class="doctor-profile-spec">' + doc.spec + '</div>' +
      '<div class="doctor-profile-degree">' + doc.degree + ' · ' + doc.exp + ' years experience · <i class="fa-solid fa-location-dot"></i> ' + doc.location + '</div>' +
      '<div class="doctor-profile-stats">' +
        '<div class="prof-stat"><span class="prof-stat-val"><i class="fa-solid fa-star" style="color:#f5a623;"></i> ' + doc.rating + '</span><span class="prof-stat-label">Rating</span></div>' +
        '<div class="prof-stat"><span class="prof-stat-val">' + doc.reviews + '</span><span class="prof-stat-label">Reviews</span></div>' +
        '<div class="prof-stat"><span class="prof-stat-val">৳' + doc.fee.toLocaleString() + '</span><span class="prof-stat-label">Consult Fee</span></div>' +
        '<div class="prof-stat"><span class="prof-stat-val">' + doc.exp + ' yrs</span><span class="prof-stat-label">Experience</span></div>' +
      '</div>' +
      '<div class="doctor-about"><h4>About</h4><p>' + doc.about + '</p></div>' +
    '</div>';

  document.getElementById('sticky-avatar').innerHTML  = doc.emoji;
  document.getElementById('sticky-avatar').style.background = doc.bg;
  document.getElementById('sticky-doc-name').textContent = doc.name;
  document.getElementById('sticky-doc-spec').textContent  = doc.spec;
  document.getElementById('sum-location').textContent     = doc.location;

  document.getElementById('fee-consult').textContent = '৳' + doc.fee.toLocaleString();
  document.getElementById('fee-total').textContent   = '৳' + (doc.fee + 30).toLocaleString();
  document.getElementById('sum-fee').textContent     = '৳' + (doc.fee + 30).toLocaleString();
}

/* ─── Build 14-day date strip ─────────────────────────────────────────────
   Dates whose day-of-week is null in the doctor's schedule are shown
   with class "unavailable" and cannot be clicked.
   This mirrors what will happen when the backend provides real schedule data.
────────────────────────────────────────────────────────────────────────── */
function renderDates() {
  var row   = document.getElementById('date-row');
  var today = new Date();
  var html  = '';

  for (var i = 0; i < 14; i++) {
    var d       = new Date(today);
    d.setDate(today.getDate() + i);
    var dayIndex  = d.getDay();          // 0=Sun … 6=Sat
    var dayShort  = DAY_SHORT[dayIndex];
    var dayNum    = d.getDate();
    var monthStr  = MONTH_NAMES[d.getMonth()];
    var isoStr    = d.toISOString().slice(0, 10);
    var dateLabel = dayShort + ', ' + dayNum + ' ' + monthStr;

    /* Is this day available in the doctor's schedule? */
    var chamberTime = currentDoc.schedule[dayIndex];
    var isAvailable = chamberTime !== null && chamberTime !== undefined;

    /* Also disable today if it's already late evening */
    var tooLate = (i === 0 && today.getHours() >= 21);

    var disabled = !isAvailable || tooLate;

    var cls = 'date-btn';
    if (disabled) cls += ' unavailable';

    html += '<button class="' + cls + '"';
    html += ' data-date="' + isoStr + '"';
    html += ' data-label="' + dateLabel + '"';
    html += ' data-day="' + dayIndex + '"';
    if (!disabled) html += ' onclick="selectDate(this)"';
    html += '>';
    html += '<span class="date-day">' + dayShort + '</span>';
    html += '<span class="date-num">' + dayNum + '</span>';
    html += '<span class="date-month">' + monthStr + '</span>';
    if (!isAvailable) {
      html += '<span class="date-unavail-label">Unavailable</span>';
    }
    html += '</button>';
  }
  row.innerHTML = html;
}

/* ─── When a date is selected ────────────────────────────────────────────
   Instead of showing individual time slots, show the chamber time card
   for that day. The chamber time comes from the doctor's schedule.
────────────────────────────────────────────────────────────────────────── */
function selectDate(el) {
  document.querySelectorAll('.date-btn').forEach(function(b) {
    b.classList.remove('selected');
  });
  el.classList.add('selected');

  selectedDate    = el.getAttribute('data-date');
  var label       = el.getAttribute('data-label');
  var dayIndex    = parseInt(el.getAttribute('data-day'));
  selectedDayName = DAY_NAMES[dayIndex];

  document.getElementById('sum-date').textContent = label;
  document.getElementById('sum-date').classList.remove('empty');

  /* Show chamber time in the sticky bar Time field */
  var chamberTime = currentDoc.schedule[dayIndex];
  document.getElementById('sum-time').textContent = chamberTime;
  document.getElementById('sum-time').classList.remove('empty');

  renderChamberTime(dayIndex, chamberTime);
  updateStep(2);
}

/* ─── Chamber time card ──────────────────────────────────────────────────
   Replaces the old individual time-slot buttons.
   Shows one card: the full time range the doctor is available that day.
────────────────────────────────────────────────────────────────────────── */
function renderChamberTime(dayIndex, chamberTime) {
  var grid = document.getElementById('slots-grid');

  grid.innerHTML =
    '<div class="chamber-time-card">' +
      '<div class="chamber-time-header">' +
        '<i class="fa-solid fa-hospital"></i>' +
        '<span>Chamber Hours — ' + DAY_NAMES[dayIndex] + '</span>' +
      '</div>' +
      '<div class="chamber-time-range">' +
        '<i class="fa-regular fa-clock"></i>' +
        '<span class="chamber-time-value">' + chamberTime + '</span>' +
      '</div>' +
     
    '</div>';
}

function updateStep(n) {
  if (n >= 2) {
    document.getElementById('step3-circle').classList.add('active');
    document.getElementById('step3-label').classList.add('active');
  }
  if (n >= 3) {
    document.getElementById('step4-circle') && document.getElementById('step4-circle').classList.add('active');
    document.getElementById('conn2').classList.add('done');
  }
}

function showConfirmModal() {
  if (!selectedDate) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please select a date first', 'error');
    return;
  }
  var name  = document.getElementById('p-name').value.trim();
  var phone = document.getElementById('p-phone').value.trim();
  if (!name || !phone) {
    showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please fill in your name and phone number', 'error');
    return;
  }

  var dateLabel   = document.getElementById('sum-date').textContent;
  var chamberTime = document.getElementById('sum-time').textContent;

  document.getElementById('modal-details').innerHTML =
    '<strong>' + currentDoc.name + '</strong> · ' + currentDoc.spec + '<br>' +
    '<i class="fa-regular fa-calendar"></i> ' + dateLabel + ' · ' + chamberTime + '<br>' +
    '<i class="fa-solid fa-location-dot"></i> ' + currentDoc.location;

  document.getElementById('confirm-modal').classList.add('show');
  document.getElementById('step4-circle').classList.add('active');
  document.getElementById('step4-label').classList.add('active');
  document.getElementById('conn3').classList.add('done');
}

function closeModal() {
  document.getElementById('confirm-modal').classList.remove('show');
  selectedDate = null;
  document.querySelectorAll('.date-btn').forEach(function(b) {
    b.classList.remove('selected');
  });
  document.getElementById('slots-grid').innerHTML =
    '<div class="slot-no-slots"><i class="fa-regular fa-hand-point-left"></i> Select a date first</div>';
  document.getElementById('sum-date').textContent = 'Not selected';
  document.getElementById('sum-time').textContent = 'Not selected';
  document.getElementById('sum-date').classList.add('empty');
  document.getElementById('sum-time').classList.add('empty');
}

function showToast(msg, type) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();
  var t = document.createElement('div');
  t.className = 'toast ' + (type || 'success');
  t.innerHTML = msg;
  document.body.appendChild(t);
  setTimeout(function() { t.classList.add('show'); }, 10);
  setTimeout(function() {
    t.classList.remove('show');
    setTimeout(function() { t.remove(); }, 400);
  }, 3000);
}

renderDoctorProfile();
renderDates();