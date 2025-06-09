# Usa la imagen oficial con JDK 21
FROM eclipse-temurin:21-jdk

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copia todo el contenido del proyecto al contenedor
COPY . .

# Da permisos de ejecución al wrapper de Maven
RUN chmod +x ./mvnw

# Construye el proyecto sin ejecutar tests
RUN ./mvnw clean install -DskipTests

# Expone el puerto que usa tu app (cámbialo si es necesario)
EXPOSE 8888

# Comando para arrancar la app (modifica el nombre del jar si es distinto)
CMD ["java", "-jar", "target/noorstitches-back-0.0.1-SNAPSHOT.jar"]
