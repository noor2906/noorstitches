package com.noorstitches.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noorstitches.model.dto.ProductoDTO;
import com.noorstitches.model.dto.ProductoGuardadoDTO;
import com.noorstitches.model.dto.UsuarioDTO;
import com.noorstitches.repository.dao.ProductoGuardadoRepository;
import com.noorstitches.repository.entity.Producto;
import com.noorstitches.repository.entity.ProductoGuardado;

@Service
public class ProductoGuardadoServiceImpl implements ProductoGuardadoService {

	private static final Logger log = LoggerFactory.getLogger(ProductoGuardadoServiceImpl.class);		

	
	@Autowired
	ProductoGuardadoRepository productoGuardadoRepository;
	
	@Override
	public List<ProductoDTO> findAllFavoritosByUser(UsuarioDTO userDTO) {
		
		log.info(ProductoGuardadoServiceImpl.class.getSimpleName() + " - findAllFavoritosByUser: Lista de productos guardados por usuario: " + userDTO);

		List<Producto> listaProductos = productoGuardadoRepository.findAllFavoritosByUser(userDTO.getId());

		List<ProductoDTO> listaProductosDTO = new ArrayList<ProductoDTO>();
		for (int i = 0; i < listaProductos.size(); i++) {
			Producto p = listaProductos.get(i);
			ProductoDTO pDTO = ProductoDTO.convertToDTO(p);
			listaProductosDTO.add(pDTO);
		}
		
		return listaProductosDTO;
	}

	@Override
	public ProductoGuardadoDTO addFavorito(UsuarioDTO usuarioDTO, ProductoDTO productoDTO) {
		
		ProductoGuardado pg = new ProductoGuardado();
		
		pg.setUsuario(UsuarioDTO.convertToEntity(usuarioDTO));
		pg.setProducto(ProductoDTO.convertToEntity(productoDTO));
		pg.setFechaGuardado(new Date());
		
		pg = productoGuardadoRepository.save(pg);
		
		ProductoGuardadoDTO pgDTO = ProductoGuardadoDTO.convertToDTO(pg);
		
		return pgDTO;
	}

	@Override
	public Boolean deleteFavorito(UsuarioDTO usuarioDTO, ProductoDTO productoDTO) {
		int pgBorrado = productoGuardadoRepository.deleteByUsuarioAndProducto(
	        usuarioDTO.getId(), 
	        productoDTO.getId()
	    );
		   
		return pgBorrado > 0; // true si se eliminó al menos 1 registro
	}

	
	
	
	
	
	
	
	
	
	
	
}
