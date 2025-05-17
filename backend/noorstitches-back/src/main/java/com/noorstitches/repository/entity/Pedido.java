package com.noorstitches.repository.entity;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.format.annotation.DateTimeFormat;

import com.noorstitches.model.enums.EnumEstadoPedido;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "pedidos")
public class Pedido {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "importe")
	private float importe;

	@Column(name = "fecha")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private Date fecha;

	@Column(name = "estado")
	@Enumerated(EnumType.STRING)
	private EnumEstadoPedido estado;
	
	@OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
	@ToString.Exclude
	private List<LineaPedido> listaLineasPedido;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	@ToString.Exclude
	private Usuario usuario;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pedido other = (Pedido) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	
}
