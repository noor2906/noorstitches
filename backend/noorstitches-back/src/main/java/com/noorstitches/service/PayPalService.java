package com.noorstitches.service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import okhttp3.*;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PayPalService {

	@Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Value("${paypal.api.url}")
    private String paypalApiUrl;
    
    @Value("${paypal.return.url}")
    private String returnUrl;

    @Value("${paypal.cancel.url}")
    private String cancelUrl;


    private final ObjectMapper objectMapper;

    private String getAccessToken() throws IOException {
        OkHttpClient client = new OkHttpClient();

        String credential = Credentials.basic(clientId, clientSecret);

        Request request = new Request.Builder()
                .url(paypalApiUrl + "/v1/oauth2/token")
                .post(RequestBody.create("grant_type=client_credentials", MediaType.get("application/x-www-form-urlencoded")))
                .header("Authorization", credential)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("Error al obtener el token de PayPal: " + response);
            }

            Map<String, Object> responseMap = objectMapper.readValue(response.body().string(), Map.class);
            return responseMap.get("access_token").toString();
        }
    }
   
    public String createPayment(String amount, String currency, String description) throws IOException {
        String accessToken = getAccessToken();
        OkHttpClient client = new OkHttpClient();

        Map<String, Object> payment = new HashMap<>();
        payment.put("intent", "CAPTURE");

        Map<String, Object> amountDetails = new HashMap<>();
        amountDetails.put("currency_code", currency);
        amountDetails.put("value", amount);

        payment.put("purchase_units", new Object[]{
            Map.of("amount", amountDetails, "description", description)
        });

        // NUEVO: Añadimos las URLs de redirección
        Map<String, Object> applicationContext = new HashMap<>();
        applicationContext.put("return_url", returnUrl);
        applicationContext.put("cancel_url", cancelUrl);
        applicationContext.put("brand_name", "Noorstitches");
        applicationContext.put("landing_page", "LOGIN");
        applicationContext.put("user_action", "PAY_NOW");
        applicationContext.put("shipping_preference", "NO_SHIPPING");

        payment.put("application_context", applicationContext);

        String jsonRequest = objectMapper.writeValueAsString(payment);

        RequestBody body = RequestBody.create(jsonRequest, MediaType.get("application/json"));

        Request request = new Request.Builder()
                .url(paypalApiUrl + "/v2/checkout/orders")
                .post(body)
                .header("Authorization", "Bearer " + accessToken)
                .header("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("Error al crear el pago en PayPal: " + response);
            }

            return response.body().string();
        }
    }

}


