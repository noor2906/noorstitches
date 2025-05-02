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
import com.noorstitches.service.CategoriaService;

@RestController
@RequestMapping("/categorias")
public class CategoriaRestController {

	private static final Logger log = LoggerFactory.getLogger(CategoriaRestController.class);		

	@Autowired
	private CategoriaService categoriaService;	
	
	// Listar las categorias 
	 @GetMapping("")
	 public ResponseEntity<List<CategoriaDTO>> findAll() {
		 log.info(CategoriaRestController.class.getSimpleName() + " - findAll: Mostramos todas las categorias");  
		 
		 List<CategoriaDTO> listaCategoriasDTO = categoriaService.findAll();
		 
		 return new ResponseEntity<>(listaCategoriasDTO, HttpStatus.OK);
	}
	 
	// Visualizar la información de una categoría
	 @GetMapping("/{idCategoria}")
	 public ResponseEntity<CategoriaDTO> findById(@PathVariable("idCategoria") Long idCategoria) {

	 	log.info(CategoriaRestController.class.getSimpleName() + " - findById: Mostramos la información de la categoría:" + idCategoria);

	 	// Obtenemos la categoría
	 	CategoriaDTO categoriaDTO = new CategoriaDTO();
	 	categoriaDTO.setId(idCategoria);
	 	categoriaDTO = categoriaService.findById(categoriaDTO);

	 	if (categoriaDTO == null) {
	 		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	 	} else {
	 		return new ResponseEntity<>(categoriaDTO, HttpStatus.OK);
	 	}
	 }

	 // Salvar categoría
	 @PostMapping("/add")
	 public ResponseEntity<CategoriaDTO> add(@RequestBody CategoriaDTO categoriaDTO) {

	 	log.info(CategoriaRestController.class.getSimpleName() + " - add: Salvamos los datos de la categoría:" + categoriaDTO.toString());

	 	CategoriaDTO categoriaInsertada = new CategoriaDTO();
	 	categoriaInsertada = categoriaService.save(categoriaDTO);

	 	if (categoriaInsertada != null) {
	 		return new ResponseEntity<>(categoriaInsertada, HttpStatus.OK);
	 	} else {
	 		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	 	}
	 }

	 // Actualización de categorías
	 @PutMapping("/update")
	 public ResponseEntity<CategoriaDTO> update(@RequestBody CategoriaDTO categoriaDTO) {

	 	log.info(CategoriaRestController.class.getSimpleName() + "- update: Modificamos la categoría: " + categoriaDTO.getId());

	 	// Obtenemos la categoría para verificar que existe
	 	CategoriaDTO categoriaExDTO = new CategoriaDTO();
	 	categoriaExDTO.setId(categoriaDTO.getId());
	 	categoriaExDTO = categoriaService.findById(categoriaExDTO);

	 	if (categoriaExDTO == null) {
	 		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	 	} else {
	 		categoriaDTO = categoriaService.save(categoriaDTO);
	 		return new ResponseEntity<>(categoriaDTO, HttpStatus.OK);
	 	}
	 }

	 // Borrar una categoría
	 @DeleteMapping("/delete/{idCategoria}")
	 public ResponseEntity<String> delete(@PathVariable("idCategoria") Long idCategoria) {

	 	log.info(CategoriaRestController.class.getSimpleName() + " - delete: Borramos la categoría:" + idCategoria);

	 	// Creamos una categoría y le asignamos el id. Esta categoría es la que se va a borrar
	 	CategoriaDTO categoriaDTO = new CategoriaDTO();
	 	categoriaDTO.setId(idCategoria);
	 	categoriaService.delete(categoriaDTO);

	 	return new ResponseEntity<>("Categoría borrada satisfactoriamente", HttpStatus.OK);
	 }


}
