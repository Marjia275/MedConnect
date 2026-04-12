function toggleDrawer() {
  var sidebar = document.querySelector('.sidebar');
  if (sidebar.classList.contains('drawer-open')) {
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

function updateSidebar() {
  var fname    = document.getElementById('f-fname').value;
  var lname    = document.getElementById('f-lname').value;
  var phone    = document.getElementById('f-phone').value;
  var blood    = document.getElementById('f-blood').value;
  var division = document.getElementById('f-division').value;

  document.getElementById('side-name').textContent     = fname + ' ' + lname;
  document.getElementById('side-phone').textContent    = phone || '—';
  document.getElementById('side-blood').textContent    = blood || '—';
  document.getElementById('side-location').textContent = division || '—';

  var fields = ['f-fname','f-lname','f-dob','f-gender','f-blood',
                'f-phone','f-division','f-city','f-address',
                'f-height','f-weight','f-ename','f-ephone'];
  var filled = 0;
  fields.forEach(function(id) {
    var el = document.getElementById(id);
    if (el && el.value.trim() !== '') filled++;
  });
  var pct = Math.round((filled / fields.length) * 100);
  document.getElementById('completion-pct').textContent = pct + '%';
  document.getElementById('completion-fill').style.width = pct + '%';
}

function saveProfile() {
  var fname = document.getElementById('f-fname').value.trim();
  var phone = document.getElementById('f-phone').value.trim();

  if (!fname) {
    showToast('⚠️ First name cannot be empty', 'error');
    return;
  }
  if (!phone) {
    showToast('⚠️ Phone number cannot be empty', 'error');
    return;
  }

  updateSidebar();
  var banner = document.getElementById('success-banner');
  banner.classList.add('show');
  setTimeout(function() { banner.classList.remove('show'); }, 4000);
  showToast('✅ Profile saved!', 'success');
}

function resetForm() {
  if (confirm('Discard all changes and reload the page?')) {
    window.location.reload();
  }
}

function showToast(msg, type) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();
  var t = document.createElement('div');
  t.className = 'toast ' + (type || 'success');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function() { t.classList.add('show'); }, 10);
  setTimeout(function() {
    t.classList.remove('show');
    setTimeout(function() { t.remove(); }, 400);
  }, 3000);
}

updateSidebar();