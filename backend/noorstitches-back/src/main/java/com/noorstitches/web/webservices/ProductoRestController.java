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

import com.noorstitches.model.dto.ProductoDTO;
import com.noorstitches.service.ProductoService;

@RestController
@RequestMapping("/productos")
public class ProductoRestController {
	
	private static final Logger log = LoggerFactory.getLogger(ProductoRestController.class);		

	@Autowired
	private ProductoService productoService;	
	
	// Listar los productos 
	 @GetMapping("")
	 public ResponseEntity<List<ProductoDTO>> findAll() {
		 log.info(ProductoRestController.class.getSimpleName() + " - findAll: Mostramos todos los productos");  
		 
		 List<ProductoDTO> listaProductoDTO = productoService.findAll();
		 
		 log.info("                                                      " +  listaProductoDTO);
		 
		 return new ResponseEntity<>(listaProductoDTO, HttpStatus.OK);
	}
	
	// Visualizar la informacion de un producto
	@GetMapping("/{idProducto}")
	public ResponseEntity<ProductoDTO> findById(@PathVariable("idProducto") Long idProducto) {
		
		log.info(ProductoRestController.class.getSimpleName() + " - findById: Mostramos la informacion del producto:" + idProducto);
		
		// Obtenemos el producto
		ProductoDTO productoDTO = new ProductoDTO();
		productoDTO.setId(idProducto);
		productoDTO = productoService.findById(productoDTO);
				
		if (productoDTO == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(productoDTO, HttpStatus.OK);
		}
	}
	
	// Salvar producto
	@PostMapping("/add")
	public ResponseEntity<ProductoDTO> add(@RequestBody ProductoDTO productoDTO) {
		
		log.info(ProductoRestController.class.getSimpleName() + " - add: Salvamos los datos del producto:" + productoDTO.toString());
		
		ProductoDTO productoInsertado = new ProductoDTO();
		productoInsertado = productoService.save(productoDTO);
		
		if(productoInsertado != null) {
			return new ResponseEntity<>(productoInsertado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}	
	
	 // Actualizacion de productos
	 @PutMapping("/update")
	 public ResponseEntity<ProductoDTO> update(@RequestBody ProductoDTO productoDTO) {

		 log.info(ProductoRestController.class.getSimpleName() + "- update: Modificamos el producto: " + productoDTO.getId());
	
		 // Obtenemos el producto para verificar que existe
		 ProductoDTO productoExDTO = new ProductoDTO();
		 productoExDTO.setId(productoDTO.getId());
		 productoExDTO = productoService.findById(productoExDTO);
	
		 if(productoExDTO == null) {
			 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		 } else {
			 productoDTO = productoService.save(productoDTO);
			 return new ResponseEntity<>(productoDTO, HttpStatus.OK);
		 }
	 }
	
	 // Borrar un producto
	 @DeleteMapping("/delete/{idProducto}")
	 public ResponseEntity<String> delete(@PathVariable("idProducto") Long idProducto) {

		 log.info(ProductoRestController.class.getSimpleName() + " - delete: Borramos el producto:" + idProducto);
	
		 // Creamos un producto y le asignamos el id. Este producto es el que se va a borrar
		 ProductoDTO productoDTO = new ProductoDTO();
		 productoDTO.setId(idProducto);
		 productoService.delete(productoDTO);
	
		 return new ResponseEntity<>("Producto borrado satisfactoriamente", HttpStatus.OK);
	 }	
	
}
