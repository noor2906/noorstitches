package com.noorstitches.repository.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.noorstitches.repository.entity.LineaPedido;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface LineaPedidoRepository extends JpaRepository<LineaPedido, Long> {
	
	@Query(value = "select * from lineas_pedido where id_pedido = :idPedido", nativeQuery = true)
	public List<LineaPedido> findAllByPedido(@Param("idPedido") Long idPedido);

}
