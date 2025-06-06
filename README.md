# 🧶 NoorStitches

Tienda online de productos y materiales de crochet, desarrollada como Proyecto Fin de Ciclo (DAW).  
Incluye un frontend en Angular y un backend en Spring Boot con persistencia en MySQL.

---

## 🛠️ Tecnologías utilizadas

| Parte        | Tecnología         |
|--------------|--------------------|
| Frontend     | Angular 19, Bootstrap 5 |
| Backend      | Spring Boot        |
| Base de datos| MySQL              |
| Diseño       | Figma              |
| Control de versiones | Git con Gitflow |

---

## 📁 Estructura del proyecto

```
noorstitches/
├── frontend/       → Proyecto Angular con componentes, servicios y estilos
├── backend/        → Proyecto Spring Boot con controladores, servicios, repositorios, etc.
                    → Scripts SQL para creación e inserción de datos
```

---

## 🚀 Instrucciones para ejecutar el proyecto

### 🔹 Frontend

1. Abre la terminal en la carpeta `frontend/`.
2. Ejecuta el siguiente comando:
   ```bash
   npm install
   ```
3. Luego:
   ```bash
   ng serve
   ```
4. Abre http://localhost:4200 en tu navegador.

### 🔹 Backend

1. Abre el proyecto en tu IDE (Eclipse, IntelliJ...).
2. Asegúrate de tener creada la base de datos MySQL y actualiza `application.properties` si es necesario.
3. Ejecuta lo siguiente:
   ```bash
   mvn clean
   mvn install
   ```
4. En el IDE, haz clic derecho en el proyecto y selecciona **Update Project** (en Eclipse).
5. Ejecuta la clase `NoorstitchesApplication.java`.
6. El backend quedará activo en: http://localhost:8888

---

## 🧪 Funcionalidades principales

- Registro e inicio de sesión
- Visualización de productos
- Filtro de productos por nombre y subcategoría
- Gestión de productos favoritos
- Carrito de compra
- Pago con PayPal (sandbox)
- Perfil de usuario y listado de pedidos
- Página de contacto con envío de email mediante JavaMailSender

---

## 🎨 Diseño UI/UX

- Prototipado en Figma
- Responsive con Bootstrap 5
- Navegación intuitiva y estructura clara

---

## 📌 Notas

- Este proyecto fue desarrollado como parte de un entorno educativo.
- El entorno de pago está conectado al sandbox de PayPal.
- Puedes usarlo como base para tus propios proyectos o como referencia fullstack.

---

## 💡 Contacto

Si quieres más información o tienes dudas, puedes contactar a la autora del proyecto a través de los datos que aparecen en el documento original del TFG.

📧 nalosag@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/noor-aloune-sagouma-113b44369/)
