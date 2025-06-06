export class FormUtils {
  // Formato de correo electrónico
  static emailPattern = '^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$';

  // Al menos 8 caracteres, una mayúscula, una minúscula y un número
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

  // Nombre: solo letras, acepta tildes y la ñ. Mínimo 2 letras.
  static nombrePattern = "^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\\s[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})*$";

  // Apellidos: igual que el nombre, pero permite dos palabras separadas por espacio
  static apellidoPattern = "^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\\s[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})?$";

  // Teléfono: opcionalmente empieza con '+', seguido de 9 a 15 dígitos
  static telefonoPattern = '^\\+?[0-9]{9,15}$';

  static textoLargoPattern = "^[\\wÁÉÍÓÚáéíóúÑñ\\s.,!?¿¡()\\-]{3,}$";

  static motivoPattern = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}$';

  // Calle: letras, números, espacios, comas, puntos, º y ª. Mínimo 5 caracteres.
  static callePattern = "^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9ºª.,\\s]{5,}$";

  // Ciudad: solo letras y espacios, mínimo 2 letras
  static ciudadPattern = "^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\\s[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})*$";

  // Provincia: igual que ciudad
  static provinciaPattern = FormUtils.ciudadPattern;

  // Código postal: entre 4 y 10 dígitos (puedes ajustarlo según el país)
  static codigoPostalPattern = '^[0-9]{4,10}$';

  // País: letras y espacios, mínimo 2 letras
  static paisPattern = "^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\\s[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})*$";

}
