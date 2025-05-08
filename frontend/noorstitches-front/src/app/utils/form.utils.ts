export class FormUtils {
    // Expresiones regulares
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'; // Formato de correo electrónico
    static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'; // Al menos 8 caracteres, una mayúscula, una minúscula y un número
}