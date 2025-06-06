export class FormUtils {
  // Formato de correo electrónico
  static emailPattern = '^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$';

  // Al menos 8 caracteres, una mayúscula, una minúscula y un número
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

  // Nombre: solo letras, acepta tildes y la ñ. Mínimo 2 letras.
  static nombrePattern = "^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\\s[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})*$";

  // Apellidos: igual que el nombre, pero permite dos palabras separadas por espacio
  static apellidoPattern = "^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\\s[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})?$";

  // Teléfono: 9 a 12 dígitos numéricos
  static telefonoPattern = '^[0-9]{9,15}$';

  static textoLargoPattern = "^[\\wÁÉÍÓÚáéíóúÑñ\\s.,!?¿¡()\\-]{3,}$";

  static motivoPattern = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}$';

}