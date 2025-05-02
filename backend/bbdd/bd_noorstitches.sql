DROP DATABASE IF EXISTS noorstitches;
CREATE SCHEMA `noorstitches` DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci;
USE noorstitches;

-- Tabla usuarios
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwd VARCHAR(500) NOT NULL, 
    foto_perfil VARCHAR(255) NOT NULL DEFAULT 'user.png', 
    telefono VARCHAR(15) -- VARCHAR(15) para incluir prefijos internacionales en el futuro
);

-- Tabla de categorías
CREATE TABLE categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Tabla de subcategorías
CREATE TABLE subcategorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_categoria BIGINT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);


/*
CREATE TABLE marcas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);
*/

-- Tabla productos
CREATE TABLE productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    peso DECIMAL(6, 2), -- opcional, en gramos
    longitud VARCHAR(255), -- opcional, en metros o cm
    material VARCHAR(255), -- opcional: algodón, acrílico, etc.
    composicion VARCHAR(255), -- opcional: 60% algodón, 40% acrílico
    marca VARCHAR(255),
    activo boolean default true,
	id_subcategoria BIGINT,
    FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id)
);

-- Tabla pedidos
CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT,
    fecha DATETIME,
    importe DECIMAL(10, 2), 
    estado ENUM('pendiente', 'enviado', 'cancelado') DEFAULT 'pendiente',
    -- num_seguimiento VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla lineas de pedido: cuantos articulos metes, la cantidad
CREATE TABLE lineas_pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_pedido BIGINT,
    id_producto BIGINT,
    cantidad INT NOT NULL,
--     precio_unitario DECIMAL(10, 2) NOT NULL,
--     precio_total DECIMAL(10, 2) AS (cantidad * precio_unitario) STORED, -- precioTotal se calcula como cantidad * precioUnitario y se almacena en la base de datos con 'STORED'
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- Tabla productos guardados (Lista de deseos)
CREATE TABLE producto_guardado (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT,
    id_producto BIGINT,
    fecha_guardado DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);
