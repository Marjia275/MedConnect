
const existingUser = getUser();
if (existingUser && existingUser.role === "admin") {
    window.location.href = "admin-dashboard.html";
}

function togglePw() {
    const inp = document.getElementById("password");
    const icon = document.getElementById("pw-icon");
    if (inp.type === "password") {
    inp.type = "text";
    icon.className = "fa-regular fa-eye-slash";
    } else {
    inp.type = "password";
    icon.className = "fa-regular fa-eye";
    }
}

document.addEventListener("keydown", e => {
    if (e.key === "Enter") doLogin();
});

async function doLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const btn = document.getElementById("login-btn");
    const errBox = document.getElementById("err-box");

    errBox.classList.remove("show");

    if (!email || !password) {
    errBox.textContent = "Please enter email and password.";
    errBox.classList.add("show");
    return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in...';

    try {
    const res = await fetch(`${API.ADMIN}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
        errBox.textContent = data.message || "Login failed";
        errBox.classList.add("show");
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In to Admin';
        return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "admin-dashboard.html";
    } catch {
    errBox.textContent = "Cannot connect to server. Is the backend running?";
    errBox.classList.add("show");
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In to Admin';
    }
}