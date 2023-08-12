import { inject, InjectionToken } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export const FORM_CONTROL = new InjectionToken<NgControl>('FORM_CONTROL');

export const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
  writeValue(): void {},
  registerOnChange(): void {},
  registerOnTouched(): void {},
};

export const FORM_CONTROL_PROVIDER = {
  provide: FORM_CONTROL,
  useFactory: () => {
    const ngControl = inject(NgControl, { optional: true, self: true });
    if (!ngControl) {
      throw new Error(`
        No provided ngControl.
        Possible errors:
          1) You forgot to import FormsModule and/or ReactiveFormsModule
          2) The control does not have ngModel / formControl / formControlName
      `);
    }
    if (ngControl) {
      ngControl.valueAccessor = NOOP_VALUE_ACCESSOR;
    }
    return ngControl;
  },
};
