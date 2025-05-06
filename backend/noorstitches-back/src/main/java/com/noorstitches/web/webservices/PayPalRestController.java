package com.noorstitches.web.webservices;

import com.noorstitches.service.PayPalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paypal")
public class PayPalRestController {
	
    @Autowired
    private PayPalService payPalService;

    @PostMapping("/create")
    public String createPayment(@RequestParam String amount,
                                @RequestParam String currency,
                                @RequestParam String description) {
        try {
            return payPalService.createPayment(amount, currency, description);
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar el pago: " + e.getMessage());
        }
    }

    
}
