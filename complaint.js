// CAMPUSCARE COMPLAINT SUBMISSION SYSTEM

// Check login
const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {
    window.location.href = "login.html";
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// Get complaint form
const complaintForm =
    document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", function(e) {

        e.preventDefault();

        // Get form values
        const category =
            document.getElementById("category").value;

        const title =
            document.getElementById("title").value.trim();

        const description =
            document.getElementById("description").value.trim();

        const priority =
            document.getElementById("priority").value;

        const message =
            document.getElementById("complaintMessage");

        if (!loggedInUser) return;

        // Get existing complaints
        let complaints = JSON.parse(
            localStorage.getItem("complaints")
        ) || [];

        // Create new complaint
        const newComplaint = {

            id: "CMP" + Date.now(),

            name: loggedInUser.name,

            email: loggedInUser.email,

            category: category,

            title: title,

            description: description,

            priority: priority,

            status: "Pending",

            date: new Date().toLocaleString()

        };

        // Save complaint
        complaints.push(newComplaint);

        localStorage.setItem(
            "complaints",
            JSON.stringify(complaints)
        );

        // Success message
        message.textContent =
            "Complaint submitted successfully!";

        message.style.color = "green";

        complaintForm.reset();

        // Redirect to dashboard
        setTimeout(function() {

            window.location.href = "dashboard.html";

        }, 1200);

    });

}