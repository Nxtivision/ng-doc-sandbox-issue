import {NgDocPage} from '@ng-doc/core';
import {ExampleFormInputComponent} from "./example-form-input.component";
import {TextComponent} from "./text/text.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

const Issue96Page: NgDocPage = {
	title: `issue-96`,
	mdFile: './index.md',
  demos: {
    ExampleFormInputComponent
  },
  imports: [ReactiveFormsModule],
  playgrounds: {
    FormInputPlayground: {
      target: TextComponent,
      template: `<ng-doc-selector [formControl]="data.formControl"></ng-doc-selector>`,
      defaults: {
        label: 'Texte',
        placeholder: 'Enter some text',
        description: 'Explain anything you want',
      },
      data: {
        formControl: new FormControl(''),
      }
    }
  }
};

export default Issue96Page;
