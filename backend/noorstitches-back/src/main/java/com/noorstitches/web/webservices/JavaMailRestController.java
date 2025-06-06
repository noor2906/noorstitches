package com.noorstitches.web.webservices;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noorstitches.configuration.FormularioContacto;
import com.noorstitches.service.JavaMailService;

@RestController
@RequestMapping("/api/contacto")
public class JavaMailRestController {
	
	private static final Logger log = LoggerFactory.getLogger(JavaMailRestController.class);		

	
	@Autowired
	private JavaMailService javamailService;
	
	@PostMapping("/enviar")
	public ResponseEntity<?> enviarMail(@RequestBody FormularioContacto form) {
		
		log.info("FORMCONTACT: " + form.toString());
		
	    if (!form.isAceptaPolitica()) {
	        return ResponseEntity.badRequest()
	            .body(Map.of("error", "Debe aceptar la política de privacidad"));
	    }

	    String subject = form.getAsunto() + " - Motivo: " + form.getMotivo();
	    String body = "<!DOCTYPE html>" +
	        "<html><head><meta charset='UTF-8'></head><body style='margin: 0; padding: 0; font-family: Arial, sans-serif;'>" +
	        "<div style='max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;'>" +
	        
			 // Header
			 "<div style='background: #8457B1; padding: 30px; text-align: center;'>" +
			 "<h1 style='color: white; margin: 0; font-size: 28px;'>🧶 noorStitches 🧶</h1>" +
			 "<p style='color: white; margin: 10px 0 0 0; font-size: 16px;'>Nuevo mensaje de contacto</p>" +
			 "</div>" +
	        
	        // Contenido principal
	        "<div style='padding: 40px 30px;'>" +
	        
	        // Información del contacto
	        "<div style='background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;'>" +
	        "<h3 style='margin: 0 0 15px 0; color: #333; font-size: 18px;'>📧 Información del contacto</h3>" +
	        "<table style='width: 100%; border-collapse: collapse;'>" +
	        "<tr><td style='padding: 8px 0; font-weight: bold; color: #555; width: 80px;'>Nombre:</td><td style='padding: 8px 0; color: #333;'>" + form.getNombre() + "</td></tr>" +
	        "<tr><td style='padding: 8px 0; font-weight: bold; color: #555;'>Email:</td><td style='padding: 8px 0; color: #333;'>" + form.getEmail() + "</td></tr>" +
	        "<tr><td style='padding: 8px 0; font-weight: bold; color: #555;'>Motivo:</td><td style='padding: 8px 0; color: #333;'>" + form.getMotivo() + "</td></tr>" +
	        "</table>" +
	        "</div>" +
	        
	        // Mensaje
	        "<div style='background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 25px;'>" +
	        "<h3 style='margin: 0 0 15px 0; color: #333; font-size: 18px;'>💬 Mensaje</h3>" +
	        "<div style='line-height: 1.6; color: #555; font-size: 15px;'>" + form.getMensaje().replace("\n", "<br>") + "</div>" +
	        "</div>" +
	        
	        "</div>" +
	        
	        // Footer
	        "<div style='background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;'>" +
	        "<p style='margin: 0; color: #888; font-size: 14px;'>Este mensaje fue enviado desde el formulario de contacto de noorStitches</p>" +
	        "<p style='margin: 5px 0 0 0; color: #888; font-size: 12px;'>📅 " + java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")) + "</p>" +
	        "</div>" +
	        
	        "</div></body></html>";

	    javamailService.sendSimpleEmail("nalosag@gmail.com", subject, body, form.getEmail());

	    return ResponseEntity.ok().build();
	}


}
