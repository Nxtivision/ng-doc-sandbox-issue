import {Pipe, PipeTransform} from "@angular/core";
import {AbstractControl, FormControl} from "@angular/forms";

/**
 * A Pipe used to assert that a given AbstractControl is a FormControl.
 *
 * @usageNotes
 *
 * You can use this pipe in your Angular templates when you need to access specific properties or methods of a FormControl:
 *
 * ```html
 * <input [formControl]="myForm.get('myControl') | asFormControl">
 * ```
 *
 * Please note that if the provided value is not a FormControl, an error will be thrown.
 */
@Pipe({
  name: 'asFormControl',
  standalone: true
})
export class AsFormControlPipe implements PipeTransform {
  transform<T>(value: AbstractControl<T> | null): FormControl<T> {
    if (!(value instanceof FormControl))
      throw new Error('value is not a FormControl');
    return value as FormControl<T>;
  }
}
