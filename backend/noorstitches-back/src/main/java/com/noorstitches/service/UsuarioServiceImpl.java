package com.noorstitches.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.noorstitches.model.dto.UsuarioDTO;
import com.noorstitches.repository.dao.UsuarioRepository;
import com.noorstitches.repository.entity.Usuario;

@Service
public class UsuarioServiceImpl implements UsuarioService{

	private static final Logger log = LoggerFactory.getLogger(UsuarioServiceImpl.class);

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public List<UsuarioDTO> findAll() {

		log.info(UsuarioServiceImpl.class.getSimpleName() + " - findAll: Lista de todos los usuarios");

		List<UsuarioDTO> listaUsuariosDTO = new ArrayList<UsuarioDTO>();
		List<Usuario> listaUsuarios = usuarioRepository.findAll();
		for (int i = 0; i < listaUsuarios.size(); i++) {
			Usuario usuario = listaUsuarios.get(i);
			UsuarioDTO usuarioDTO = UsuarioDTO.convertToDTO(usuario);
			listaUsuariosDTO.add(usuarioDTO);
		}

		return listaUsuariosDTO;
	}
	
	@Override
	public UsuarioDTO findById(UsuarioDTO usuarioDTO) {

		log.info(UsuarioServiceImpl.class.getSimpleName() + " - findById: Buscar usuario por id: " + usuarioDTO.getId());

		Optional<Usuario> usuario = usuarioRepository.findById(usuarioDTO.getId());
		if (usuario.isPresent()) {
			usuarioDTO = UsuarioDTO.convertToDTO(usuario.get());
			return usuarioDTO;
		} else {
			return null;
		}
	}

	@Override
	public UsuarioDTO save(UsuarioDTO usuarioDTO) {
		log.info(UsuarioServiceImpl.class.getSimpleName() + " - save: Salvamos el usuario: " + usuarioDTO.toString());

		//Pasamos a entidad el usuarioDTO
		Usuario usuario = UsuarioDTO.convertToEntity(usuarioDTO);
		
		// Si la contraseña no está vacía, la encriptamos
        if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(usuario.getPassword());
            usuario.setPassword(encodedPassword);
        }
		
		//Guardamos el usuario
		usuario = usuarioRepository.save(usuario);
		
		//Buscamos el usuario que acabamos de insertar para mostrarlo
		Optional<Usuario> u = usuarioRepository.findById(usuario.getId());
		
		//Cambiamos de Optional a DTO
		UsuarioDTO usuarioInsertado = new UsuarioDTO();
		
		if (u.isPresent()) {
			usuarioInsertado = UsuarioDTO.convertToDTO(u.get());
		}
		
		return usuarioInsertado;
	}

	@Override
	public int delete(UsuarioDTO usuarioDTO) {
		log.info(UsuarioServiceImpl.class.getSimpleName() + " - delete: Borramos el cliente: " + usuarioDTO.getId());

		Usuario usuario = new Usuario();
		usuario.setId(usuarioDTO.getId());
		if (usuarioRepository.existsById(usuarioDTO.getId())) {
			usuarioRepository.deleteById(usuarioDTO.getId());
			return 1;
		} else {
			return 0;
		}
	}

	@Override
	public UsuarioDTO findByEmail(String email) {
		log.info(UsuarioServiceImpl.class.getSimpleName() + " - findByEmail: Buscar usuario por email: " + email);

		Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
		
		if (usuario.isPresent()) {
			UsuarioDTO usuarioDTO = UsuarioDTO.convertToDTO(usuario.get());
			return usuarioDTO;
		} else {
			return null;
		}
	}
	


}
