SELECT p.nombre,  c.nombre AS categoria, s.nombre AS subcategoria
FROM productos p
JOIN subcategorias s ON p.id_subcategoria = s.id
JOIN categorias c ON s.id_categoria = c.id;

select * from usuarios;

select * from productos;

select * from subcategorias where id_categoria = 2;

select * from categorias;

select * from subcategorias;

insert into subcategorias(nombre, imagen, id_categoria) value ("prueba", "pruabe.jpg", 2);

select * from pedidos;
select * from pedidos where id_usuario = 2;
select * from lineas_pedido;
select * from lineas_pedido where id_pedido = 2;

select * from productos_guardados;

SELECT p.*
FROM productos p
JOIN productos_guardados pg
  ON pg.id_producto = p.id
WHERE pg.id_usuario = 1;


select * from productos where es_destacado = 1;