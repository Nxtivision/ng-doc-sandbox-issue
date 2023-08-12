import { AbstractControl } from '@angular/forms';

/**
 * Represents an error message object for form validations.
 *
 * @usageNotes
 *
 * This interface is used to map a specific error key to a custom error message. The custom error message can either be
 * a plain string or a function that takes in the error object and the control causing the error.
 *
 * Example:
 *
 * ```typescript
 * const requiredErrorMessage: OneErrorMessage = {
 *   key: 'required',
 *   message: 'This field is required.'
 * };
 *
 * const maxLengthErrorMessage: OneErrorMessage = {
 *   key: 'maxlength',
 *   message: (error, control) => `The maximum allowed length is ${error.requiredLength}. You entered ${control.value.length} characters.`
 * };
 * ```
 *
 */
export interface OneErrorMessage {
  /** The key representing the type of the validation error, e.g. 'required', 'maxlength', etc. */
  key: string;
  /**
   * The custom error message. Can either be a plain string or a function that takes the error object and
   * the control causing the error and returns the custom error message.
   */
  message: string | ((error: any, control: AbstractControl) => string);
}
