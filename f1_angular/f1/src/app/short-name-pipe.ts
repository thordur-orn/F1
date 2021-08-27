import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortName' })
export class ShortNamePipe implements PipeTransform{
    transform(name: string){
        return name.split(' ')[0][0] + '. ' + name.split(' ')[name.split(' ').length - 1];
    }
}