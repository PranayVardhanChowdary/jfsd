document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the username from local storage
    const username = localStorage.getItem('username');
    const usernameDisplay = document.querySelector('.username');
    if (username) {
        usernameDisplay.textContent = username;
    }

    // Fetch applied job IDs and then fetch job details
    fetch(`https://jfsd-production-f744.up.railway.app/jobs/applied/${username}`)
        .then(response => response.json())
        .then(appliedJobIds => {
            // Fetch job details for each applied job ID
            const jobDetailsPromises = appliedJobIds.map(jobId =>
                fetch(`https://jfsd-production-f744.up.railway.app/jobs/${jobId}`).then(response => response.json())
            );

            return Promise.all(jobDetailsPromises);
        })
        .then(appliedJobs => {
            const appliedJobListings = document.getElementById('applied-job-listings');
            appliedJobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.classList.add('job-card');
                jobCard.innerHTML = `
                    <h3>${job.title}</h3>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Description:</strong> ${job.description}</p>
                    <p><strong>Salary:</strong> ${job.salary}</p>
                `;
                appliedJobListings.appendChild(jobCard);
            });
        })
        .catch(error => console.error('Error fetching applied jobs:', error));
});