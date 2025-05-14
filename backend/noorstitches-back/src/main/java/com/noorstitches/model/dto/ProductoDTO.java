package com.noorstitches.model.dto;

import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.noorstitches.repository.entity.Producto;

import lombok.Data;
import lombok.ToString;

@Data
public class ProductoDTO implements Serializable {
	
	private static final Logger log = LoggerFactory.getLogger(ProductoDTO.class);		

	private static final long serialVersionUID = 1L;
	private Long id;
	private String nombre;
	private String descripcion;	
	private String imagen;
	private String urlImagen;
	private Float precio;
	private Float peso;
	private String longitud;
	private String material;	
	private String composicion;
	private String marca;
	private boolean activo;
	private boolean esDestacado;

	@ToString.Exclude
	private SubcategoriaDTO subcategoriaDTO;

	// Convierte una entidad a un objeto DTO
    public static ProductoDTO convertToDTO(Producto p) {
    	
        // Creamos el ProductoDTO y asignamos los valores básicos
    	ProductoDTO productoDTO = new ProductoDTO();
    	productoDTO.setId(p.getId());
    	productoDTO.setNombre(p.getNombre());
    	productoDTO.setDescripcion(p.getDescripcion());
    	productoDTO.setImagen(p.getImagen());
    	
    	
    	// Solo generar la URL si hay nombre de imagen
        if(p.getImagen() != null && !p.getImagen().isEmpty()){
            productoDTO.setUrlImagen("http://localhost:8888/imgs/productos/"+ p.getSubcategoria().getCategoria().getNombre().toLowerCase() + "/" + p.getImagen());
        }else {
            productoDTO.setUrlImagen("http://localhost:8888/imgs/productos/por_defecto.webp");
        }
    	
    	
    	productoDTO.setPrecio(p.getPrecio());
    	productoDTO.setPeso(p.getPeso());
    	productoDTO.setLongitud(p.getLongitud());
    	productoDTO.setMaterial(p.getMaterial());
    	productoDTO.setComposicion(p.getComposicion());
    	productoDTO.setMarca(p.getMarca());
    	productoDTO.setActivo(p.isActivo());
    	productoDTO.setEsDestacado(p.isEsDestacado());
    	
    	productoDTO.setSubcategoriaDTO(SubcategoriaDTO.convertToDTO(p.getSubcategoria()));
    	    	
        // Retorna el DTO
        return productoDTO;
    }

    // Convierte un objeto DTO a una entidad
    public static Producto convertToEntity(ProductoDTO pDTO) {
    	
        // Creamos la entidad Producto y le asignamos los valores
    	Producto p = new Producto();
    	p.setId(pDTO.getId());
    	p.setNombre(pDTO.getNombre());
    	p.setDescripcion(pDTO.getDescripcion());
    	p.setImagen(pDTO.getImagen());
    	p.setPrecio(pDTO.getPrecio());
    	p.setPeso(pDTO.getPeso());
    	p.setLongitud(pDTO.getLongitud());
    	p.setMaterial(pDTO.getMaterial());
    	p.setComposicion(pDTO.getComposicion());
    	p.setMarca(pDTO.getMarca());
    	p.setActivo(pDTO.isActivo());
    	p.setEsDestacado(pDTO.isEsDestacado());

    	p.setSubcategoria(SubcategoriaDTO.convertToEntity(pDTO.getSubcategoriaDTO()));
    	
        // Retorna la entidad
        return p;
    }
    
}
