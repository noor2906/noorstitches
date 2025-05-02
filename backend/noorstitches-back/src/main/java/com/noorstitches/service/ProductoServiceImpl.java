package com.noorstitches.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noorstitches.model.dto.ProductoDTO;
import com.noorstitches.repository.dao.ProductoRepository;
import com.noorstitches.repository.entity.Producto;

@Service
public class ProductoServiceImpl implements ProductoService {

	private static final Logger log = LoggerFactory.getLogger(ProductoServiceImpl.class);

	@Autowired
	private ProductoRepository productoRepository;

	@Override
	public List<ProductoDTO> findAll() {

		log.info(ProductoServiceImpl.class.getSimpleName() + " - findAll: Lista de todos los productos");

		List<ProductoDTO> listaProductosDTO = new ArrayList<ProductoDTO>();
		List<Producto> listaProductos = productoRepository.findAll();
		for (int i = 0; i < listaProductos.size(); i++) {
			Producto producto = listaProductos.get(i);
			ProductoDTO productoDTO = ProductoDTO.convertToDTO(producto);
			listaProductosDTO.add(productoDTO);
		}

		return listaProductosDTO;
	}

	@Override
	public ProductoDTO findById(ProductoDTO productoDTO) {
		log.info(ProductoServiceImpl.class.getSimpleName() + " - findById: Buscar producto por id: "
				+ productoDTO.getId());

		Optional<Producto> producto = productoRepository.findById(productoDTO.getId());
		if (producto.isPresent()) {
			productoDTO = ProductoDTO.convertToDTO(producto.get());
			return productoDTO;
		} else {
			return null;
		}
	}

	@Override
	public ProductoDTO save(ProductoDTO productoDTO) {
		log.info(
				ProductoServiceImpl.class.getSimpleName() + " - save: Salvamos el producto: " + productoDTO.toString());

		// Pasamos a entidad el productoDTO
		Producto producto = ProductoDTO.convertToEntity(productoDTO);

		// Guardamos el producto
		producto = productoRepository.save(producto);

		// Buscamos el producto que acabamos de insertar para mostrarlo
		Optional<Producto> p = productoRepository.findById(producto.getId());

		// Cambiamos de Optional a DTO
		ProductoDTO productoInsertado = new ProductoDTO();

		if (p.isPresent()) {
			productoInsertado = ProductoDTO.convertToDTO(p.get());
		}

		return productoInsertado;
	}

	@Override
	public int delete(ProductoDTO productoDTO) {
		log.info(ProductoServiceImpl.class.getSimpleName() + " - delete: Borramos el cliente: " + productoDTO.getId());

		Producto producto = new Producto();
		producto.setId(productoDTO.getId());

		if (productoRepository.existsById(productoDTO.getId())) {
			productoRepository.deleteById(productoDTO.getId());
			return 1;
		} else {
			return 0;
		}

	}

}
