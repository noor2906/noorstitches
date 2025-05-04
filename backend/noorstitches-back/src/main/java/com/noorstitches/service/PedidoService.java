package com.noorstitches.service;

import java.util.List;

import com.noorstitches.model.dto.PedidoDTO;

public interface PedidoService {
	
	List<PedidoDTO> findAll();

	PedidoDTO findById(PedidoDTO pedidoDTO);

	PedidoDTO save(PedidoDTO pedidoDTO);

	int delete(PedidoDTO pedidoDTO);

	List<PedidoDTO> findAllByUsuario(Long idUsuario);

	PedidoDTO finalizarCompra(PedidoDTO pedidoDTO);
	

}
