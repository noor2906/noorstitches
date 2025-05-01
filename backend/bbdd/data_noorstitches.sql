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
INSERT INTO subcategorias (nombre, id_categoria) VALUES 
('Algodón', 1), -- 1
('Acrílico', 1), -- 2
('Mezclas', 1); -- 3

-- Para Handmade
INSERT INTO subcategorias (nombre, id_categoria) VALUES 
('Peluches', 2), -- 4
('Decoración', 2), -- 5
('Ropa', 2), -- 6 
('Accesorios', 2); -- 7

-- Para Mercería
INSERT INTO subcategorias (nombre, id_categoria) VALUES 
('Agujas de crochet', 3), -- 8
('Marcadores', 3), -- 9
('Tijeras', 3); -- 10

-- Para Kits
INSERT INTO subcategorias (nombre, id_categoria) VALUES 
('Kit peluche', 4), -- 11
('Kit principiante', 4); -- 12


INSERT INTO productos (nombre, descripcion, precio, stock, peso, longitud, material, composicion, id_subcategoria) 
VALUES 
('Lana Cotton Soft', 'Lana suave ideal para prendas de verano. Tacto fresco y agradable.', 4.99, 100, 100.00, 150.00, 'Algodón', '60% algodón, 40% acrílico', 1),
('Peluche Conejito Rosa', 'Peluche hecho a mano con hilo de algodón y relleno hipoalergénico. Ideal para regalar.', 19.95, 5, null, null, 'Algodón', null, 4);
