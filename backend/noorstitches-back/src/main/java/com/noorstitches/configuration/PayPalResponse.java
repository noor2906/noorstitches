package com.noorstitches.configuration;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PayPalResponse {
    private String id;
    private List<Link> links;

    // Si la clase Link no está definida, te dejo un ejemplo básico
    @Data
    public static class Link {
        private String href;
        private String rel;
        private String method;
    }
}
