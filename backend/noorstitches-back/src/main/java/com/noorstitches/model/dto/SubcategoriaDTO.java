package com.noorstitches.model.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.noorstitches.repository.entity.Subcategoria;

import lombok.Data;
import lombok.ToString;

@Data
public class SubcategoriaDTO {
	
	private Long id;
	private String nombre;
	private String imagen;
	
	@ToString.Exclude 
	private List<ProductoDTO> listaProductosDTO;
	
	@ToString.Exclude
    @JsonBackReference
	private CategoriaDTO categoriaDTO;
	
    // Convierte una entidad a un objeto DTO
    public static SubcategoriaDTO convertToDTO(Subcategoria s) {

        // Creamos el subcategoriaDTO y asignamos los valores básicos
        SubcategoriaDTO sDTO = new SubcategoriaDTO();
        sDTO.setId(s.getId());
        sDTO.setNombre(s.getNombre());
        sDTO.setImagen(s.getImagen());
        sDTO.setCategoriaDTO(CategoriaDTO.convertToDTO(s.getCategoria()));


		// Retorna el DTO
        return sDTO;
    }

    // Convierte un objeto DTO a una entidad
    public static Subcategoria convertToEntity(SubcategoriaDTO sDTO) {
        // Creamos la entidad subcategoria y le asignamos los valores
        Subcategoria s = new Subcategoria();
        s.setId(sDTO.getId());
        s.setNombre(sDTO.getNombre());
        s.setImagen(sDTO.getImagen());
        s.setCategoria(CategoriaDTO.convertToEntity(sDTO.getCategoriaDTO()));

		// Retorna la entidad
        return s;
    }

}
