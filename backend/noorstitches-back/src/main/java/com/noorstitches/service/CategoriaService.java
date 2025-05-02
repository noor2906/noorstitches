package com.noorstitches.service;

import java.util.List;

import com.noorstitches.model.dto.CategoriaDTO;

public interface CategoriaService {

	List<CategoriaDTO> findAll();

	CategoriaDTO findById(CategoriaDTO categoriaDTO);

	CategoriaDTO save(CategoriaDTO categoriaDTO);

	int delete(CategoriaDTO categoriaDTO);

}
