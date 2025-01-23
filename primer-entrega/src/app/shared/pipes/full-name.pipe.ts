import { Pipe, PipeTransform } from '@angular/core';
import {Alumno} from "../interfaces/alumno";

@Pipe({
  name: 'fullName',
  standalone: true
})
export class FullNamePipe implements PipeTransform {

  transform(value: Alumno) {
    // Formato del estilo 'APELLIDO, Nombre'.
    return `${value.apellido.toUpperCase()}, ${value.nombre}`;
  }

}
