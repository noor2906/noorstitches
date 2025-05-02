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
import com.noorstitches.model.dto.SubcategoriaDTO;
import com.noorstitches.service.CategoriaService;
import com.noorstitches.service.SubcategoriaService;

@RestController
@RequestMapping("/subcategorias")
public class SubcategoriaRestController {
	
	private static final Logger log = LoggerFactory.getLogger(SubcategoriaRestController.class);		

	@Autowired
	private SubcategoriaService subcategoriaService;	
	
	@Autowired
	private CategoriaService categoriaService;
	
	// Listar las subcategorias 
	 @GetMapping("")
	 public ResponseEntity<List<SubcategoriaDTO>> findAll() {
		 log.info(SubcategoriaRestController.class.getSimpleName() + " - findAll: Mostramos todas las subcategorias");  
		 
		 List<SubcategoriaDTO> listaSubcategoriasDTO = subcategoriaService.findAll();
		 
		 return new ResponseEntity<>(listaSubcategoriasDTO, HttpStatus.OK);
	}
	 
	// Visualizar la informacion de una subcategoria
	@GetMapping("/{idSubcategoria}")
	public ResponseEntity<SubcategoriaDTO> findById(@PathVariable("idSubcategoria") Long idSubcategoria) {
		
		log.info(SubcategoriaRestController.class.getSimpleName() + " - findById: Mostramos la informacion de la subcategoria:" + idSubcategoria);
		
		// Obtenemos la subcategoria
		SubcategoriaDTO subcategoriaDTO = new SubcategoriaDTO();
		subcategoriaDTO.setId(idSubcategoria);
		subcategoriaDTO = subcategoriaService.findById(subcategoriaDTO);
				
		if (subcategoriaDTO == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(subcategoriaDTO, HttpStatus.OK);
		}
	}
	
	// Salvar subcategoria
	@PostMapping("/add/{idCategoria}")
	public ResponseEntity<SubcategoriaDTO> add(@RequestBody SubcategoriaDTO subcategoriaDTO, @PathVariable("idCategoria") Long idCategoria) {
		
		log.info(SubcategoriaRestController.class.getSimpleName() + " - add: Salvamos los datos de la subcategoria:" + subcategoriaDTO.toString());
		
		CategoriaDTO categoriaDTO = new CategoriaDTO();
		categoriaDTO.setId(idCategoria);
		categoriaDTO = categoriaService.findById(categoriaDTO);
		
		subcategoriaDTO.setCategoriaDTO(categoriaDTO);
		subcategoriaDTO = subcategoriaService.save(subcategoriaDTO);
		
		
		if(subcategoriaDTO != null) {
			return new ResponseEntity<>(subcategoriaDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}	
	
	 // Actualizacion de subcategorias
	 @PutMapping("/update")
	 public ResponseEntity<SubcategoriaDTO> update(@RequestBody SubcategoriaDTO subcategoriaDTO) {

		 log.info(SubcategoriaRestController.class.getSimpleName() + "- update: Modificamos la subcategoria: " + subcategoriaDTO.getId());
	
		 // Obtenemos la subcategoria para verificar que existe
		 SubcategoriaDTO subcategoriaExDTO = new SubcategoriaDTO();
		 subcategoriaExDTO.setId(subcategoriaDTO.getId());
		 subcategoriaExDTO = subcategoriaService.findById(subcategoriaExDTO);
	
		 if(subcategoriaExDTO == null) {
			 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		 } else {
			 subcategoriaDTO = subcategoriaService.save(subcategoriaDTO);
			 return new ResponseEntity<>(subcategoriaDTO, HttpStatus.OK);
		 }
	 }
	
	 // Borrar una subcategoria
	 @DeleteMapping("/delete/{idSubcategoria}")
	 public ResponseEntity<String> delete(@PathVariable("idSubcategoria") Long idSubcategoria) {

		 log.info(SubcategoriaRestController.class.getSimpleName() + " - delete: Borramos la subcategoria:" + idSubcategoria);
	
		 // Creamos una subcategoria y le asignamos el id. Esta subcategoria es el que se va a borrar
		 SubcategoriaDTO subcategoriaDTO = new SubcategoriaDTO();
		 subcategoriaDTO.setId(idSubcategoria);
		 subcategoriaService.delete(subcategoriaDTO);
	
		 return new ResponseEntity<>("Subcategoria borrada satisfactoriamente", HttpStatus.OK);
	 }	
		
}
