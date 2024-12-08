document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the username from local storage
    const username = localStorage.getItem('username');
    const usernameDisplay = document.querySelector('.username');
    if (username) {
        usernameDisplay.textContent = username;
    }

    // Fetch job listings and applied jobs from the server
    Promise.all([
        fetch('http://localhost:8080/jobs/all').then(response => response.json()),
        fetch(`http://localhost:8080/jobs/applied/${username}`).then(response => response.json())
    ])
    .then(([jobs, appliedJobIds]) => {
        const jobListings = document.getElementById('job-listings');
        const appliedJobListings = document.getElementById('applied-job-listings');

        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <button class="apply-btn" data-job-id="${job.id}">Apply</button>
            `;

            if (appliedJobIds.includes(job.id)) {
                jobCard.querySelector('.apply-btn').textContent = "Applied";
                jobCard.querySelector('.apply-btn').disabled = true;
                appliedJobListings.appendChild(jobCard.cloneNode(true)); // Add to applied jobs section
            } else {
                jobCard.querySelector('.apply-btn').addEventListener('click', function() {
                    const jobId = this.getAttribute('data-job-id');
                    applyForJob(username, jobId, this);
                });
            }

            jobListings.appendChild(jobCard);
        });
    })
    .catch(error => console.error('Error fetching job listings or applied jobs:', error));
});

function applyForJob(username, jobId, button) {
    fetch('http://localhost:8080/jobs/apply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, jobId: jobId })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.text();
    })
    .then(data => {
        if (data === "Application successful") {
            button.textContent = "Applied";
            button.disabled = true;
            // Move the job card to the applied jobs section
            const jobCard = button.closest('.job-card');
            const appliedJobListings = document.getElementById('applied-job-listings');
            appliedJobListings.appendChild(jobCard.cloneNode(true));
        } else if (data === "Already applied") {
            button.textContent = "Already Applied";
            button.disabled = true;
        } else {
            alert(data); // Show a message to the user
        }
    })
    .catch(error => {
        console.error('Error applying for job:', error);
        alert(error.message); // Show the error message to the user
    });
}