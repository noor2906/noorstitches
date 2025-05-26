package com.noorstitches.web.webservices;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noorstitches.model.dto.PedidoDTO;
import com.noorstitches.model.dto.ProductoDTO;
import com.noorstitches.model.dto.ProductoGuardadoDTO;
import com.noorstitches.model.dto.UsuarioDTO;
import com.noorstitches.service.ProductoGuardadoService;
import com.noorstitches.service.ProductoService;
import com.noorstitches.service.UsuarioService;

@RestController
@RequestMapping("/favoritos")
public class ProductoGuardadoRestController {

	private static final Logger log = LoggerFactory.getLogger(ProductoGuardadoRestController.class);		

	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	ProductoService productoService;
	
	@Autowired
	ProductoGuardadoService productoGuardadoService;
	
	// Buscar lista de productos por usuario
	
    // GET /favoritos/{idUsuario}
    @GetMapping("/{idUsuario}")
    public ResponseEntity<List<ProductoDTO>> findAllFavoritosByUser(@PathVariable Long idUsuario) {

		log.info(ProductoGuardadoRestController.class.getSimpleName() + " - findAllFavoritosByUser: Mostramos todos los productos guardados del user de id: " + idUsuario);  
    	
		UsuarioDTO userDTO = new UsuarioDTO();
		userDTO.setId(idUsuario);
		userDTO = usuarioService.findById(userDTO);
		
		List<ProductoDTO> listaPGDTO = productoGuardadoService.findAllFavoritosByUser(userDTO);
		
		
		 return new ResponseEntity<>(listaPGDTO, HttpStatus.OK);
    }
    
    
	// Añadir productos a favoritos por usuario /favoritos/add/productos/{idProducto}/usuarios/{idUsuario}
    @PostMapping("/add/productos/{idProducto}/usuarios/{idUsuario}")
	public ResponseEntity<Boolean> addFavorito(@PathVariable("idUsuario") Long idUsuario, @PathVariable("idProducto") Long idProducto) {

		log.info(ProductoGuardadoRestController.class.getSimpleName() + " - addFavorito: Salvamos el producto guardado:" + idProducto + " al usuario: " + idUsuario);
		
		UsuarioDTO usuarioDTO = new UsuarioDTO();
		usuarioDTO.setId(idUsuario);
		usuarioDTO = usuarioService.findById(usuarioDTO);
		
		ProductoDTO productoDTO = new ProductoDTO();
		productoDTO.setId(idProducto);
		productoDTO = productoService.findById(productoDTO);
		
		ProductoGuardadoDTO pgDTO = new ProductoGuardadoDTO();
		pgDTO = productoGuardadoService.addFavorito(usuarioDTO, productoDTO);

		if (pgDTO != null) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
	}
	
    
	//Quitar productos de favoritos por usuario
    
    @DeleteMapping("/delete/productos/{idProducto}/usuarios/{idUsuario}")
	public ResponseEntity<Boolean> deleteFavorito(@PathVariable("idUsuario") Long idUsuario, @PathVariable("idProducto") Long idProducto) {

		log.info(ProductoGuardadoRestController.class.getSimpleName() + " - deleteFavorito: Borramos el producto guardado:" + idProducto + " del usuario: " + idUsuario);

		UsuarioDTO usuarioDTO = new UsuarioDTO();
		usuarioDTO.setId(idUsuario);
		usuarioDTO = usuarioService.findById(usuarioDTO);
		
		ProductoDTO productoDTO = new ProductoDTO();
		productoDTO.setId(idProducto);
		productoDTO = productoService.findById(productoDTO);

		boolean estaBorrado = productoGuardadoService.deleteFavorito(usuarioDTO, productoDTO);

		if (estaBorrado) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
	}
    
}
