package com.noorstitches.repository.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="productos")
public class Producto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "nombre")
	private String nombre;
	
	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "imagen")
	private String imagen;
	
	@Column(name = "precio")	
	private Float precio;
	
	@Column(name = "stock")	
	private int stock;
	
	@Column(name = "peso")	
	private Float peso;
	
	@Column(name = "longitud")	
	private String longitud;
	
	@Column(name = "material")	
	private String material;
	
	@Column(name = "composicion")	
	private String composicion;
	
	@Column(name = "marca")	
	private String marca;
	
	@Column(name = "activo")	
	private boolean activo;
	
	//TODO: OBJETO CATEGORÍA
	
	//TODO: OBJETO SUBCATEGORÍA
		

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Producto other = (Producto) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	
}
