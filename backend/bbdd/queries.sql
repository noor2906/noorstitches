SELECT p.nombre,  c.nombre AS categoria, s.nombre AS subcategoria
FROM productos p
JOIN subcategorias s ON p.id_subcategoria = s.id
JOIN categorias c ON s.id_categoria = c.id;

select * from usuarios;