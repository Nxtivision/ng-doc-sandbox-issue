import { Directive } from '@angular/core';
import { BaseClassInjector } from './base-class-injector';
import { AGConstructor, GConstructor } from './constructor.type';

/**
 * Represents an interface for elements that have a minimum and maximum length constraint.
 * Typically used for text inputs to provide boundary values for text length.
 */
export interface HasLength {
  /**
   * Specifies the minimum length constraint for a text input or textarea.
   */
  minLength: string | number | null;

  /**
   * Specifies the maximum length constraint for a text input or textarea.
   */
  maxLength: string | number | null;
}

type HasLengthCtor = GConstructor<HasLength> & AGConstructor<HasLength>;

/**
 * Metadata constant that defines the necessary inputs for the `mixinLength`.
 * It lists the inputs (`minLength` and `maxLength`) that should be bound to the component.
 */
export const MIXIN_METADATA_LENGTH = {
  inputs: ['minLength', 'maxLength'] as const,
};
/**
 * A mixin function that augments a given class with the properties and behaviors defined in the `HasLength` interface.
 * This mixin provides functionality for handling maximum and minimum text length constraints.
 * @usageNotes
 * This mixin is mainly utilized for HTML elements like `input[type=text]` and `textarea`. When applied, it ensures
 * that the input respects the provided `minLength` and `maxLength` constraints.
 *
 * ```typescript
 * @Component({
 *   ...,
 *   inputs: [
 *  ...MIXIN_METADATA_LENGTH.inputs
 *   ]
 * })
 * export class TextInputComponent extends mixinLength(Base) {
 *   // Your component logic here
 * }
 * ```
 *
 * @param Base The base class that will be extended with the properties and behaviors of `HasLength`.
 * @returns A new class that extends the base with `HasLength` behaviors.
 */

export function mixinLength<TBase extends AGConstructor<BaseClassInjector>>(
  Base: TBase
): HasLengthCtor & TBase;
export function mixinLength<TBase extends GConstructor<BaseClassInjector>>(
  Base: TBase
): HasLengthCtor & TBase {
  @Directive()
  class LengthValidatorTemplate extends Base implements HasLength {
    minLength: string | number | null = null;
    maxLength: string | number | null = null;
  }
  return LengthValidatorTemplate;
}
