function callApi(METHOD, URL, DATA, SUCCESS) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(METHOD, URL, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                try {
                    var jsonResponse = JSON.parse(this.responseText);
                    SUCCESS(jsonResponse);
                } catch (e) {
                    alert("Invalid JSON response from server");
                }
            } else {
                alert("404: Service unavailable");
            }
        }
    };

    xhttp.send(DATA);
}

function login() {
    var url = "http://localhost:8080/person/login";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var userType = document.getElementById("userType").value;

    var data = JSON.stringify({ username: username, password: password });

    callApi("POST", url, data, function (response) {
        if (response.status === "success") {
            // Store user details in local storage
            localStorage.setItem("username", response.username);
            localStorage.setItem("email", response.email);
            localStorage.setItem("registerAs", response.registerAs);

            // Redirect based on user type
            if (userType === "university") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "student.html";
            }
        } else {
            alert("Login failed: " + response.message);
        }
    });
}