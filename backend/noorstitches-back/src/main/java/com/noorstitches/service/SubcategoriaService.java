package com.noorstitches.service;

import java.util.List;

import com.noorstitches.model.dto.SubcategoriaDTO;

public interface SubcategoriaService {

	List<SubcategoriaDTO> findAll();

	SubcategoriaDTO findById(SubcategoriaDTO subcategoriaDTO);

	SubcategoriaDTO save(SubcategoriaDTO subcategoriaDTO);

	int delete(SubcategoriaDTO subcategoriaDTO);

	List<SubcategoriaDTO> findAllByCategoria(Long idCategoria);	

	
}
