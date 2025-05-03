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

import com.noorstitches.model.dto.LineaPedidoDTO;
import com.noorstitches.service.LineaPedidoService;

@RestController
@RequestMapping("/lineaspedido")
public class LineaPedidoRestController {

	private static final Logger log = LoggerFactory.getLogger(LineaPedidoRestController.class);		

	@Autowired
	private LineaPedidoService lpService;	
	
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

	// Guardar línea de pedido
	@PostMapping("/add")
	public ResponseEntity<LineaPedidoDTO> add(@RequestBody LineaPedidoDTO lineaPedidoDTO) {

		log.info(LineaPedidoRestController.class.getSimpleName() + " - add: Salvamos los datos de la línea de pedido: " + lineaPedidoDTO.toString());

		LineaPedidoDTO lineaPedidoInsertada = new LineaPedidoDTO();
		lineaPedidoInsertada = lpService.save(lineaPedidoDTO);

		if(lineaPedidoInsertada != null) {
			return new ResponseEntity<>(lineaPedidoInsertada, HttpStatus.OK);
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

		if(lineaPedidoExDTO == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			lineaPedidoDTO = lpService.save(lineaPedidoDTO);
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
