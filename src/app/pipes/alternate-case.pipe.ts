import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alternateCase',
  standalone: true
})
export class AlternateCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    return value.split('').map((char, index) => {
      return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    }).join('');
  }

}
