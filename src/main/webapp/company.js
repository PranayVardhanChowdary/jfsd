// Function to make an API call
function callApi(METHOD, URL, DATA, SUCCESS) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(METHOD, URL, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        SUCCESS(this.responseText);
      } else {
        alert("Error: " + this.status + " " + this.statusText);
      }
    }
  };

  xhttp.onerror = function () {
    alert("Error: Network error");
  };

  xhttp.send(DATA);
}

// Function to add a job posting
function addJob() {
    var jobname = document.getElementById("jobname").value;
    var joblocation = document.getElementById("joblocation").value;
    var jobdescription = document.getElementById("jobdescription").value;

    var jobData = {
        jobname: jobname,
        joblocation: joblocation,
        jobdescription: jobdescription // Fix the typo here
    };

    var jsonData = JSON.stringify(jobData);

    // Define the API URL where your microservice is hosted
    var apiUrl = 'http://localhost:8080/jobs/save'; // Replace with your actual API URL

    // Make a POST request to the microservice
    callApi('POST', apiUrl, jsonData, function (response) {
        // Handle the response from the microservice
        var result = JSON.parse(response);
        if (result.status === 'Data inserted successfully') {
            alert('Job posting added successfully');
        } else {
            alert('Failed to add job posting: ' + result.message);
        }
    });
}
