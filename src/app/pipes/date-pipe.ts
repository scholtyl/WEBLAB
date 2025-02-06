import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datePipe' })
export class DatePipe implements PipeTransform {
  transform(date?: Date): string {
    return date ? date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "";
  }
}
