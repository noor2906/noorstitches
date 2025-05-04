package com.noorstitches.model.dto;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.noorstitches.repository.entity.LineaPedido;

@Data
public class LineaPedidoDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private int cantidad;
	private Float importe;

	@ToString.Exclude
	private ProductoDTO productoDTO;
	
	@ToString.Exclude
	@JsonIgnore
	private PedidoDTO pedidoDTO;

	// Convierte una entidad a un objeto DTO
	public static LineaPedidoDTO convertToDTO(LineaPedido lp) {

		// Creamos la LineaPedidoDTO y asignamos los valores básicos
		LineaPedidoDTO lpDTO = new LineaPedidoDTO();
		lpDTO.setId(lp.getId());
		lpDTO.setCantidad(lp.getCantidad());
		lpDTO.setImporte(lp.getImporte());

		lpDTO.setProductoDTO(ProductoDTO.convertToDTO(lp.getProducto()));
		lpDTO.setPedidoDTO(PedidoDTO.convertToDTO(lp.getPedido()));

		// Retorna el DTO
		return lpDTO;
	}

	// Convierte de DTO a entidad
	public static LineaPedido convertToEntity(LineaPedidoDTO lpDTO) {

		// Creamos la LineaPedido y asignamos los valores básicos
		LineaPedido lp = new LineaPedido();
		lp.setId(lpDTO.getId());
		lp.setCantidad(lpDTO.getCantidad());
		lp.setImporte(lpDTO.getImporte());

		lp.setProducto(ProductoDTO.convertToEntity(lpDTO.getProductoDTO()));
		lp.setPedido(PedidoDTO.convertToEntity(lpDTO.getPedidoDTO()));

		// Retorna el DTO
		return lp;
	}

}
