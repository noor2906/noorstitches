package com.noorstitches.service;

import java.util.List;

import com.noorstitches.model.dto.LineaPedidoDTO;

public interface LineaPedidoService {
	
	List<LineaPedidoDTO> findAll();

	LineaPedidoDTO findById(LineaPedidoDTO lineaPedidoDTO);

	LineaPedidoDTO save(LineaPedidoDTO lineaPedidoDTO);

	int delete(LineaPedidoDTO lineaPedidoDTO);

	List<LineaPedidoDTO> findAllByPedido(Long idPedido);

	LineaPedidoDTO updateCantidadProducto(LineaPedidoDTO lineaPedidoDTO, int cantidadProducto);

}
