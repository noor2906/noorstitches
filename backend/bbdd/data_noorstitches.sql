INSERT INTO usuarios (nombre, apellidos, email, passwd, foto_perfil, telefono) 
VALUES 
('Juan', 'Pérez García', 'juan.perez@email.com', '12345abcdefg', 'juan.png', '+34123456789'),
('Laura', 'Gómez Sánchez', 'laura.gomez@email.com', '67890hijklmn', 'laura.png', '+34987654321'),
('Carlos', 'López Martínez', 'carlos.lopez@email.com', '13579zyxwvu', 'carlos.png', '+34911223344'),
('Marta', 'Ruiz Fernández', 'marta.ruiz@email.com', '98765opqrst', 'marta.png', '+34987651234'),
('Ana', 'Hernández Díaz', 'ana.hernandez@email.com', '24680abcdefg', 'ana.png', '+34876543210');

INSERT INTO categorias (nombre) VALUES 
('Lanas & Hilos'),
('Handmade'),
('Mercería'),
('Kits');

-- Para Lanas & Hilos
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Algodón', 'lanas.webp', 1),     -- 1
('Acrílico', 'acrilico.webp', 1), -- 2
('Mezclas', 'mezclas.webp', 1);   -- 3

-- Para Handmade
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Peluches', 'peluches.webp', 2),      -- 4
('Decoración', 'decoracion.webp', 2),  -- 5
('Ropa', 'ropa.webp', 2),              -- 6 
('Accesorios', 'accesorios.webp', 2);  -- 7

-- Para Mercería
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Agujas de crochet', 'agujas.webp', 3),  -- 8
('Marcadores', 'marcadores.webp', 3),    -- 9
('Tijeras', 'tijeras.webp', 3);          -- 10

-- Para Kits
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Kit ganchillo', 'kit_ganchillo.webp', 4),          -- 11
('Kit principiante', 'kit_principiante.webp', 4);-- 12


INSERT INTO productos (nombre, descripcion, imagen, precio, stock, peso, longitud, material, composicion, marca, activo, es_destacado, id_subcategoria) 
VALUES 
('Lana Cotton Soft', 'Lana suave ideal para prendas de verano. Tacto fresco y agradable.', 'lanas.webp', 4.99, 100, 100.00, "10X15", 'Algodón', '60% algodón, 40% acrílico', 'Cotton Soft', 1, 1, 1),
('Peluche Conejito Rosa', 'Peluche hecho a mano con hilo de algodón y relleno hipoalergénico. Ideal para regalar.', 'peluche_conejo_rosa.webp', 19.95, 5, null, "70X100", 'Algodón', null, 'Handmade', 1, 0, 4),
('Kit ganchillo tulip rose', 'Kit completo de ganchillo con agujas ergonómicas y ovillos en tonos rosa. Ideal para principiantes.', 'kit_tulip_rose.webp', 24.90, 20, 350.00, '25X20', 'Algodón y acero inoxidable', '70% algodón, 30% acero', 'Tulip', 1, 1, 11);


INSERT INTO pedidos (id_usuario, fecha, importe)
VALUES (1, NOW(), 30.0);  -- 4.99 * 2 + 19.95 = 29.93

-- Insertar líneas de pedido
INSERT INTO lineas_pedido (id_pedido, id_producto, cantidad, importe)
VALUES 
(1, 1, 2, 10.0),       -- 2 unidades de "Lana Cotton Soft"
(1, 2, 1, 20.0);      -- 1 unidad de "Peluche Conejito Rosa"
