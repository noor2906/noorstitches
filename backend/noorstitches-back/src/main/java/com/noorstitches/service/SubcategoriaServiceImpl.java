package com.noorstitches.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noorstitches.model.dto.SubcategoriaDTO;
import com.noorstitches.repository.dao.SubcategoriaRepository;
import com.noorstitches.repository.entity.Subcategoria;

@Service
public class SubcategoriaServiceImpl implements SubcategoriaService {
	
	private static final Logger log = LoggerFactory.getLogger(SubcategoriaServiceImpl.class);

	@Autowired
	private SubcategoriaRepository subcategoriaRepository;

	@Override
	public List<SubcategoriaDTO> findAll() {
		log.info(SubcategoriaServiceImpl.class.getSimpleName() + " - findAll: Lista de todos las subcategorias");

		List<SubcategoriaDTO> listaSubcategoriaDTO = new ArrayList<SubcategoriaDTO>();
		List<Subcategoria> listaSubcategoria = subcategoriaRepository.findAll();
		for (int i = 0; i < listaSubcategoria.size(); i++) {
			Subcategoria subcategoria = listaSubcategoria.get(i);
			SubcategoriaDTO subcategoriaDTO = SubcategoriaDTO.convertToDTO(subcategoria);
			listaSubcategoriaDTO.add(subcategoriaDTO);
		}

		return listaSubcategoriaDTO;
	}

	@Override
	public SubcategoriaDTO findById(SubcategoriaDTO subcategoriaDTO) {
		log.info(SubcategoriaServiceImpl.class.getSimpleName() + " - findById: Buscar subcategoria por id: " + subcategoriaDTO.getId());

		Optional<Subcategoria> subcategoria = subcategoriaRepository.findById(subcategoriaDTO.getId());
		if (subcategoria.isPresent()) {
			subcategoriaDTO = SubcategoriaDTO.convertToDTO(subcategoria.get());
			return subcategoriaDTO;
		} else {
			return null;
		}
	}

	@Override
	public SubcategoriaDTO save(SubcategoriaDTO subcategoriaDTO) {
		log.info(SubcategoriaServiceImpl.class.getSimpleName() + " - save: Salvamos la subcategoria: " + subcategoriaDTO.toString());

		// Pasamos a entidad el subcategoriaDTO
		Subcategoria subcategoria = SubcategoriaDTO.convertToEntity(subcategoriaDTO);

		// Guardamos el subcategoria
		subcategoria = subcategoriaRepository.save(subcategoria);

		// Buscamos la subcategoria que acabamos de insertar para mostrarla
		Optional<Subcategoria> s = subcategoriaRepository.findById(subcategoria.getId());

		// Cambiamos de Optional a DTO
		SubcategoriaDTO subcategoriaInsertada = new SubcategoriaDTO();

		if (s.isPresent()) {
			subcategoriaInsertada = SubcategoriaDTO.convertToDTO(s.get());
		}

		return subcategoriaInsertada;
	}

	@Override
	public int delete(SubcategoriaDTO subcategoriaDTO) {
		log.info(SubcategoriaServiceImpl.class.getSimpleName() + " - delete: Borramos la subcategoria: " + subcategoriaDTO.getId());

		Subcategoria subcategoria = new Subcategoria();
		subcategoria.setId(subcategoriaDTO.getId());

		if (subcategoriaRepository.existsById(subcategoriaDTO.getId())) {
			subcategoriaRepository.deleteById(subcategoriaDTO.getId());
			return 1;
		} else {
			return 0;
		}
		
	}

	@Override
	public List<SubcategoriaDTO> findAllByCategoria(Long idCategoria) {
		
		//Nos traemos la lista de subcategorias Entity del respositorio
		List<Subcategoria> listaSubcategorias = subcategoriaRepository.findAllByCategoria(idCategoria);
		
		//Nos creamos una lista de subcategorias DTO 
		List<SubcategoriaDTO> listaSubcategoriasDTO = new ArrayList<SubcategoriaDTO>();
		
		//Convertimos al lista de subcategorias de Entity a DTO
		
		for (int i = 0; i < listaSubcategorias.size(); i++) {
			SubcategoriaDTO subcategoriaDTO = SubcategoriaDTO.convertToDTO(listaSubcategorias.get(i));
			listaSubcategoriasDTO.add(subcategoriaDTO);
		}
		
		return listaSubcategoriasDTO;
	}

}


