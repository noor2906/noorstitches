package com.noorstitches.model.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.noorstitches.repository.entity.Pedido;
import com.noorstitches.repository.entity.Usuario;

import lombok.Data;
import lombok.ToString;

@Data
public class UsuarioDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String nombre;
	private String apellidos;
	private String password;
	private String email;
	private String fotoPerfil;
	private String telefono;
	
	@ToString.Exclude
	@JsonBackReference
	private List<Pedido> listaPedidos;
	

	 // Convierte una entidad a un objeto DTO
    public static UsuarioDTO convertToDTO(Usuario usuario) {

        // Creamos el UsuarioDTO y asignamos los valores básicos
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setNombre(usuario.getNombre());
        usuarioDTO.setApellidos(usuario.getApellidos());
        usuarioDTO.setPassword(usuario.getPassword());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setFotoPerfil(usuario.getFotoPerfil());
        usuarioDTO.setTelefono(usuario.getTelefono());

        // Retorna el DTO
        return usuarioDTO;
    }

    // Convierte un objeto DTO a una entidad
    public static Usuario convertToEntity(UsuarioDTO usuarioDTO) {
        // Creamos la entidad Usuario y le asignamos los valores
        Usuario usuario = new Usuario();
        usuario.setId(usuarioDTO.getId());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellidos(usuarioDTO.getApellidos());
        usuario.setPassword(usuarioDTO.getPassword());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setFotoPerfil(usuarioDTO.getFotoPerfil());
        usuario.setTelefono(usuarioDTO.getTelefono());

        // Retorna la entidad
        return usuario;
    }


	
}
