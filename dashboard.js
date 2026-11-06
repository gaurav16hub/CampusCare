// CAMPUSCARE STUDENT DASHBOARD

// Check login session
const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {
    window.location.href = "login.html";
}

// Display student name
if (loggedInUser) {

    document.getElementById("studentName").textContent =
        loggedInUser.name;

    loadDashboard();
}


// Load complaint statistics
function loadDashboard() {

    const allComplaints = JSON.parse(
        localStorage.getItem("complaints")
    ) || [];

    // Show only current student's complaints
    const complaints = allComplaints.filter(
        complaint => complaint.email === loggedInUser.email
    );

    const pending = complaints.filter(
        complaint => complaint.status === "Pending"
    ).length;

    const resolved = complaints.filter(
        complaint => complaint.status === "Resolved"
    ).length;

    document.getElementById("totalComplaints").textContent =
        complaints.length;

    document.getElementById("pendingComplaints").textContent =
        pending;

    document.getElementById("resolvedComplaints").textContent =
        resolved;

    // Recent complaints
    const recentContainer =
        document.getElementById("recentComplaints");

    if (complaints.length === 0) {

        recentContainer.innerHTML =
            "<p>No complaints submitted yet.</p>";

    } else {

        recentContainer.innerHTML = "";

        complaints.slice(-3).reverse().forEach(complaint => {

            const item = document.createElement("div");
            item.className = "recent-complaint";

            const title = document.createElement("h3");
            title.textContent = complaint.title;

            const status = document.createElement("p");
            status.textContent = "Status: " + complaint.status;

            item.appendChild(title);
            item.appendChild(status);

            recentContainer.appendChild(item);

        });

    }

}


// Logout function
function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

}