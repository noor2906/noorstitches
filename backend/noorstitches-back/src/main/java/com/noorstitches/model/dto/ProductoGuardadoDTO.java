package com.noorstitches.model.dto;

import java.io.Serializable;
import java.util.Date;

import com.noorstitches.repository.entity.Producto;
import com.noorstitches.repository.entity.Usuario;

import lombok.Data;

@Data
public class ProductoGuardadoDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private Usuario usuario;
	private Producto producto;
	private Date fechaGuardado;

}
