import { Pipe, PipeTransform } from '@angular/core';
import {Student} from "../../core/models/student";

@Pipe({
    name: 'fullName',
    standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(value: Student): unknown {
    return `${value.lastName.toUpperCase()}, ${value.firstName}`;
  }

}
