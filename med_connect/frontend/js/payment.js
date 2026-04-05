var params   = new URLSearchParams(window.location.search);
var docName  = params.get('doctor') || 'Dr. Nusrat Jahan';
var docSpec  = params.get('spec')   || 'Neurologist';
var apptDate = params.get('date')   || '28 Mar 2026';
var apptTime = params.get('time')   || '7:00 PM';
var fee      = parseInt(params.get('fee') || '1000');
var total    = fee + 30;

document.getElementById('pay-doc-name').textContent   = docName;
document.getElementById('pay-doc-detail').textContent = docSpec + ' · ' + apptDate + ' · ' + apptTime;
document.getElementById('pay-fee-display').textContent = '৳' + total.toLocaleString();
document.getElementById('fee-consult-line').textContent = '৳' + fee.toLocaleString();
document.getElementById('fee-total-line').textContent   = '৳' + total.toLocaleString();

/* ── Step 1: Pay Now clicked → validate fields → show confirmation modal ── */
function openConfirmModal() {
  var txn   = document.getElementById('bkash-txn').value.trim();
  var bkNum = document.getElementById('bkash-number').value.trim();

  if (!txn) {
    showToast('⚠️ Please enter your bKash transaction ID', 'error');
    document.getElementById('bkash-txn').focus();
    return;
  }
  if (!bkNum) {
    showToast('⚠️ Please enter your bKash number', 'error');
    document.getElementById('bkash-number').focus();
    return;
  }

  /* Fill the modal summary with what the user is about to confirm */
  document.getElementById('modal-summary').innerHTML =
    '<div class="modal-summary-row"><span>Doctor</span><strong>' + docName + '</strong></div>' +
    '<div class="modal-summary-row"><span>Appointment</span><strong>' + apptDate + ' · ' + apptTime + '</strong></div>' +
    '<div class="modal-summary-row"><span>bKash TxID</span><strong>' + txn + '</strong></div>' +
    '<div class="modal-summary-row"><span>bKash Number</span><strong>' + bkNum + '</strong></div>' +
    '<div class="modal-summary-row total-row"><span>Total Paid</span><strong>৳' + total.toLocaleString() + '</strong></div>';

  document.getElementById('confirm-modal').classList.add('show');
}

function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('show');
}

/* ── User clicks Confirm & Pay in the modal → process ── */
function processPayment() {
  closeConfirmModal();

  var btn = document.getElementById('pay-btn');
  btn.textContent = '⏳ Processing...';
  btn.disabled = true;

  setTimeout(function() {
    var serial = '#' + String(Math.floor(Math.random() * 15) + 1).padStart(2, '0');
    document.getElementById('success-serial').textContent = serial;
    document.getElementById('success-appt-detail').innerHTML =
      '<strong>' + docName + '</strong> · ' + docSpec + '<br>' +
      '<i class="fa-regular fa-calendar-days" style="color: #000000"></i> ' + apptDate + ' at ' + apptTime + '<br>' +
      ' Paid: ৳' + total.toLocaleString() + ' via bKash';

    document.getElementById('pay-form-card').style.display = 'none';
    document.getElementById('appt-summary').style.display  = 'none';
    document.getElementById('success-screen').classList.add('show');

    showToast('<i class="fa-solid fa-check" style="color: rgb(1, 24, 20);"></i> Payment confirmed!', 'success');
  }, 2000);
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