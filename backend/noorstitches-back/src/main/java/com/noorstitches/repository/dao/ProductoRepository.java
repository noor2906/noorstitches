package com.noorstitches.repository.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noorstitches.repository.entity.Producto;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface ProductoRepository extends JpaRepository<Producto, Long> {

	

}
