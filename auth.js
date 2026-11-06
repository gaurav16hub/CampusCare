// CAMPUSCARE AUTHENTICATION SYSTEM

// Registration
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("message");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match!";
            message.style.color = "red";
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            message.textContent = "Email already registered!";
            message.style.color = "red";
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            role: "student"
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        message.textContent = "Registration successful! Please login.";
        message.style.color = "green";

        registerForm.reset();

    });

}


// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (user) {

            localStorage.setItem("loggedInUser", JSON.stringify({
                name: user.name,
                email: user.email,
                role: user.role
            }));

            message.textContent = "Login successful!";
            message.style.color = "green";

// LOGIN SYSTEM

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (user) {

            localStorage.setItem("loggedInUser", JSON.stringify({
                name: user.name,
                email: user.email,
                role: user.role
            }));

            message.textContent = "Login successful!";
            message.style.color = "green";

            setTimeout(() => {

    if (user.role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "dashboard.html";
    }

    }, 700);

        } else {

            message.textContent = "Invalid email or password!";
            message.style.color = "red";

        }

    });

}           
            // Dashboard will be connected in next step

        } else {

            message.textContent = "Invalid email or password!";
            message.style.color = "red";

        }

    });

}