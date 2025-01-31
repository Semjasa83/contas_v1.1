import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
    name: 'dateFormat',
    standalone: true
})
export class DateFormatPipe implements PipeTransform {
    transform(value: Date | string | null): string {
        if (!value) return '';
        return format(new Date(value), 'dd.MM.yyyy');
    }
}