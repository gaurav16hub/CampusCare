// CAMPUSCARE COMPLAINT TRACKING

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

// Login verification
if (!loggedInUser) {
    window.location.href = "login.html";
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// Load complaints
function loadMyComplaints() {

    const allComplaints = JSON.parse(
        localStorage.getItem("complaints")
    ) || [];

    const myComplaints = allComplaints.filter(
        complaint => complaint.email === loggedInUser.email
    );

    const pending = myComplaints.filter(
        c => c.status === "Pending"
    ).length;

    const progress = myComplaints.filter(
        c => c.status === "In Progress"
    ).length;

    const resolved = myComplaints.filter(
        c => c.status === "Resolved"
    ).length;

    document.getElementById("totalCount").textContent =
        myComplaints.length;

    document.getElementById("pendingCount").textContent =
        pending;

    document.getElementById("progressCount").textContent =
        progress;

    document.getElementById("resolvedCount").textContent =
        resolved;

    const table = document.getElementById(
        "complaintsTableBody"
    );

    table.replaceChildren();

    if (myComplaints.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 6;
        cell.textContent = "No complaints submitted yet.";

        row.appendChild(cell);
        table.appendChild(row);

        return;
    }

    myComplaints.slice().reverse().forEach(complaint => {

        const row = document.createElement("tr");

        const values = [
            complaint.id,
            complaint.title,
            complaint.category,
            complaint.priority,
            complaint.date,
            complaint.status
        ];

        values.forEach(value => {

            const cell = document.createElement("td");
            cell.textContent = value || "N/A";

            row.appendChild(cell);

        });

        table.appendChild(row);

    });

}

if (loggedInUser) {
    loadMyComplaints();
}