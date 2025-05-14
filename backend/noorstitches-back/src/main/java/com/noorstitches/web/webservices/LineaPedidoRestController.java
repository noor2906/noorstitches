package com.noorstitches.web.webservices;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noorstitches.model.dto.CategoriaDTO;
import com.noorstitches.model.dto.LineaPedidoDTO;
import com.noorstitches.model.dto.PedidoDTO;
import com.noorstitches.service.LineaPedidoService;
import com.noorstitches.service.PedidoService;

@RestController
@RequestMapping("/lineaspedido")
public class LineaPedidoRestController {

	private static final Logger log = LoggerFactory.getLogger(LineaPedidoRestController.class);		

	@Autowired
	private LineaPedidoService lpService;	
	
	@Autowired
	private PedidoService pedidoService;
	
	// Listar las líneas de pedido 
	@GetMapping("")
	public ResponseEntity<List<LineaPedidoDTO>> findAll() {
		log.info(LineaPedidoRestController.class.getSimpleName() + " - findAll: Mostramos todas las líneas de pedido");  

		List<LineaPedidoDTO> listaLineaPedidoDTO = lpService.findAll();

		return new ResponseEntity<>(listaLineaPedidoDTO, HttpStatus.OK);
	}

	// Visualizar la información de una línea de pedido
	@GetMapping("/{idLineaPedido}")
	public ResponseEntity<LineaPedidoDTO> findById(@PathVariable("idLineaPedido") Long idLineaPedido) {

		log.info(LineaPedidoRestController.class.getSimpleName() + " - findById: Mostramos la información de la línea de pedido: " + idLineaPedido);

		LineaPedidoDTO lineaPedidoDTO = new LineaPedidoDTO();
		lineaPedidoDTO.setId(idLineaPedido);
		lineaPedidoDTO = lpService.findById(lineaPedidoDTO);

		if (lineaPedidoDTO == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(lineaPedidoDTO, HttpStatus.OK);
		}
	}

	
	// Actualizar cantidad productos en linea pedido
	@PutMapping("/{idLineaPedido}/updateCantidad")
	public ResponseEntity<LineaPedidoDTO> updateCantidadProducto(@RequestBody int cantidadProducto, @PathVariable("idLineaPedido") Long idLineaPedido) {
		log.info(LineaPedidoRestController.class.getSimpleName() + " - updateCantidadProductoLineaPedido: Actualizamos la cantidad de producto en la línea de pedido: " + idLineaPedido);

		LineaPedidoDTO lineaPedidoDTO = new LineaPedidoDTO();
		lineaPedidoDTO.setId(idLineaPedido);
		lineaPedidoDTO = lpService.findById(lineaPedidoDTO);
		lineaPedidoDTO = lpService.updateCantidadProducto(lineaPedidoDTO, cantidadProducto);
		
		if(lineaPedidoDTO == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(lineaPedidoDTO, HttpStatus.OK);
		}
	}

	
	// Guardar línea de pedido en un pedido
	@PostMapping("/add/{idPedido}")
	public ResponseEntity<LineaPedidoDTO> add(@RequestBody LineaPedidoDTO lineaPedidoDTO, @PathVariable("idPedido") Long idPedido) {

		log.info(LineaPedidoRestController.class.getSimpleName() + " - add: Salvamos los datos de la línea de pedido: " + lineaPedidoDTO.toString());

		PedidoDTO pedidoDTO = new PedidoDTO();
		pedidoDTO.setId(idPedido);
		pedidoDTO = pedidoService.findById(pedidoDTO);
		
		lineaPedidoDTO.setPedidoDTO(pedidoDTO);
		lineaPedidoDTO = lpService.save(lineaPedidoDTO);

		if(lineaPedidoDTO != null) {
			return new ResponseEntity<>(lineaPedidoDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}	

	// Actualización de líneas de pedido
	@PutMapping("/update")
	public ResponseEntity<LineaPedidoDTO> update(@RequestBody LineaPedidoDTO lineaPedidoDTO) {

		log.info(LineaPedidoRestController.class.getSimpleName() + " - update: Modificamos la línea de pedido: " + lineaPedidoDTO.getId());

		LineaPedidoDTO lineaPedidoExDTO = new LineaPedidoDTO();
		lineaPedidoExDTO.setId(lineaPedidoDTO.getId());
		lineaPedidoExDTO = lpService.findById(lineaPedidoExDTO);
		lineaPedidoDTO = lpService.save(lineaPedidoDTO);

		if(lineaPedidoExDTO == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(lineaPedidoDTO, HttpStatus.OK);
		}
	}

	// Borrar una línea de pedido
	@DeleteMapping("/delete/{idLineaPedido}")
	public ResponseEntity<String> delete(@PathVariable("idLineaPedido") Long idLineaPedido) {

		log.info(LineaPedidoRestController.class.getSimpleName() + " - delete: Borramos la línea de pedido: " + idLineaPedido);

		LineaPedidoDTO lineaPedidoDTO = new LineaPedidoDTO();
		lineaPedidoDTO.setId(idLineaPedido);
		lpService.delete(lineaPedidoDTO);

		return new ResponseEntity<>("Línea de pedido borrada satisfactoriamente", HttpStatus.OK);

	}
}
