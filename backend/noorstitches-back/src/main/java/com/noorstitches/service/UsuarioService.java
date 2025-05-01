package com.noorstitches.service;

import java.util.List;

import com.noorstitches.model.dto.UsuarioDTO;
import com.noorstitches.repository.entity.Usuario;

public interface UsuarioService {

	public List<UsuarioDTO> findAll();
	public UsuarioDTO findById(UsuarioDTO usuarioDTO);
	public UsuarioDTO save(UsuarioDTO usuarioDTO);
	int delete(UsuarioDTO usuarioDTO);
	public UsuarioDTO findByEmail(String email);
}
