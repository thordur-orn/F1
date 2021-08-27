import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ordinal' })
export class OrdinalPipe implements PipeTransform{
    transform(nr: number){
        if(nr == 1){
            return String(nr) + 'st';
        }
        else if(nr == 2){
            return String(nr) + 'nd';
        }
        else if(nr == 3){
            return String(nr) + 'rd';
        }
        return String(nr) + 'th';
    }
}