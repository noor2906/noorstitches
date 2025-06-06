package com.noorstitches.configuration;

import lombok.Data;

@Data
public class FormularioContacto {
	
	private String nombre;
    private String email;
    private String asunto;
    private String motivo; // el valor que venga del select
    private String mensaje;
    private boolean aceptaPolitica;
}
