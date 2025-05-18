package com.noorstitches.web.webservices;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.noorstitches.configuration.PayPalResponse;
import com.noorstitches.model.dto.LineaPedidoDTO;
import com.noorstitches.model.dto.PedidoDTO;
import com.noorstitches.model.dto.UsuarioDTO;
import com.noorstitches.service.LineaPedidoService;
import com.noorstitches.service.PayPalService;
import com.noorstitches.service.PedidoService;
import com.noorstitches.service.UsuarioService;

@RestController
@RequestMapping("/pedidos")
public class PedidoRestController {
	
	private static final Logger log = LoggerFactory.getLogger(PedidoRestController.class);		

	@Autowired
	private PedidoService pedidoService;	

	@Autowired
	private LineaPedidoService lpService;
	
	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private PayPalService paypalService;

	// Listar los pedidos 
	@GetMapping("")
	public ResponseEntity<List<PedidoDTO>> findAll() {
		log.info(PedidoRestController.class.getSimpleName() + " - findAll: Mostramos todos los pedidos");  

		List<PedidoDTO> listaPedidosDTO = pedidoService.findAll();

		return new ResponseEntity<>(listaPedidosDTO, HttpStatus.OK);
	}

	// Visualizar la información de un pedido
	@GetMapping("/{idPedido}")
	public ResponseEntity<PedidoDTO> findById(@PathVariable("idPedido") Long idPedido) {

		log.info(PedidoRestController.class.getSimpleName() + " - findById: Mostramos la información del pedido:" + idPedido);

		PedidoDTO pedidoDTO = new PedidoDTO();
		pedidoDTO.setId(idPedido);
		pedidoDTO = pedidoService.findById(pedidoDTO);

		if (pedidoDTO == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(pedidoDTO, HttpStatus.OK);
		}
	}


	// Listar todas las líneas de pedido dado un id de pedido
	@GetMapping("/{idPedido}/lineaspedido")
	public ResponseEntity<List<LineaPedidoDTO>> findLineasPedidoByPedido(@PathVariable("idPedido") Long idPedido) {

		log.info(PedidoRestController.class.getSimpleName() + " - findLineasPedidoByPedido: Mostramos la información de las líneas de pedido de un pedido:" + idPedido);

		PedidoDTO pedidoDTO = new PedidoDTO();
		pedidoDTO.setId(idPedido);
		pedidoDTO = pedidoService.findById(pedidoDTO);

		List<LineaPedidoDTO> listaLineasPedidoDTO = new ArrayList<>();

		if (pedidoDTO != null) {
			listaLineasPedidoDTO = lpService.findAllByPedido(idPedido);
		}

		if (listaLineasPedidoDTO == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(listaLineasPedidoDTO, HttpStatus.OK);
		}
	}

	// Salvar pedido
	@PostMapping("/add/{idUsuario}")
	public ResponseEntity<PedidoDTO> add(@RequestBody PedidoDTO pedidoDTO, @PathVariable("idUsuario") Long idUsuario) {

		log.info(PedidoRestController.class.getSimpleName() + " - add: Salvamos los datos del pedido:" + pedidoDTO.toString());
		
		UsuarioDTO usuarioDTO = new UsuarioDTO();
		usuarioDTO.setId(idUsuario);
		usuarioDTO = usuarioService.findById(usuarioDTO);
		
		pedidoDTO.setUsuarioDTO(usuarioDTO);
		pedidoDTO = pedidoService.save(pedidoDTO);

		if (pedidoDTO != null) {
			return new ResponseEntity<>(pedidoDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	// Actualización de pedidos
	@PutMapping("/update")
	public ResponseEntity<PedidoDTO> update(@RequestBody PedidoDTO pedidoDTO) {

		log.info(PedidoRestController.class.getSimpleName() + "- update: Modificamos el pedido: " + pedidoDTO.getId());

		PedidoDTO pedidoExDTO = new PedidoDTO();
		pedidoExDTO.setId(pedidoDTO.getId());
		pedidoExDTO = pedidoService.findById(pedidoExDTO);
		pedidoExDTO = pedidoService.finalizarCompra(pedidoExDTO);
		
		if (pedidoExDTO == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			pedidoDTO = pedidoService.save(pedidoDTO);
			return new ResponseEntity<>(pedidoDTO, HttpStatus.OK);
		}
	}

	// Borrar un pedido
	@DeleteMapping("/delete/{idPedido}")
	public ResponseEntity<String> delete(@PathVariable("idPedido") Long idPedido) {

		log.info(PedidoRestController.class.getSimpleName() + " - delete: Borramos el pedido:" + idPedido);

		PedidoDTO pedidoDTO = new PedidoDTO();
		pedidoDTO.setId(idPedido);
		pedidoService.delete(pedidoDTO);

		return new ResponseEntity<>("Pedido borrado satisfactoriamente", HttpStatus.OK);
	}

	
	@PutMapping("/finalizarCompra")
	public ResponseEntity<?> finalizarCompra(@RequestBody PedidoDTO pedidoDTO) {
	    log.info("Finalizando pedido: " + pedidoDTO.getId());

	    pedidoDTO = pedidoService.findById(pedidoDTO);
	    pedidoDTO = pedidoService.finalizarCompra(pedidoDTO);

	    if (pedidoDTO == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }

	    try {
	        // Crear el pago en PayPal y obtener la respuesta JSON
	        String jsonResponse = paypalService.createPayment(
	            String.valueOf(pedidoDTO.getImporte()),
	            "EUR",
	            "Compra en Noorstitches"
	        );

	        // Parsear JSON a un objeto PayPalResponse
	        ObjectMapper mapper = new ObjectMapper();
	        PayPalResponse payPalResponse = mapper.readValue(jsonResponse, PayPalResponse.class);

	        return ResponseEntity.ok(payPalResponse);

	    } catch (IOException e) {
	        log.error("Error creando el pago en PayPal", e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar pago PayPal");
	    }
	}


	
	
}
