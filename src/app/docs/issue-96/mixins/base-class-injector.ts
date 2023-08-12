import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Directive,
  Injectable,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { AGConstructor, GConstructor } from './constructor.type';
import { Subject } from 'rxjs';

/**
 * Base directive providing implementations for Angular lifecycle hooks.
 *
 * This directive serves as an abstract base class which implements all the major
 * Angular lifecycle hooks. It also provides an observable (`_destroyed$`) to signal
 * component destruction, which can be used in conjunction with `UntilDestroy` for
 * cleanup operations.
 *
 * It is meant to be used in combination with `Base` to leverage a class with mixins
 */
@Directive()
export abstract class BaseClassInjector
  implements
    OnChanges,
    OnInit,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  protected _destroyed$ = new Subject<void>();
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewInit(): void {}
  ngAfterViewChecked(): void {}
  ngOnDestroy(): void {}
}

/**
 * Represents a type that encompasses both the generic constructor (`GConstructor`)
 * and the abstract generic constructor (`AGConstructor`) of `BaseClassInjector`.
 */
export type BaseInjectorConstructor = GConstructor<BaseClassInjector> &
  AGConstructor<BaseClassInjector>;

/**
 * Injectable service that extends `BaseClassInjector`.
 *
 * This service class provides a concrete implementation of the `BaseClassInjector`,
 * and can be used in other parts of an application where an injectable instance
 * of the base class functionality is required.
 *
 * We will mainly use it in a context of mixins in Typescript
 */
@Injectable()
export class Base extends BaseClassInjector {
  protected override _destroyed$ = new Subject<void>();
}
