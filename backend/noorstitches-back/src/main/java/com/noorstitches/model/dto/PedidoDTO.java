package com.noorstitches.model.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.noorstitches.model.enums.EnumEstadoPedido;
import com.noorstitches.repository.entity.LineaPedido;
import com.noorstitches.repository.entity.Pedido;

import lombok.Data;
import lombok.ToString;

@Data
public class PedidoDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private float importe;
	private Date fecha;
	private EnumEstadoPedido estado;
	
	@ToString.Exclude
	@JsonBackReference
	private List<LineaPedido> listaLineasPedido;
	
	@ToString.Exclude
	private UsuarioDTO usuarioDTO;

	// Convierte una entidad a un objeto DTO
	public static PedidoDTO convertToDTO(Pedido p) {

		// Creamos la PedidoDTO y asignamos los valores básicos
		PedidoDTO pDTO = new PedidoDTO();
		pDTO.setId(p.getId());
		pDTO.setImporte(p.getImporte());
		pDTO.setFecha(p.getFecha());
		pDTO.setEstado(p.getEstado());
		pDTO.setUsuarioDTO(UsuarioDTO.convertToDTO(p.getUsuario()));

				
		// Retorna el DTO
		return pDTO;
	}

	// Convierte de DTO a entidad
	public static Pedido convertToEntity(PedidoDTO pDTO) {

		// Creamos la LineaPedido y asignamos los valores básicos
		Pedido p = new Pedido();
		p.setId(pDTO.getId());
		p.setImporte(pDTO.getImporte());
		p.setFecha(pDTO.getFecha());
		p.setEstado(pDTO.getEstado());
		p.setUsuario(UsuarioDTO.convertToEntity(pDTO.getUsuarioDTO()));

		// Retorna el DTO
		return p;
	}

}
