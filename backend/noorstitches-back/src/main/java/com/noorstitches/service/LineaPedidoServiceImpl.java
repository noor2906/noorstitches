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
import com.noorstitches.repository.dao.PedidoRepository;
import com.noorstitches.repository.entity.LineaPedido;

@Service
public class LineaPedidoServiceImpl implements LineaPedidoService {

	private static final Logger log = LoggerFactory.getLogger(LineaPedidoServiceImpl.class);

	@Autowired
	private LineaPedidoRepository lpRepository;
	
	@Autowired
	private PedidoServiceImpl pedidoService;
	

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

		log.info("PEDIDO DE LP:                      " + lineaPedidoDTO.getPedidoDTO());
		
		
		LineaPedido linea = LineaPedidoDTO.convertToEntity(lineaPedidoDTO);
		
		recalcularImporteLineaPedido(linea);  
		
		log.info("Antes               " + linea);
		
		linea = lpRepository.save(linea);
		
		log.info("Después               " + linea.getPedido());

		
		pedidoService.calcularImportePedido(linea.getPedido());
				
	    LineaPedidoDTO lineaInsertada = LineaPedidoDTO.convertToDTO(linea);
	    
	    log.info("LineaIsertada pedido:                        )" + lineaInsertada.toString());
		
		return lineaInsertada;
	}

	@Override
	public LineaPedidoDTO updateCantidadProducto(LineaPedidoDTO lineaPedidoDTO, int cantidadProducto) {
		log.info(LineaPedidoServiceImpl.class.getSimpleName() + " - saveCantidadProducto: Salvamos la cantidad de producto: " + cantidadProducto + " en la línea de pedido: " + lineaPedidoDTO.toString());

		Optional<LineaPedido> lineapedido = lpRepository.findById(lineaPedidoDTO.getId());
		lineapedido.get().setCantidad(cantidadProducto);
		
		recalcularImporteLineaPedido(lineapedido.get());  

		lpRepository.save(lineapedido.get());

		pedidoService.calcularImportePedido(lineapedido.get().getPedido());

		lineaPedidoDTO = LineaPedidoDTO.convertToDTO(lineapedido.get());	

		return lineaPedidoDTO;
	}
	
	@Override
	public int delete(LineaPedidoDTO lineaPedidoDTO) {
		log.info(LineaPedidoServiceImpl.class.getSimpleName() + " - delete: Borramos la línea de pedido: " + lineaPedidoDTO.getId());

		if (lpRepository.existsById(lineaPedidoDTO.getId())) {
			lpRepository.deleteById(lineaPedidoDTO.getId());
			LineaPedido lp = LineaPedidoDTO.convertToEntity(lineaPedidoDTO);
			pedidoService.calcularImportePedido(lp.getPedido());
			return 1;
		} else {
			return 0;
		}
	}

	@Override
	public List<LineaPedidoDTO> findAllByPedido(Long idPedido) {
		//Nos traemos la lista de lineas de pedido Entity del respositorio
		List<LineaPedido> listaLineasPedido = lpRepository.findAllByPedido(idPedido);
		
		//Nos creamos una lista de subcategorias DTO 
		List<LineaPedidoDTO> listaLineasPedidoDTO = new ArrayList<LineaPedidoDTO>();
		
		//Convertimos al lista de lineas pedido de Entity a DTO
		
		for (int i = 0; i < listaLineasPedido.size(); i++) {
			LineaPedidoDTO lineaPedidoDTO = LineaPedidoDTO.convertToDTO(listaLineasPedido.get(i));
			listaLineasPedidoDTO.add(lineaPedidoDTO);
		}
		
		return listaLineasPedidoDTO;
	}
	
	
	public void recalcularImporteLineaPedido(LineaPedido lineaPedido) {
		float importe = lineaPedido.getProducto().getPrecio() * lineaPedido.getCantidad();
		lineaPedido.setImporte(importe);
	}
}
