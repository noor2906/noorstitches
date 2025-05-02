SELECT p.nombre,  c.nombre AS categoria, s.nombre AS subcategoria
FROM productos p
JOIN subcategorias s ON p.id_subcategoria = s.id
JOIN categorias c ON s.id_categoria = c.id;

select * from usuarios;

select * from productos;

select * from subcategorias where id_categoria = 1;

select * from categorias;

select * from subcategorias;

insert into subcategorias(nombre, imagen, id_categoria) value ("prueba", "pruabe.jpg", 2);