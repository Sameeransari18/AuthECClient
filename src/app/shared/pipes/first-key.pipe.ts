import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstkey',
  standalone: true,
})
export class FirstkeyPipe implements PipeTransform {
  // It will take the errors from the form and displays the initial error which arrives. If there's no errors, it will return NULL.

  transform(value: any): string | null {
    const key = Object.keys(value);
    if (key && key.length > 0) return key[0]; // Returns the first error
    return null;
  }
}
