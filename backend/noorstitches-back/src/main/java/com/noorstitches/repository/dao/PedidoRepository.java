package com.noorstitches.repository.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.noorstitches.repository.entity.Pedido;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface PedidoRepository extends JpaRepository<Pedido, Long>{

	@Query(value = "select * from pedidos where id_usuario = :idUsuario", nativeQuery = true)
	public List<Pedido> findAllByUsuario(@Param("idUsuario") Long idUsuario);

}
