package com.noorstitches.service;

import java.util.List;

import com.noorstitches.model.dto.ProductoDTO;

public interface ProductoService {

	List<ProductoDTO> findAll();

	ProductoDTO findById(ProductoDTO productoDTO);

	ProductoDTO save(ProductoDTO productoDTO);

	int delete(ProductoDTO productoDTO);
	
}
