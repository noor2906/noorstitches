INSERT INTO usuarios (nombre, apellidos, email, passwd, foto_perfil, telefono) 
VALUES 
('Juan', 'Pérez García', 'juan.perez@email.com', '12345abcdefg', 'juan.png', '+34123456789'),
('Laura', 'Gómez Sánchez', 'laura.gomez@email.com', '67890hijklmn', 'laura.png', '+34987654321'),
('Carlos', 'López Martínez', 'carlos.lopez@email.com', '13579zyxwvu', 'carlos.png', '+34911223344'),
('Marta', 'Ruiz Fernández', 'marta.ruiz@email.com', '98765opqrst', 'marta.png', '+34987651234'),
('Ana', 'Hernández Díaz', 'ana.hernandez@email.com', '24680abcdefg', 'ana.png', '+34876543210');

INSERT INTO categorias (nombre) VALUES 
('LanasAndHilos'),
('Handmade'),
('Merceria'),
('Kits');

-- Para Lanas & Hilos
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Lanas', 'lanas.webp', 1),     -- 1
('Hilos', 'acrilico.webp', 1), -- 2
('Lanas&hilos_otros', 'otros.webp', 1); -- 3

-- Para Handmade
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Peluches', 'peluches.webp', 2),      -- 4
('Decoración', 'decoracion.webp', 2),  -- 5
('Ropa', 'ropa.webp', 2),              -- 6 
('Accesorios', 'accesorios.webp', 2),  -- 7
('Handmade_otros', 'otros.webp', 2); -- 8

-- Para Mercería
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Anillos', 'anillos.webp', 3), -- 9
('Llaveros', 'llaveros.webp', 3),  -- 10
('Marcadores', 'marcadores.webp', 3),  -- 11
('Tijeras', 'tijeras.webp', 3),  -- 12
('Merceria_otros', 'otros.webp', 3);  -- 13

-- Para Kits
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Kit crochet', 'kit_ganchillo.webp', 4), -- 14
('Kit herramientas', 'kit_principiante.webp', 4), -- 15
('Kits_otros', 'otros.webp', 4); -- 16

-- Productos metidos después
INSERT INTO subcategorias (nombre, imagen, id_categoria) VALUES 
('Llaveros', 'llaveros_handmade.webp', 2);     -- 17

