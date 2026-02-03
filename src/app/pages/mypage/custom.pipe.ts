class CustomPipe {
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

    name = 'custom'

})
export class CPipe implements PipeTransform {
    transform(value: number): number {
        return value * value;
    }
}

}