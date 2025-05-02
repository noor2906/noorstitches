package com.noorstitches.model.dto;

import java.io.Serializable;

import com.noorstitches.repository.entity.Producto;
import lombok.Data;

@Data
public class ProductoDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String nombre;
	private String descripcion;	
	private String imagen;
	private Float precio;
	private int stock;	
	private Float peso;
	private String longitud;
	private String material;	
	private String composicion;
	private String marca;
	private boolean activo;
	

	// Convierte una entidad a un objeto DTO
    public static ProductoDTO convertToDTO(Producto p) {

        // Creamos el ProductoDTO y asignamos los valores básicos
    	ProductoDTO productoDTO = new ProductoDTO();
    	productoDTO.setId(p.getId());
    	productoDTO.setNombre(p.getNombre());
    	productoDTO.setDescripcion(p.getDescripcion());
    	productoDTO.setImagen(p.getImagen());
    	productoDTO.setPrecio(p.getPrecio());
    	productoDTO.setStock(p.getStock());
    	productoDTO.setPeso(p.getPeso());
    	productoDTO.setLongitud(p.getLongitud());
    	productoDTO.setMaterial(p.getMaterial());
    	productoDTO.setComposicion(p.getComposicion());
    	productoDTO.setMarca(p.getMarca());
    	productoDTO.setActivo(p.isActivo());
    	
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
    	p.setStock(pDTO.getStock());
    	p.setPeso(pDTO.getPeso());
    	p.setLongitud(pDTO.getLongitud());
    	p.setMaterial(pDTO.getMaterial());
    	p.setComposicion(pDTO.getComposicion());
    	p.setMarca(pDTO.getMarca());
    	p.setActivo(pDTO.isActivo());

        // Retorna la entidad
        return p;
    }
}
