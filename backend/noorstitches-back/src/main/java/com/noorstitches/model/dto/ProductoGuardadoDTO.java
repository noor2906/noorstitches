package com.noorstitches.model.dto;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.noorstitches.repository.entity.Producto;
import com.noorstitches.repository.entity.ProductoGuardado;
import com.noorstitches.repository.entity.Usuario;

import lombok.Data;

@Data
public class ProductoGuardadoDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private UsuarioDTO usuarioDTO;
	
	private ProductoDTO productoDTO;
	
	//@DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	//private Date fechaGuardado;

	
	 public static ProductoGuardadoDTO convertToDTO(ProductoGuardado productoGuardado) {
		 
		 ProductoGuardadoDTO pgDTO = new ProductoGuardadoDTO();
		 
		 UsuarioDTO userDTO = UsuarioDTO.convertToDTO(productoGuardado.getUsuario());
		 pgDTO.setId(productoGuardado.getId());
		 pgDTO.setUsuarioDTO(userDTO);
		 pgDTO.setProductoDTO(ProductoDTO.convertToDTO(productoGuardado.getProducto()));
		 //pgDTO.setFechaGuardado(productoGuardado.getFechaGuardado());
		 
		 return pgDTO;   
	}
	 
 	public static ProductoGuardado convertToEntity(ProductoGuardadoDTO productoGuardadoDTO) {
		 
		 ProductoGuardado pg = new ProductoGuardado();
		 
		 Usuario user = UsuarioDTO.convertToEntity(productoGuardadoDTO.getUsuarioDTO());
		 pg.setId(productoGuardadoDTO.getId());
		 pg.setUsuario(user);
		 pg.setProducto(ProductoDTO.convertToEntity(productoGuardadoDTO.getProductoDTO()));
		 //pg.setFechaGuardado(productoGuardadoDTO.getFechaGuardado());
		 
		 return pg;   
	}
}
