package com.noorstitches.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noorstitches.model.dto.LineaPedidoDTO;
import com.noorstitches.repository.dao.LineaPedidoRepository;
import com.noorstitches.repository.entity.LineaPedido;

@Service
public class LineaPedidoServiceImpl implements LineaPedidoService {

	private static final Logger log = LoggerFactory.getLogger(LineaPedidoServiceImpl.class);

	@Autowired
	private LineaPedidoRepository lpRepository;

	@Override
	public List<LineaPedidoDTO> findAll() {

		log.info(LineaPedidoServiceImpl.class.getSimpleName() + " - findAll: Lista de todas las líneas de pedido");

		List<LineaPedidoDTO> listaLineaPedidoDTO = new ArrayList<>();
		List<LineaPedido> listaLineas = lpRepository.findAll();
		for (LineaPedido linea : listaLineas) {
			LineaPedidoDTO lineaDTO = LineaPedidoDTO.convertToDTO(linea);
			listaLineaPedidoDTO.add(lineaDTO);
		}

		return listaLineaPedidoDTO;
	}

	@Override
	public LineaPedidoDTO findById(LineaPedidoDTO lineaPedidoDTO) {
		log.info(LineaPedidoServiceImpl.class.getSimpleName() + " - findById: Buscar línea de pedido por id: " + lineaPedidoDTO.getId());

		Optional<LineaPedido> linea = lpRepository.findById(lineaPedidoDTO.getId());
		if (linea.isPresent()) {
			return LineaPedidoDTO.convertToDTO(linea.get());
		} else {
			return null;
		}
	}

	@Override
	public LineaPedidoDTO save(LineaPedidoDTO lineaPedidoDTO) {
		log.info(LineaPedidoServiceImpl.class.getSimpleName() + " - save: Salvamos la línea de pedido: " + lineaPedidoDTO.toString());

		LineaPedido linea = LineaPedidoDTO.convertToEntity(lineaPedidoDTO);
		linea = lpRepository.save(linea);

		Optional<LineaPedido> l = lpRepository.findById(linea.getId());

		LineaPedidoDTO lineaInsertada = new LineaPedidoDTO();

		if (l.isPresent()) {
			lineaInsertada = LineaPedidoDTO.convertToDTO(l.get());
		}

		return lineaInsertada;
	}

	@Override
	public int delete(LineaPedidoDTO lineaPedidoDTO) {
		log.info(LineaPedidoServiceImpl.class.getSimpleName() + " - delete: Borramos la línea de pedido: " + lineaPedidoDTO.getId());

		if (lpRepository.existsById(lineaPedidoDTO.getId())) {
			lpRepository.deleteById(lineaPedidoDTO.getId());
			return 1;
		} else {
			return 0;
		}
	}
}
