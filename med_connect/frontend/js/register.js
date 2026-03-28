var currentMode = "login";
var currentRole = "patient";

function showMessage(message, type) {
  var messageBox = document.getElementById("formMessage");
  messageBox.className = "form-message show " + type;
  messageBox.textContent = message;
}

function clearMessage() {
  var messageBox = document.getElementById("formMessage");
  messageBox.className = "form-message";
  messageBox.textContent = "";
}

function setMode(mode) {
  var loginForm = document.getElementById("loginForm");
  var registerForm = document.getElementById("registerForm");
  var loginSwitch = document.getElementById("loginSwitch");
  var registerSwitch = document.getElementById("registerSwitch");
  var title = document.getElementById("authTitle");
  var subtitle = document.getElementById("authSubtitle");

  currentMode = mode;
  clearMessage();

  if (mode === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginSwitch.classList.add("active");
    registerSwitch.classList.remove("active");
    title.textContent = "Welcome Back";
    subtitle.textContent = "Sign in to your MedConnect account";
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    loginSwitch.classList.remove("active");
    registerSwitch.classList.add("active");
    title.textContent = "Create Your Account";
    subtitle.textContent = "Join MedConnect with a clean, simple signup flow.";
  }

  updateDoctorFields();

  var assistantTab = document.querySelector('[data-role="assistant"]');

  if (mode === "register") {
    assistantTab.style.display = "none";
  } else {
    assistantTab.style.display = "flex";
  }
}

function setRole(role) {
  var tabs = document.querySelectorAll(".role-tab");
  currentRole = role;

  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].getAttribute("data-role") === role) {
      tabs[i].classList.add("active");
    } else {
      tabs[i].classList.remove("active");
    }
  }

  updateDoctorFields();
}

function updateDoctorFields() {
  var doctorFields = document.getElementById("doctorFields");

  if (currentMode === "register" && currentRole === "doctor") {
    doctorFields.classList.add("show");
  } else {
    doctorFields.classList.remove("show");
  }
}

function togglePassword(inputId, button) {
  var input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "🕳";
  } else {
    input.type = "password";
    button.textContent = "👁";
  }
}

function checkStrength(password) {
  var fill = document.getElementById("strengthFill");
  var text = document.getElementById("strengthText");

  var score = 0;
  var width = "0%";
  var label = "Enter a password";
  var color = "#d8e2eb";

  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (password.length === 0) {
    width = "0%";
    label = "Enter a password";
    color = "#d8e2eb";
  } else if (score === 1) {
    width = "25%";
    label = "Weak";
    color = "#d55353";
  } else if (score === 2) {
    width = "50%";
    label = "Fair";
    color = "#d39c22";
  } else if (score === 3) {
    width = "75%";
    label = "Good";
    color = "#148a7a";
  } else {
    width = "100%";
    label = "Strong";
    color = "#148a7a";
  }

  fill.style.width = width;
  fill.style.backgroundColor = color;
  text.textContent = label;
  text.style.color = color;
}

function loginUser() {
  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value.trim();

  clearMessage();

  if (email === "" || password === "") {
    showMessage("Please enter your email and password.", "error");
    return;
  }

  showMessage("Signed in successfully. Redirecting...", "success");

  setTimeout(function () {
    window.location.href = "../index.html";
  }, 1200);
}

function registerUser() {
  var firstName = document.getElementById("firstName").value.trim();
  var lastName = document.getElementById("lastName").value.trim();
  var email = document.getElementById("registerEmail").value.trim();
  var phone = document.getElementById("registerPhone").value.trim();
  var password = document.getElementById("registerPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var termsChecked = document.getElementById("termsCheck").checked;

  var doctorSpecialty = document.getElementById("doctorSpecialty").value;
  var doctorDegree = document.getElementById("doctorDegree").value.trim();
  var doctorBmdc = document.getElementById("doctorBmdc").value.trim();

  clearMessage();

  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    phone === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    showMessage("Please fill in all required fields.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  if (!termsChecked) {
    showMessage(
      "Please agree to the terms before creating an account.",
      "error",
    );
    return;
  }

  if (currentRole === "doctor") {
    if (doctorSpecialty === "" || doctorDegree === "" || doctorBmdc === "") {
      showMessage("Please complete the doctor details.", "error");
      return;
    }
  }

  showMessage("Account created successfully. Please sign in.", "success");

  setTimeout(function () {
    setMode("login");
  }, 1000);
}

function readQuery() {
  var params = new URLSearchParams(window.location.search);
  var mode = params.get("mode");
  var role = params.get("role");

  if (mode === "register") {
    setMode("register");
  } else {
    setMode("login");
  }

  if (role === "patient" || role === "doctor" || role === "assistant") {
    setRole(role);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var loginSwitch = document.getElementById("loginSwitch");
  var registerSwitch = document.getElementById("registerSwitch");
  var toRegister = document.getElementById("toRegister");
  var toLogin = document.getElementById("toLogin");
  var roleTabs = document.querySelectorAll(".role-tab");
  var toggleButtons = document.querySelectorAll(".toggle-pass");
  var registerPassword = document.getElementById("registerPassword");
  var loginBtn = document.getElementById("loginBtn");
  var registerBtn = document.getElementById("registerBtn");
  var googleLoginBtn = document.getElementById("googleLoginBtn");
  var googleRegisterBtn = document.getElementById("googleRegisterBtn");

  loginSwitch.addEventListener("click", function () {
    setMode("login");
  });

  registerSwitch.addEventListener("click", function () {
    setMode("register");
  });

  toRegister.addEventListener("click", function () {
    setMode("register");
  });

  toLogin.addEventListener("click", function () {
    setMode("login");
  });

  for (var i = 0; i < roleTabs.length; i++) {
    roleTabs[i].addEventListener("click", function () {
      var role = this.getAttribute("data-role");
      setRole(role);
    });
  }

  for (var j = 0; j < toggleButtons.length; j++) {
    toggleButtons[j].addEventListener("click", function () {
      var inputId = this.getAttribute("data-target");
      togglePassword(inputId, this);
    });
  }

  registerPassword.addEventListener("input", function () {
    checkStrength(this.value);
  });

  loginBtn.addEventListener("click", function () {
    loginUser();
  });

  registerBtn.addEventListener("click", function () {
    registerUser();
  });

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", function () {
      return;
    });
  }

  if (googleRegisterBtn) {
    googleRegisterBtn.addEventListener("click", function () {
      return;
    });
  }

  readQuery();
});
