package com.noorstitches.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noorstitches.model.dto.CategoriaDTO;
import com.noorstitches.repository.dao.CategoriaRepository;
import com.noorstitches.repository.entity.Categoria;

@Service
public class CategoriaServiceImpl implements CategoriaService {
	
	private static final Logger log = LoggerFactory.getLogger(CategoriaServiceImpl.class);

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Override
	public List<CategoriaDTO> findAll() {
		log.info(CategoriaServiceImpl.class.getSimpleName() + " - findAll: Lista de todos las categorias");

		List<CategoriaDTO> listaCategoriasDTO = new ArrayList<CategoriaDTO>();
		List<Categoria> listaCategorias = categoriaRepository.findAll();
		for (int i = 0; i < listaCategorias.size(); i++) {
			Categoria categoria = listaCategorias.get(i);
			CategoriaDTO categoriaDTO = CategoriaDTO.convertToDTO(categoria);
			listaCategoriasDTO.add(categoriaDTO);
		}

		return listaCategoriasDTO;
	}
	
	@Override
	public CategoriaDTO findById(CategoriaDTO categoriaDTO) {
		log.info(CategoriaServiceImpl.class.getSimpleName() + " - findById: Buscar categoría por id: " + categoriaDTO.getId());

		Optional<Categoria> categoria = categoriaRepository.findById(categoriaDTO.getId());
		if (categoria.isPresent()) {
			categoriaDTO = CategoriaDTO.convertToDTO(categoria.get());
			return categoriaDTO;
		} else {
			return null;
		}
	}

	@Override
	public CategoriaDTO save(CategoriaDTO categoriaDTO) {
		log.info(CategoriaServiceImpl.class.getSimpleName() + " - save: Salvamos la categoría: " + categoriaDTO.toString());

		// Pasamos a entidad el categoriaDTO
		Categoria categoria = CategoriaDTO.convertToEntity(categoriaDTO);

		// Guardamos la categoría
		categoria = categoriaRepository.save(categoria);

		// Buscamos la categoría que acabamos de insertar para mostrarla
		Optional<Categoria> c = categoriaRepository.findById(categoria.getId());

		// Cambiamos de Optional a DTO
		CategoriaDTO categoriaInsertada = new CategoriaDTO();

		if (c.isPresent()) {
			categoriaInsertada = CategoriaDTO.convertToDTO(c.get());
		}

		return categoriaInsertada;
	}

	@Override
	public int delete(CategoriaDTO categoriaDTO) {
		log.info(CategoriaServiceImpl.class.getSimpleName() + " - delete: Borramos la categoría: " + categoriaDTO.getId());

		Categoria categoria = new Categoria();
		categoria.setId(categoriaDTO.getId());

		if (categoriaRepository.existsById(categoriaDTO.getId())) {
			categoriaRepository.deleteById(categoriaDTO.getId());
			return 1;
		} else {
			return 0;
		}
	}


}
