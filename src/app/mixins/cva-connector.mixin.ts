import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NgModel,
} from '@angular/forms';
import {
  Directive,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Base, BaseClassInjector } from './base-class-injector';
import { OneErrorMessage } from '../models';
import { AGConstructor, GConstructor } from './constructor.type';
import { FORM_CONTROL } from '../tokens';
import { takeUntil, tap } from 'rxjs';

/**
 * Represents an interface to be used alongside the mixin `mixinCVAConnector`.
 * The interface defines a set of properties and methods to enhance custom controls with predefined behavior.
 */
export interface HasCva<T> {
  /** Default class applied to the host element.
   * @default true
   * @usageNotes
   * This field, when true, applies the class 'class.one-forms-input' to the host element.
   */
  hostClass: boolean;

  /** Determines the 'user-select' CSS property value.
   * @default 'auto'
   */
  userSelectMode: string;

  /** Defines the 'display' CSS property directly on the host.
   * @default 'inline-block'
   */
  hostDisplay: string;

  /** Sets the width property for this control.
   * @default '100%'
   */
  width: string;

  /** Used to control the denseness of the layout. */
  dense: boolean;

  /** Placeholder for the input when no user input exists.
   * @default ''
   */
  placeholder: string;

  /** Label to identify the input.
   * @default ''
   */
  label: string;

  /** Determines if the input is required to be filled.
   * @default false
   */
  required: boolean;

  /** Determines if the input is in readonly mode, allowing only data consultation.
   * @default false
   */
  readonly: boolean;

  /** If true, the 'without-label' class is added to the host component when no label is provided. */
  hostWithoutLabel: boolean;

  /** If true, the 'readonly' class is added to the host component when input is in readonly mode. */
  hostReadonly: boolean;

  /** Descriptive message for the input, sets the 'mat-hint'.
   * @default ''
   */
  description: string;

  /** Allows specification of custom error messages for this control.
   * @usageNotes
   * ```typescript
   * // Existing error for 'required', customize the message
   * [
   *   {
   *     key: 'required',
   *     message: (error, ctrl) => "It must be filled"
   *   }
   * ]
   * // Or, without a function
   * [
   *   {
   *     key: 'required',
   *     message: 'It must be filled'
   *   }
   * ]
   * ```
   */
  customErrors: OneErrorMessage[];

  /** Provides a shortcut to access the associated `FormControl`. */
  control: AbstractControl<T> | null;

  /** Used internally to ensure compatibility with `NgControl`. */
  ngControl: NgControl | null;

  /** Registers a touch event handler. */
  registerOnTouched(fn: unknown): void;

  /** Registers a change event handler. */
  registerOnChange(fn: unknown): void;

  /** Writes a new value to the control. */
  writeValue(obj: T): void;

  /** Disables or enables the control based on the provided flag. */
  setDisabledState(isDisabled: boolean): void;
}

type HasCvaCtor<T> = GConstructor<HasCva<T>> & AGConstructor<HasCva<T>>;

/**
 * A constant defining the necessary metadata for the `mixinCVAConnector`.
 * It details inputs that should be bound to the component.
 */
export const MIXIN_METADATA_CVA_CONNECTOR = {
  inputs: [
    'label',
    'placeholder',
    'description',
    'required',
    'readonly',
    'customErrors',
    'width',
    'dense',
    'formControlName',
    'formControl',
  ] as const,
};

/**
 * A mixin function that extends a given class with the capabilities and behaviors defined in the `HasCva` interface.
 * @usageNotes
 * When implementing a custom input, using this mixin ensures that default properties, behaviors, and host bindings are inherited.
 * The mixin integrates with the Angular's `ControlValueAccessor` to allow for a consistent handling of form control values and interactions.
 */
export function mixinCVAConnector<
  T = string,
  TBase extends AGConstructor<BaseClassInjector> = AGConstructor<Base>
>(BaseKlass: TBase): HasCvaCtor<T> & TBase;
export function mixinCVAConnector<
  T = string,
  TBase extends GConstructor<BaseClassInjector> = GConstructor<Base>
>(BaseKlass: TBase): HasCvaCtor<T> & TBase {
  @Directive()
  class ControlValueAccessorConnector
    extends BaseKlass
    implements ControlValueAccessor, HasCva<T>, OnInit, OnDestroy
  {
    ngControl = inject(FORM_CONTROL);

    @HostBinding('class.one-forms-input')
    hostClass = true;
    @HostBinding('style.user-select')
    userSelectMode = 'auto';
    @HostBinding('style.display') hostDisplay = 'inline-block';
    @HostBinding('style.width') width = '100%';

    @HostBinding('class.without-label')
    get hostWithoutLabel() {
      return this.label === '';
    }

    @HostBinding('class.readonly')
    get hostReadonly() {
      return this.readonly;
    }

    get control(): AbstractControl<T> | null {
      return this.ngControl.control;
    }

    placeholder = '';
    label = '';
    private _required = false;
    get required() {
      return this._required;
    }

    set required(val: boolean) {
      this._required = val;
    }

    readonly = false;
    description = '';
    dense = false;
    customErrors: OneErrorMessage[] = [];

    override ngOnInit() {
      // Necessary to make ngModelChange work
      if (this.ngControl instanceof NgModel) {
        this.ngControl.control.valueChanges
          .pipe(
            takeUntil(this._destroyed$),
            tap((val: any) => this.ngControl.viewToModelUpdate(val))
          )
          .subscribe();
      }

      this.required = this._required;
    }

    registerOnTouched(fn: unknown): void {
      this.ngControl?.valueAccessor?.registerOnTouched(fn);
    }

    registerOnChange(fn: unknown): void {
      this.ngControl?.valueAccessor?.registerOnChange(fn);
    }

    writeValue(obj: T): void {
      this.ngControl?.valueAccessor?.writeValue(obj);
    }

    setDisabledState(isDisabled: boolean): void {
      this.ngControl?.valueAccessor?.setDisabledState &&
        this.ngControl?.valueAccessor.setDisabledState(isDisabled);
    }
  }

  return ControlValueAccessorConnector;
}
