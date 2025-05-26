package com.noorstitches.service;

import java.util.List;

import com.noorstitches.model.dto.ProductoDTO;
import com.noorstitches.model.dto.ProductoGuardadoDTO;
import com.noorstitches.model.dto.UsuarioDTO;

public interface ProductoGuardadoService {

	List<ProductoDTO> findAllFavoritosByUser(UsuarioDTO userDTO);

	ProductoGuardadoDTO addFavorito(UsuarioDTO usuarioDTO, ProductoDTO productoDTO);

	Boolean deleteFavorito(UsuarioDTO usuarioDTO, ProductoDTO productoDTO);

}
