document.addEventListener("DOMContentLoaded", function () {
    var tabButtons = document.querySelectorAll(".tab-button");
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");
    var formTitle = document.getElementById("formTitle");
    var formSubtitle = document.getElementById("formSubtitle");
    var authMessage = document.getElementById("authMessage");
    var registerRole = document.getElementById("registerRole");
    var specialtyField = document.getElementById("specialtyField");
    var navLinks = document.querySelectorAll(".nav-link");
    var tabPills = document.querySelectorAll(".tab-pill");

    var homeSection = document.getElementById("home");
    var doctorsSection = document.getElementById("doctors");
    var servicesSection = document.getElementById("services");
    var contactSection = document.getElementById("contact");

    var sections = [homeSection, doctorsSection, servicesSection, contactSection];

    var loginSubmitButton = null;
    var registerSubmitButton = null;
    var authDisabled = true;

    if (loginForm) {
        loginSubmitButton = loginForm.querySelector('button[type="submit"], input[type="submit"]');
    }

    if (registerForm) {
        registerSubmitButton = registerForm.querySelector('button[type="submit"], input[type="submit"]');
    }

    function showMessage(text, type) {
        if (!authMessage) return;

        authMessage.textContent = text;
        authMessage.classList.remove("info", "success", "error");

        if (type === "success") {
            authMessage.classList.add("success");
        } else if (type === "error") {
            authMessage.classList.add("error");
        } else {
            authMessage.classList.add("info");
        }
    }

    function disableButtons() {
        if (loginSubmitButton) {
            loginSubmitButton.disabled = true;
            loginSubmitButton.textContent = "Sign In";
        }

        if (registerSubmitButton) {
            registerSubmitButton.disabled = true;
            registerSubmitButton.textContent = "Create Account";
        }
    }

    function switchTab(tabName) {
        var i;

        for (i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove("active");
        }

        for (i = 0; i < tabButtons.length; i++) {
            if (tabButtons[i].getAttribute("data-tab") === tabName) {
                tabButtons[i].classList.add("active");
            }
        }

        if (loginForm) {
            if (tabName === "login") {
                loginForm.classList.add("active");
            } else {
                loginForm.classList.remove("active");
            }
        }

        if (registerForm) {
            if (tabName === "register") {
                registerForm.classList.add("active");
            } else {
                registerForm.classList.remove("active");
            }
        }

        if (tabName === "login") {
            if (formTitle) {
                formTitle.textContent = "Welcome Back";
            }

            if (formSubtitle) {
                formSubtitle.textContent = "Sign in to continue to your dashboard.";
            }
        } else {
            if (formTitle) {
                formTitle.textContent = "Create Account";
            }

            if (formSubtitle) {
                formSubtitle.textContent = "Register to get started with MedConnect.";
            }
        }

        showMessage("", "info");
    }

    function toggleSpecialty() {
        if (!registerRole || !specialtyField) return;

        if (registerRole.value === "doctor") {
            specialtyField.classList.add("visible");
        } else {
            specialtyField.classList.remove("visible");
        }
    }

    function setActiveNav(id) {
        var i;

        for (i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove("active");

            if (navLinks[i].getAttribute("href") === "#" + id) {
                navLinks[i].classList.add("active");
            }
        }
    }

    function updateNavOnScroll() {
        var currentSection = "home";
        var i;

        for (i = 0; i < sections.length; i++) {
            if (sections[i]) {
                var sectionTop = sections[i].offsetTop - 200;
                var sectionHeight = sections[i].offsetHeight;

                if (
                    window.pageYOffset >= sectionTop &&
                    window.pageYOffset < sectionTop + sectionHeight
                ) {
                    currentSection = sections[i].id;
                }
            }
        }

        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 5) {
            currentSection = "contact";
        }

        setActiveNav(currentSection);
    }

    function setupDoctorTabs() {
        var i;

        for (i = 0; i < tabPills.length; i++) {
            tabPills[i].addEventListener("click", function () {
                var j;

                for (j = 0; j < tabPills.length; j++) {
                    tabPills[j].classList.remove("active");
                }

                this.classList.add("active");
            });
        }
    }

    var i;

    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].addEventListener("click", function () {
            var tabName = this.getAttribute("data-tab");
            switchTab(tabName);
        });
    }

    if (registerRole) {
        registerRole.addEventListener("change", toggleSpecialty);
        toggleSpecialty();
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (authDisabled) {
                showMessage("Sign in is currently disabled.", "error");
            } else {
                showMessage("Frontend demo only. Sign in action is not connected to a server.", "success");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (authDisabled) {
                showMessage("Create account is currently disabled.", "error");
            } else {
                registerForm.reset();
                toggleSpecialty();
                switchTab("login");
                showMessage("Frontend demo only. Registration form submitted.", "success");
            }
        });
    }

    setupDoctorTabs();
    disableButtons();
    switchTab("login");
    updateNavOnScroll();

    window.addEventListener("scroll", updateNavOnScroll);
    window.addEventListener("resize", updateNavOnScroll);
    window.addEventListener("load", updateNavOnScroll);
});