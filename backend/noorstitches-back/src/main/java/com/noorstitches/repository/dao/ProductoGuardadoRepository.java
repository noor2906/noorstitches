package com.noorstitches.repository.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.noorstitches.repository.entity.Producto;
import com.noorstitches.repository.entity.ProductoGuardado;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface ProductoGuardadoRepository extends JpaRepository<ProductoGuardado, Long>{

	@Query(value = "select p.* from productos p join productos_guardados pg on pg.id_producto = p.id where pg.id_usuario = :idUsuario", nativeQuery = true)
	public List<Producto> findAllFavoritosByUser(@Param("idUsuario") Long idUsuario);
	
	@Modifying //se ha de poner cuando utilizamos delete/update en las query's
	@Query("DELETE FROM ProductoGuardado pg WHERE pg.usuario.id = :idUsuario AND pg.producto.id = :idProducto")
	int deleteByUsuarioAndProducto(@Param("idUsuario") Long idUsuario, @Param("idProducto") Long idProducto);
}