INSERT INTO productos (nombre, descripcion, imagen, precio, peso, longitud, material, composicion, marca, activo, es_destacado, id_subcategoria) 
VALUES 
('Peluche Tulipán', 'Adorable peluche en forma de tulipán, tejido a mano con mucho amor.', 'peluche_tulipan.webp', 14.99, 150.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 1, 4),
('Rana Rechulona', 'Divertido peluche de rana, ideal para regalar o decorar.', 'rana_rechulona.webp', 12.50, 120.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 4),
('Tijeras de Acero Inoxidable', 'Tijeras resistentes para tus proyectos de costura y crochet.', 'tijeras_acero_inoxidable.webp', 6.99, 80.00, '12 cm', 'Acero inoxidable', NULL, 'Clover', 1, 0, 12),
('Tijeras con Funda', 'Tijeras pequeñas con funda protectora, ideales para llevar.', 'tijeras_con_funda.webp', 5.50, 70.00, '11 cm', 'Acero y plástico', NULL, 'Prym', 1, 0, 12),
('Tijeras de Plástico', 'Tijeras ligeras de plástico para uso ocasional.', 'tijeras_plastico.webp', 3.99, 60.00, '10 cm', 'Plástico', NULL, 'Genérico', 1, 0, 12),
('Tortuga Amigurumi', 'Tierna tortuga tejida a mano. Ideal para niños y coleccionistas.', 'tortuga.webp', 13.95, 130.00, NULL, 'Algodón', '80% algodón, 20% acrílico', 'Noorstitches', 1, 0, 4),
('Llavero Sandía', 'Llavero en forma de sandía, colorido y divertido.', 'watermelon_keychain.webp', 5.00, 40.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 17),
('Anillo Gato para Tejer', 'Anillo para tejer con diseño de gato, accesorio perfecto para tus proyectos.', 'anillo_gato_tejer.webp', 7.50, 50.00, '3 cm', 'Plástico', NULL, 'Noorstitches', 1, 0, 9),
('Anillo Plástico para Tejer', 'Anillo de plástico para proyectos de crochet, disponible en varios colores.', 'anillo_plastico_tejer.webp', 4.99, 45.00, '2.5 cm', 'Plástico', NULL, 'Noorstitches', 1, 0, 9),
('Caja de Bloqueo para Grannys', 'Caja organizadora con compartimentos para guardar tus bloques granny square.', 'caja_de_bloqueo_grannys.webp', 8.00, 300.00, '20 cm x 20 cm', 'Plástico', NULL, 'Noorstitches', 1, 0, 13),
('Camaleon Pascal Enredados', 'Figura tejida a mano del camaleón Pascal de la película Enredados.', 'camelon_pascal_enredados.webp', 18.00, 200.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 4),
('Capibara Tortuga', 'Peluche combinado de capibara y tortuga, diseñado a mano.', 'capibara_tortuga.webp', 19.99, 180.00, NULL, 'Algodón', '80% algodón, 20% acrílico', 'Noorstitches', 1, 0, 4),
('Dragón Random', 'Peluche de dragón hecho a mano con detalles coloridos.', 'dragon_radom.webp', 16.50, 170.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 4),
('Florecitas Hawaianas', 'Adorable conjunto de flores hawaianas de crochet, ideal para decorar.', 'florecitas_hawaianas.webp', 9.99, 80.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 5),
('Flowers', 'Hermosas flores de crochet para añadir un toque colorido a tu hogar.', 'flowers.webp', 11.99, 90.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 1, 5),
('Herramienta de Costura Ergonómica', 'Herramienta ergonómica para facilitar la costura y crochet.', 'herramienta_costura_ergonomica.webp', 15.00, 200.00, '12 cm', 'Plástico y acero', NULL, 'Clover', 1, 0, 13),
('Hilo Grueso para Ganchillo Blanco', 'Hilo grueso de alta calidad, ideal para proyectos de crochet.', 'hilo_ganchillo_grueso_blanco.webp', 4.20, 30.00, '100 m', 'Algodón', NULL, 'Noorstitches', 1, 0, 2),
('Kit Crochet Girasol', 'Kit completo para crear un hermoso girasol de crochet.', 'kit_crochet_girasol.webp', 25.00, 250.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 14),
('Kit Crochet Planta Colgante', 'Kit para tejer una planta colgante, ideal para decorar tu hogar.', 'kit_crochet_planta_colgante.webp', 27.50, 270.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 14),
('Kit Crochet Ramo', 'Kit para tejer un ramo de flores, perfecto para regalar.', 'kit_crochet_ramo.webp', 23.00, 220.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 14),
('Kit Ganchillo Avanzado', 'Kit avanzado para proyectos de crochet más complejos.', 'kit_ganchillo_avanzado.webp', 30.00, 300.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 15),
('Kit Tulip Rose', 'Kit para hacer una rosa de tulipán de crochet.', 'kit_tulip_rose.webp', 22.00, 200.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 0, 15),
('Lana Wool Blanca', 'Lana de alta calidad para proyectos de crochet.', 'lana_wool_blanco.webp', 5.50, 60.00, '100 g', 'Algodón', NULL, 'Noorstitches', 1, 0, 1),
('Lana Wool Morada', 'Lana morada para proyectos creativos de crochet.', 'lana_wool_morado.webp', 6.00, 65.00, '100 g', 'Algodón', NULL, 'Noorstitches', 1, 0, 1),
('Lana Wool Negra', 'Lana negra, ideal para proyectos de crochet de contraste.', 'lana_wool_negro.webp', 5.80, 60.00, '100 g', 'Algodón', NULL, 'Noorstitches', 1, 0, 1),
('Lana Wool Roja', 'Lana roja brillante, perfecta para proyectos vibrantes.', 'lana_wool_rojo.webp', 5.90, 62.00, '100 g', 'Algodón', NULL, 'Noorstitches', 1, 0, 1),
('Lana Wool Rosa', 'Lana rosa suave y cálida para proyectos delicados.', 'lana_wool_rosa.webp', 6.30, 63.00, '100 g', 'Algodón', NULL, 'Noorstitches', 1, 0, 1),
('Llavero', 'Llavero simple y colorido, perfecto para regalar.', 'llaveros.webp', 3.50, 20.00, NULL, 'Plástico', NULL, 'Noorstitches', 1, 0, 10),
('Llavero Multicolor', 'Llavero multicolor hecho a mano, ideal para personalizar tus llaves.', 'llaveros_multicolor.webp', 4.00, 25.00, NULL, 'Plástico', NULL, 'Noorstitches', 1, 0, 10),
('Marcadores Rosa', 'Marcadores de colores en rosa para tus proyectos de crochet.', 'marcadores_rosa.webp', 2.50, 10.00, NULL, 'Plástico', NULL, 'Noorstitches', 1, 0, 11),
('Ojos para Peluche', 'Ojos de seguridad para darle vida a tus peluches.', 'ojos_peluche.webp', 1.99, 5.00, NULL, 'Plástico', NULL, 'Noorstitches', 1, 0, 13),
('Organizador de Madera', 'Organizador de madera para guardar tus hilos y herramientas de costura.', 'organizador_madera.webp', 18.00, 500.00, '30 cm x 20 cm', 'Madera', NULL, 'Noorstitches', 1, 0, 13),
('Peluche Conejo Rosa', 'Peluche conejito rosa de crochet, ideal para regalar en cualquier ocasión.', 'peluche_conejo_rosa.webp', 15.99, 160.00, NULL, 'Algodón', '100% algodón', 'Noorstitches', 1, 1, 4);


INSERT INTO pedidos (id_usuario, fecha, importe)
VALUES (1, NOW(), 30.0);  -- 4.99 * 2 + 19.95 = 29.93

-- Insertar líneas de pedido
INSERT INTO lineas_pedido (id_pedido, id_producto, cantidad, importe)
VALUES 
(1, 1, 2, 10.0),       -- 2 unidades de "Lana Cotton Soft"
(1, 2, 1, 20.0);      -- 1 unidad de "Peluche Conejito Rosa"
