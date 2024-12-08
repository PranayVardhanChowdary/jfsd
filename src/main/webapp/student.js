document.addEventListener("DOMContentLoaded", () => {
    // Get modal elements
    const modal = document.getElementById('resumeModal');
    const openModalBtn = document.getElementById('upload-resume-link'); // Open modal button
    const closeModalBtn = document.getElementById('closeModalBtn'); // Close modal button
    const resumeUploadInput = document.getElementById('resume-upload');
    const uploadBtn = document.getElementById('upload-btn');
    const statusMessage = document.getElementById('status-message');

    // Display the username
    const usernameDisplay = document.querySelector('.username');
    const username = localStorage.getItem('username'); // Retrieve the username from local storage
    if (username) {
        usernameDisplay.textContent = username;
    }

    // Open the modal when the "Upload Resume" button is clicked
    openModalBtn.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the link from navigating
        modal.style.display = "block"; // Show the modal
    });

    // Close the modal when the "X" is clicked
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = "none"; // Hide the modal
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
        }
    });

    // Show Upload button after selecting a file
    resumeUploadInput.addEventListener('change', function() {
        if (resumeUploadInput.files.length > 0) {
            uploadBtn.style.display = 'inline-block'; // Show the upload button
            statusMessage.style.display = 'none'; // Hide any previous status message
        }
    });

    // Handle file upload on button click
    uploadBtn.addEventListener('click', function() {
        const file = resumeUploadInput.files[0];
        const username = localStorage.getItem('username'); // Assuming username is stored in local storage

        if (!file) {
            statusMessage.textContent = "Please select a file to upload.";
            statusMessage.classList.add('error');
            statusMessage.style.display = 'block';
            return;
        }

        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            statusMessage.textContent = "Invalid file type. Please upload a PDF or Word document.";
            statusMessage.classList.add('error');
            statusMessage.style.display = 'block';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);

        fetch('http://localhost:8080/api/files/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json().catch(() => ({ status: 'error', message: 'Invalid JSON response from server' })))
            .then(data => {
                if (data.status === 'yes') {
                    statusMessage.textContent = "Already uploaded.";
                } else {
                    statusMessage.textContent = data.message;
                }
                statusMessage.classList.remove('error');
                statusMessage.classList.add('success');
                statusMessage.style.display = 'block';
                resumeUploadInput.value = ''; // Clear the input
                uploadBtn.style.display = 'none'; // Hide the upload button
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                statusMessage.textContent = "Failed to upload the file.";
                statusMessage.classList.add('error');
                statusMessage.style.display = 'block';
            });
    });

    // Logout functionality
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', function() {
        localStorage.clear(); // Clear the local storage
        window.location.href = 'index.html'; // Redirect to index.html
    });

    // Pie Chart for Work Hours Distribution
    const ctxPie = document.getElementById('pie-chart').getContext('2d');
    const pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Project A', 'Library Work', 'Study Hours', 'Break'],
            datasets: [{
                label: 'Work Hours Distribution',
                data: [12, 8, 5, 5], // Static Data (in hours)
                backgroundColor: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        }
    });

    // Line Chart for Performance Over Time
    const ctxLine = document.getElementById('line-chart').getContext('2d');
    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // Static labels for time period
            datasets: [{
                label: 'Performance Over Time',
                data: [60, 75, 80, 90, 85], // Static performance data (percentage)
                fill: false,
                borderColor: '#2980b9',
                tension: 0.1
            }]
        }
    });
});
