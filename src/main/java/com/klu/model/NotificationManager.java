package com.klu.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationManager {
	@Autowired
	JavaMailSender mailSender; //interface 
	
	public String sendEmail(String senderEmail ,String toEmail, String subject, String msg)
	{
		try {
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setFrom(senderEmail);
			mailMessage.setTo(toEmail);
			mailMessage.setSubject(subject);
			mailMessage.setText(msg);
			
			mailSender.send(mailMessage);
			return "Email send successfully";

		}
		catch(Exception e)
		{
			return e.getMessage();
		}
		
		
		
		
	}
}
