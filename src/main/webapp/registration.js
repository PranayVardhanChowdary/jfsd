let isEmailVerified = false;

function handleEmailVerificationSuccess() {
    isEmailVerified = true;
    alert("Email sent successfully! Check your email for OTP.");
    document.getElementById("registrationMessage").textContent = "Email sent successfully!";
}

function handleEmailVerificationFailure() {
    document.getElementById("registrationMessage").textContent = "Email sending failed!";
}

document.getElementById("verifyEmailButton").addEventListener("click", function () {
    const email = document.getElementById("email").value;

    fetch(`/email/send?toEmail=${email}`)
        .then((response) => response.text())
        .then((data) => {
            if (data === "Email send successfully") {
                handleEmailVerificationSuccess();
            } else {
                handleEmailVerificationFailure();
            }
        })
        .catch((error) => {
            console.error("Error sending email:", error);
        });
});

function handleOTPVerificationSuccess() {
    alert("OTP verification successful!");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const registerAs = document.getElementById("email").value;


    fetch("/person/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
			
            username,
            password,
            email,
            
            
        }),
    })
        .then((response) => response.text())
        .then((registrationResult) => {
            alert(registrationResult);
            
             if (registrationResult === "success") {
                window.location.href = "login.html";
            }
        })
        
        .catch((error) => {
            console.error("Error registering user:", error);
        });
}

function handleOTPVerificationFailure() {
    alert("OTP verification failed!");
}

document.getElementById("verifyOTPButton").addEventListener("click", function () {
    const otp = document.getElementById("otp").value;

    fetch(`/email/verify?otp=${otp}`)
        .then((response) => response.text())
        .then((data) => {
            if (data === "OTP verification successful!") {
                handleOTPVerificationSuccess();
            } else {
                handleOTPVerificationFailure();
            }
        })
        .catch((error) => {
            console.error("Error verifying OTP:", error);
        });
});
