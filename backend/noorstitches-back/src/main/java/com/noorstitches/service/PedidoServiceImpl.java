package com.noorstitches.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noorstitches.model.dto.PedidoDTO;
import com.noorstitches.model.enums.EnumEstadoPedido;
import com.noorstitches.repository.dao.LineaPedidoRepository;
import com.noorstitches.repository.dao.PedidoRepository;
import com.noorstitches.repository.entity.LineaPedido;
import com.noorstitches.repository.entity.Pedido;

@Service
public class PedidoServiceImpl implements PedidoService {
	
	private static final Logger log = LoggerFactory.getLogger(PedidoServiceImpl.class);

	@Autowired
	private PedidoRepository pedidoRepository;
	
	@Autowired
	private LineaPedidoRepository lineaPedidoRepository;

	@Override
	public List<PedidoDTO> findAll() {
		log.info(PedidoServiceImpl.class.getSimpleName() + " - findAll: Lista de todos los pedidos");

		List<PedidoDTO> listaPedidosDTO = new ArrayList<>();
		List<Pedido> listaPedidos = pedidoRepository.findAll();
		for (Pedido pedido : listaPedidos) {
			PedidoDTO pedidoDTO = PedidoDTO.convertToDTO(pedido);
			listaPedidosDTO.add(pedidoDTO);
		}

		return listaPedidosDTO;
	}

	@Override
	public PedidoDTO findById(PedidoDTO pedidoDTO) {
		log.info(PedidoServiceImpl.class.getSimpleName() + " - findById: Buscar pedido por id: " + pedidoDTO.getId());

		Optional<Pedido> p = pedidoRepository.findById(pedidoDTO.getId());
		if (p.isPresent()) {
			pedidoDTO = PedidoDTO.convertToDTO(p.get());
			return pedidoDTO;
		} else {
			return null;
		}
	}

	@Override
	public PedidoDTO save(PedidoDTO pedidoDTO) {
		log.info(PedidoServiceImpl.class.getSimpleName() + " - save: Salvamos el pedido: " + pedidoDTO.toString());

		Pedido pedido = PedidoDTO.convertToEntity(pedidoDTO);
		pedido.setFecha(new Date());
		pedido = pedidoRepository.save(pedido);

		// Buscamos el pedido que acabamos de insertar para mostrarlo
		Optional<Pedido> p = pedidoRepository.findById(pedido.getId());

		// Cambiamos de Optional a DTO
		PedidoDTO pedidoInsertado = new PedidoDTO();

		if (p.isPresent()) {
			pedidoInsertado = PedidoDTO.convertToDTO(p.get());
		}

		return pedidoInsertado;
	}

	@Override
	public int delete(PedidoDTO pedidoDTO) {
		log.info(PedidoServiceImpl.class.getSimpleName() + " - delete: Borramos el pedido: " + pedidoDTO.getId());

		if (pedidoRepository.existsById(pedidoDTO.getId())) {
			pedidoRepository.deleteById(pedidoDTO.getId());
			return 1;
		}
		return 0;
	}

	@Override
	public List<PedidoDTO> findAllByUsuario(Long idUsuario) {
		//Nos traemos la lista de pedidos Entity del respositorio
		List<Pedido> listaPedidos = pedidoRepository.findAllByUsuario(idUsuario);
		
		//Nos creamos una lista de pedidos DTO 
		List<PedidoDTO> listaPedidosDTO = new ArrayList<PedidoDTO>();
		
		//Convertimos al lista de pedidos de Entity a DTO
		
		for (int i = 0; i < listaPedidos.size(); i++) {
			PedidoDTO pedidoDTO = PedidoDTO.convertToDTO(listaPedidos.get(i));
			listaPedidosDTO.add(pedidoDTO);
		}
		
		return listaPedidosDTO;
	}

	@Override
	public PedidoDTO finalizarCompra(PedidoDTO pedidoDTO) {
		log.info(PedidoServiceImpl.class.getSimpleName() + " - finalizarCompra: Finalizamos la compra del pedido: " + pedidoDTO.toString());

		Optional<Pedido> pedido = pedidoRepository.findById(pedidoDTO.getId());
		
		pedido.get().setFecha(new Date());
		//pedido.get().setImporte(calcularImportePedido(pedido));
		
		pedidoRepository.save(pedido.get());

		if (pedido.isPresent()) {
			pedidoDTO = PedidoDTO.convertToDTO(pedido.get());
		}

		return pedidoDTO;
	}


	public void calcularImportePedido(Pedido pedido) {
		
		List<LineaPedido> listaLineasPedido = new ArrayList<LineaPedido>();
		
		if (pedido.getId() != null) {
			listaLineasPedido = lineaPedidoRepository.findAllByPedido(pedido.getId());
		}
		
		float importeTotal = 0;
		
		for (LineaPedido lineaPedido : listaLineasPedido) {
			importeTotal += lineaPedido.getImporte();
		}
		
		pedido.setImporte(importeTotal);

		pedidoRepository.save(pedido);
	}

	@Override
	public PedidoDTO actualizarEstado(PedidoDTO pedidoDTO, String estado) {

	    Optional<Pedido> pedidoOpt = pedidoRepository.findById(pedidoDTO.getId());

	    if (!pedidoOpt.isPresent()) {
	        return null; // o lanzar excepción si prefieres
	    }

	    Pedido pedido = pedidoOpt.get();
	    pedido.setFecha(new Date());

	    EnumEstadoPedido nuevoEstado;

	    try {
	        // Convertimos el string recibido a enum exacto
	        nuevoEstado = EnumEstadoPedido.valueOf(estado.toLowerCase());
	    } catch (IllegalArgumentException e) {
	        // Si estado no es válido, lo ponemos en cancelado por defecto
	        nuevoEstado = EnumEstadoPedido.cancelado;
	    }

	    pedido.setEstado(nuevoEstado);

	    pedidoRepository.save(pedido);

	    pedidoDTO = PedidoDTO.convertToDTO(pedido);

	    return pedidoDTO;
	}

	
	
}
