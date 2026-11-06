// CAMPUSCARE ADMIN DASHBOARD
// SEARCH AND FILTER SYSTEM

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

// Admin authentication
if (!loggedInUser || loggedInUser.role !== "admin") {
    window.location.href = "login.html";
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// Get stored complaints
function getComplaints() {
    return JSON.parse(
        localStorage.getItem("complaints")
    ) || [];
}

// Main dashboard
function loadAdminDashboard() {

    const users = JSON.parse(
        localStorage.getItem("users")
    ) || [];

    const complaints = getComplaints();

    const students = users.filter(
        user => user.role === "student"
    );

    // Statistics
    document.getElementById("totalStudents").textContent =
        students.length;

    document.getElementById("totalComplaints").textContent =
        complaints.length;

    document.getElementById("pendingComplaints").textContent =
        complaints.filter(c => c.status === "Pending").length;

    document.getElementById("progressComplaints").textContent =
        complaints.filter(c => c.status === "In Progress").length;

    document.getElementById("resolvedComplaints").textContent =
        complaints.filter(c => c.status === "Resolved").length;

    displayComplaints();
}

// Search and filter
function displayComplaints() {

    const complaints = getComplaints();

    const search = document.getElementById(
        "searchComplaint"
    ).value.toLowerCase().trim();

    const category = document.getElementById(
        "filterCategory"
    ).value;

    const status = document.getElementById(
        "filterStatus"
    ).value;

    const priority = document.getElementById(
        "filterPriority"
    ).value;

    const filtered = complaints.filter(complaint => {

        const matchesSearch = [
            complaint.id,
            complaint.name,
            complaint.email,
            complaint.title
        ].some(value =>
            String(value || "").toLowerCase().includes(search)
        );

        const matchesCategory =
            !category || complaint.category === category;

        const matchesStatus =
            !status || complaint.status === status;

        const matchesPriority =
            !priority || complaint.priority === priority;

        return matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesPriority;

    });

    const table = document.getElementById(
        "adminComplaintsTable"
    );

    table.replaceChildren();

    if (filtered.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 8;
        cell.textContent = "No matching complaints found.";

        row.appendChild(cell);
        table.appendChild(row);

        return;
    }

    filtered.slice().reverse().forEach(complaint => {

        const row = document.createElement("tr");

        const values = [
            complaint.id,
            complaint.name,
            complaint.email,
            complaint.category,
            complaint.title,
            complaint.priority,
            complaint.date
        ];

        values.forEach(value => {

            const cell = document.createElement("td");
            cell.textContent = value || "N/A";

            row.appendChild(cell);

        });

        // Status dropdown
        const statusCell = document.createElement("td");
        const select = document.createElement("select");

        select.className = "status-select";

        ["Pending", "In Progress", "Resolved"].forEach(value => {

            const option = document.createElement("option");

            option.value = value;
            option.textContent = value;

            select.appendChild(option);

        });

        select.value = complaint.status || "Pending";

        select.addEventListener("change", function() {

            const allComplaints = getComplaints();

            const index = allComplaints.findIndex(
                c => c.id === complaint.id
            );

            if (index !== -1) {

                allComplaints[index].status = select.value;

                localStorage.setItem(
                    "complaints",
                    JSON.stringify(allComplaints)
                );

                loadAdminDashboard();

            }

        });

        statusCell.appendChild(select);
        row.appendChild(statusCell);

        table.appendChild(row);

    });

}

// Search listeners
document.getElementById("searchComplaint")
    .addEventListener("input", displayComplaints);

document.getElementById("filterCategory")
    .addEventListener("change", displayComplaints);

document.getElementById("filterStatus")
    .addEventListener("change", displayComplaints);

document.getElementById("filterPriority")
    .addEventListener("change", displayComplaints);

// Reset filters
document.getElementById("resetFilters")
    .addEventListener("click", function() {

        document.getElementById("searchComplaint").value = "";
        document.getElementById("filterCategory").value = "";
        document.getElementById("filterStatus").value = "";
        document.getElementById("filterPriority").value = "";

        displayComplaints();

    });

// Start dashboard
if (loggedInUser && loggedInUser.role === "admin") {
    loadAdminDashboard();
}