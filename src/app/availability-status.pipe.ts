import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availabilityStatus'
})
export class AvailabilityStatusPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return 'Undefined';

    if (value === 'Available')
    {
      return 'In Stock'
    }

    if (value === 'Sold Out')
    {
      return 'Out Of Stock'
    }
    return value;
  }

}
