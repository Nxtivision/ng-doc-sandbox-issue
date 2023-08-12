import { Component, HostBinding } from '@angular/core';
import {
  Base,
  MIXIN_METADATA_CVA_CONNECTOR,
  MIXIN_METADATA_ERROR_STATE_MATCHER,
  MIXIN_METADATA_LENGTH,
  MIXIN_GLOBAL_OUTPUTS,
  mixinGlobalOutputs,
  mixinCVAConnector,
  mixinErrorStateMatcher,
  mixinLength,
} from '../mixins';
import { FORM_CONTROL_PROVIDER } from '../tokens';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {AsFormControlPipe} from "../as-form-control.pipe";

/**
 * A custom input component for text fields. It provides a labeled text input field
 * with options for prefix and suffix elements, including icon. Integrates functionalities
 * from various mixins to handle form control behaviors, length validations, and error states.
 *
 * @usageNotes
 *
 * ### Basic Usage
 *
 * Assuming you have a FormGroup:
 * ```typescript
 * form: FormGroup = this.fb.group({
 *   username: ['', Validators.required],
 *   description: ['']
 * });
 * ```
 *
 * Use the component within a form:
 *
 * ```html
 * <form [formGroup]="form">
 *   <one-forms-input-text
 *     [label]="'Username'"
 *     [placeholder]="'Enter your username'"
 *     [required]="true"
 *     [maxlength]="10"
 *     formControlName="username">
 *     <span prefix><mat-icon>account_circle</mat-icon></span>
 *   </one-forms-input-text>
 * </form>
 * ```
 *
 * ### Using Prefix, Suffix, and Icons
 *
 * ```html
 * <form [formGroup]="form">
 *   <one-forms-input-text formControlName="description">
 *     <span prefix>Info: </span>
 *     <span suffix><mat-icon>info</mat-icon></span>
 *   </one-forms-input-text>
 * </form>
 * ```
 *
 * **Note:** The direct use of the `icon` input property is deprecated. Instead, you should wrap the `<mat-icon>` inside a `<span>` with either `prefix` or `suffix` as demonstrated above.
 */
@Component({
  selector: 'one-forms-input-text',
  templateUrl: './text.component.html',
  styles: [],
  providers: [FORM_CONTROL_PROVIDER],
  inputs: [
    ...MIXIN_METADATA_CVA_CONNECTOR.inputs,
    ...MIXIN_METADATA_LENGTH.inputs,
    ...MIXIN_METADATA_ERROR_STATE_MATCHER.inputs,
  ],
  outputs: [...MIXIN_GLOBAL_OUTPUTS.outputs],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    AsFormControlPipe
  ],
})
export class TextComponent extends mixinCVAConnector(
  mixinGlobalOutputs(mixinLength(mixinErrorStateMatcher(Base)))
) {
  /**
   * Used to implement a CSS class directly on the host
   * @internal
   */
  @HostBinding('class.one-forms-input-text')
  override hostClass = true;
}
