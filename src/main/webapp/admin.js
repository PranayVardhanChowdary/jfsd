document.addEventListener("DOMContentLoaded", () => {
    // Fetch the list of students
    fetch('https://jfsd-production-f744.up.railway.app/person/all')
        .then(response => response.json())
        .then(data => {
            const studentCount = document.getElementById('studentCount');
            const studentList = document.getElementById('studentList');
            studentCount.textContent = data.length;
            data.forEach(student => {
                const listItem = document.createElement('li');
                listItem.textContent = `${student.username} - ${student.email}`;
                studentList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching students:', error));

    // Fetch the list of jobs
    fetch('https://jfsd-production-f744.up.railway.app/jobs/all')
        .then(response => response.json())
        .then(data => {
            const jobCount = document.getElementById('jobCount');
            const jobList = document.getElementById('jobList');
            jobCount.textContent = data.length;
            data.forEach(job => {
                const listItem = document.createElement('li');
                listItem.textContent = `${job.title} at ${job.company} - ${job.location}`;
                jobList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});
