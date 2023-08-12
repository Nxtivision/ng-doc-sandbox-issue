import { BaseClassInjector } from './base-class-injector';
import { Directive } from '@angular/core';
import { AGConstructor, GConstructor } from './constructor.type';

/**
 * Represents an interface for elements that have a minimum and maximum value constraint.
 * Typically used for number and time inputs to provide boundary values.
 */
export interface HasMinMax {
  /** Specifies the minimum value constraint for a number or time input.
   * It utilizes Angular's built-in `MinValidator`.
   */
  min: string | number | null;
  /** Specifies the maximum value constraint for a number or time input.
   * It utilizes Angular's built-in `MaxValidator`.
   */
  max: string | number | null;
}

type HasMinMaxCtor = AGConstructor<HasMinMax> & GConstructor<HasMinMax>;

/**
 * Metadata constant that defines the necessary inputs for the `mixinMinMax`.
 * It lists the inputs (`min` and `max`) that should be bound to the component.
 */
export const MIXIN_METADATA_MIN_MAX = {
  inputs: ['min', 'max'] as const,
};

/**
 * A mixin function that augments a given class with the properties and behaviors defined in the `HasMinMax` interface.
 * This mixin provides functionality for handling maximum and minimum value constraints.
 *
 * @usageNotes
 * This mixin is mainly utilized for HTML elements like `input[type=number]`. When applied, it ensures
 * that the input respects the provided `min` and `max` constraints using Angular's built-in validators.
 *
 * ```typescript
 * @Component({
 *   ...,
 *   inputs: [
 *     ...MIXIN_METADATA_MIN_MAX.inputs
 *   ]
 * })
 * export class NumericInputComponent extends mixinMinMax(Base) {
 *   // Your component logic here
 * }
 * ```
 *
 * @param Base The base class that will be extended with the properties and behaviors of `HasMinMax`.
 * @returns A new class that extends the base with `HasMinMax` behaviors.
 */
export function mixinMinMax<TBase extends AGConstructor<BaseClassInjector>>(
  Base: TBase
): HasMinMaxCtor & TBase;
export function mixinMinMax<TBase extends GConstructor<BaseClassInjector>>(
  Base: TBase
): HasMinMaxCtor & TBase {
  @Directive()
  class MinMaxValidatorTemplate extends Base implements HasMinMax {
    min: string | number | null = null;
    max: string | number | null = null;
  }
  return MinMaxValidatorTemplate;
}
