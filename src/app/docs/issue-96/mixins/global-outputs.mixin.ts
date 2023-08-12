/* eslint-disable @angular-eslint/no-output-native */
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseClassInjector } from './base-class-injector';
import { AGConstructor, GConstructor } from './constructor.type';
import { MatInput } from '@angular/material/input';
import { fromEvent, takeUntil, tap } from 'rxjs';

/**
 * Represents an interface for components that will emit a `blur` event.
 * This can be used to augment components with additional global outputs like blur.
 */
export interface HasGlobalOutputs {
  /**
   * Event emitter for the `blur` event.
   * This can be used by the parent component to listen for blur events on the child component.
   */
  blur: EventEmitter<FocusEvent>;
}

type HasGlobalOutputsCtor = GConstructor<HasGlobalOutputs> &
  AGConstructor<HasGlobalOutputs>;

const outputs = ['blur'] as const;

/**
 * Metadata constant that provides the necessary outputs for the `mixinGlobalOutputs`.
 */
export const MIXIN_GLOBAL_OUTPUTS = {
  outputs,
};

/**
 * A mixin function that augments a given class with the properties and behaviors defined in the `HasGlobalOutputs` interface.
 * This mixin provides functionality for emitting global output events like blur from a component.
 *
 * @usageNotes
 * When you want your component to emit global outputs like blur, you can utilize this mixin.
 *
 * ```typescript
 * @Component({
 *   ...,
 *   inputs: [
 *     ...MIXIN_GLOBAL_OUTPUTS.inputs
 *   ]
 * })
 * export class YourComponent extends mixinGlobalOutputs(Base) {
 *   // Your component logic here
 * }
 * ```
 *
 * @param Base The base class that will be extended with the properties and behaviors of `HasGlobalOutputs`.
 * @returns A new class that extends the base with `HasGlobalOutputs` behaviors.
 */
export function mixinGlobalOutputs<
  TBase extends AGConstructor<BaseClassInjector>
>(Base: TBase): HasGlobalOutputsCtor & TBase;
export function mixinGlobalOutputs<
  TBase extends GConstructor<BaseClassInjector>
>(Base: TBase): HasGlobalOutputsCtor & TBase {
  @Directive()
  class GlobalOutputMixin
    extends Base
    implements HasGlobalOutputs, AfterViewInit
  {
    @Output() blur = new EventEmitter<FocusEvent>();

    @ViewChild(MatInput, { read: ElementRef }) myInput: ElementRef | undefined;

    override ngAfterViewInit() {
      super.ngAfterViewInit();
      for (const output of outputs) {
        if (this.myInput) {
          fromEvent(this.myInput?.nativeElement, output)
            .pipe(
              tap((evt: any) => {
                this[output].emit(evt);
              }),
              takeUntil(this._destroyed$)
            )
            .subscribe();
        }
      }
    }
  }
  return GlobalOutputMixin;
}
