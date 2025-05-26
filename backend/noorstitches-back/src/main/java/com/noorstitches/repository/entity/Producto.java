package com.noorstitches.repository.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.noorstitches.model.dto.LineaPedidoDTO;

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
	
	@Column(name = "es_destacado")
	private boolean esDestacado;
	
	//Relacion N a 1
	@ManyToOne
	@JoinColumn(name= "id_subcategoria")
	@ToString.Exclude
	@JsonBackReference
	private Subcategoria subcategoria;
	
	@OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@ToString.Exclude
	private List<LineaPedido> lineasPedido;

    // lista de relaciones de usuarios que guardaron este producto
    @JsonIgnore
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductoGuardado> usuariosGuardados = new ArrayList<>();

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
