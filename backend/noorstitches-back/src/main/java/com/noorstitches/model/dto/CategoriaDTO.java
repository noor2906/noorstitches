package com.noorstitches.model.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.noorstitches.repository.entity.Categoria;

import lombok.Data;
import lombok.ToString;

@Data
public class CategoriaDTO {
	
	private Long id;
	private String nombre;
	
	@ToString.Exclude 
	@JsonManagedReference
	private List<SubcategoriaDTO> listaSubcategoriaDTO;
	
	// Convierte una entidad a un objeto DTO
    public static CategoriaDTO convertToDTO(Categoria c) {

        // Creamos el categoriaDTO y asignamos los valores básicos
        CategoriaDTO cDTO = new CategoriaDTO();
        cDTO.setId(c.getId());
        cDTO.setNombre(c.getNombre());
        
		// Retorna el DTO
        return cDTO;
    }

    // Convierte un objeto DTO a una entidad
    public static Categoria convertToEntity(CategoriaDTO cDTO) {
        // Creamos la entidad categoria y le asignamos los valores
        Categoria c = new Categoria();
        c.setId(cDTO.getId());
        c.setNombre(cDTO.getNombre());

		// Retorna la entidad
        return c;
    }

}
