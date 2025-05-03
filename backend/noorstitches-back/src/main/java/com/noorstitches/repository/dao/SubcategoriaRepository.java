package com.noorstitches.repository.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.noorstitches.repository.entity.Subcategoria;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface SubcategoriaRepository extends JpaRepository<Subcategoria, Long>{

	@Query(value = "select * from subcategorias where id_categoria = :idCategoria", nativeQuery = true)
	public List<Subcategoria> findAllByCategoria(@Param("idCategoria") Long idCategoria);
}
