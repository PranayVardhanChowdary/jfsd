document.addEventListener("DOMContentLoaded", () => {
    const addJobForm = document.getElementById('addJobForm');

    addJobForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const company = document.getElementById('company').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        const salary = document.getElementById('salary').value;

        fetch('https://jfsd-production-f744.up.railway.app/jobs/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                company: company,
                location: location,
                description: description,
                salary: salary
            })
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Show a message to the user
            if (data === "Job posting saved successfully.") {
                window.location.href = 'admin.html'; // Redirect to admin dashboard
            }
        })
        .catch(error => console.error('Error adding job:', error));
    });
});