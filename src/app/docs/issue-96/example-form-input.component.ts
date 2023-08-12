import {Component} from "@angular/core";
import {TextComponent} from "./text/text.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-demo-form-input',
  imports: [
    TextComponent,
    ReactiveFormsModule
  ],
  template: `
    <one-forms-input-text [formControl]="control" label="Test"></one-forms-input-text>
  `
})
export class ExampleFormInputComponent {
  control = new FormControl('')
}
