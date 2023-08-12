import { BaseClassInjector } from './base-class-injector';
import { Directive, inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { AGConstructor, GConstructor } from './constructor.type';

/**
 * Represents an interface that allows components to customize how they manage and display error states.
 * This is typically used in form controls to adjust when and how error messages are shown.
 */
export interface HasErrorStateMatcher {
  /**
   * A custom error state matcher that defines the conditions under which errors should be shown.
   * If not provided, the `defaultErrorStateMatcher` will be used.
   * @default undefined
   */
  errorStateMatcher: ErrorStateMatcher | undefined;

  /**
   * The default error state matcher that's used when a custom `errorStateMatcher` is not provided.
   * This provides a consistent error handling behavior across the application.
   */
  defaultErrorStateMatcher: ErrorStateMatcher;
}

type HasErrorStateMatcherCtor = GConstructor<HasErrorStateMatcher> &
  AGConstructor<HasErrorStateMatcher>;

/**
 * Metadata constant that provides the necessary inputs for the `mixinErrorStateMatcher`.
 * It lists the inputs (`errorStateMatcher`) that should be bound to the component.
 */
export const MIXIN_METADATA_ERROR_STATE_MATCHER = {
  inputs: ['errorStateMatcher'] as const,
};

/**
 * A mixin function that augments a given class with the properties and behaviors defined in the `HasErrorStateMatcher` interface.
 * This mixin provides functionality for customizing the error state matching behavior of form controls.
 * @usageNotes
 * When you want to customize how a form control detects and displays its error state, you can utilize this mixin.
 *
 * ```typescript
 * @Component({
 *   ...,
 *   inputs: [
 *     ...MIXIN_METADATA_ERROR_STATE_MATCHER.inputs,
 *   ]
 * })
 * export class CustomFormControlComponent extends mixinErrorStateMatcher(Base) {
 *   // Your component logic here
 * }
 * ```
 *
 * @param Base The base class that will be extended with the properties and behaviors of `HasErrorStateMatcher`.
 * @returns A new class that extends the base with `HasErrorStateMatcher` behaviors.
 */
export function mixinErrorStateMatcher<
  TBase extends AGConstructor<BaseClassInjector>
>(Base: TBase): HasErrorStateMatcherCtor & TBase;
export function mixinErrorStateMatcher<
  TBase extends GConstructor<BaseClassInjector>
>(Base: TBase): HasErrorStateMatcherCtor & TBase {
  @Directive()
  class CustomErrorStateMatcher extends Base implements HasErrorStateMatcher {
    errorStateMatcher: ErrorStateMatcher | undefined;
    private _defaultErrorStateMatcher = inject(ErrorStateMatcher);

    get defaultErrorStateMatcher() {
      return this._defaultErrorStateMatcher;
    }
  }
  return CustomErrorStateMatcher;
}
