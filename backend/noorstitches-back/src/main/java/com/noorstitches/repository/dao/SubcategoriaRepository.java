package com.noorstitches.repository.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noorstitches.repository.entity.Subcategoria;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface SubcategoriaRepository extends JpaRepository<Subcategoria, Long>{

}
