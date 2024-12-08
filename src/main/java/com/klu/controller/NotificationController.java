package com.klu.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klu.model.NotificationManager;

@RestController
@RequestMapping("/email")
public class NotificationController {
	
	@Autowired
	NotificationManager M;
	
	private String generatedOTP;
	
	@GetMapping("/send")
	public String send(@RequestParam("toEmail") String toEmail) {
	    // Generate a 5-digit OTP
	    generatedOTP = generateOTP();
	    
	    // Send the OTP as an email
	    String result = M.sendEmail("sakethreddygontu@gmail.com", toEmail, "OTP", "Your OTP is: " + generatedOTP);
	    
	    return result;
	}
	
	 
	@GetMapping("/verify")
    public String verifyOTP(@RequestParam("otp") String otp) {
        // Verify the provided OTP against the generated OTP
        if (otp.equals(generatedOTP)) {
            return "OTP verification successful!";
        } else {
            return "OTP verification failed!";
        }
    }

	
    // Method to generate a 5-digit OTP
    private String generateOTP() {
        Random random = new Random();
        int otp = 10000 + random.nextInt(90000); // Generates a random 5-digit number
        
        return String.valueOf(otp);
    }
}



