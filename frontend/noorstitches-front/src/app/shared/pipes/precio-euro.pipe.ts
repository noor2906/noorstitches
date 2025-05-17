import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioEuro'
})
export class PrecioEuroPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  }
}
