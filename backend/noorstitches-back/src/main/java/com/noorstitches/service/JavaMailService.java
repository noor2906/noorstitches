package com.noorstitches.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class JavaMailService {
	
	@Autowired
    private JavaMailSender mailSender;

	public void sendSimpleEmail(String to, String subject, String htmlBody, String replyTo) {
	    try {
	        MimeMessage message = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

	        helper.setTo(to);
	        helper.setSubject(subject);
	        helper.setText(htmlBody, true);

	        helper.setFrom("nalosag@gmail.com");       // Mi correo configurado
	        helper.setReplyTo(replyTo);                 // Correo del usuario

	        mailSender.send(message);
	    } catch (MessagingException e) {
	        e.printStackTrace();
	    }
	}

}
