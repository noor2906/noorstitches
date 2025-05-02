package com.noorstitches.repository.entity;

import java.util.Objects;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "subcategorias")
public class Subcategoria {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "nombre")
	private String nombre;

	@Column(name = "imagen")
	private String imagen;
	
    //TODO -> pensar si necesito descripcion


	// Mapeo de la lista de productos con Set
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "subcategoria")
	@ToString.Exclude
	private Set<Producto> listaProductos;
	
	//Relacion N a 1
	@ManyToOne
	@JoinColumn(name= "id_categoria")
	@ToString.Exclude
	private Categoria categoria;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Subcategoria other = (Subcategoria) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

}
