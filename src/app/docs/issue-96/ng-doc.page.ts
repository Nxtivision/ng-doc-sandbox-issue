import {NgDocPage} from '@ng-doc/core';
import {ExampleFormInputComponent} from "./example-form-input.component";
import {TextComponent} from "./text/text.component";
import {FormControl} from "@angular/forms";

const Issue96Page: NgDocPage = {
	title: `issue-96`,
	mdFile: './index.md',
  demos: {
    ExampleFormInputComponent
  },
  playgrounds: {
    FormInputPlayground: {
      target: TextComponent,
      template: `<ng-doc-selector></ng-doc-selector>`,
      defaults: {
        formControl: new FormControl(''),
        label: 'Texte',
        placeholder: 'Enter some text',
        description: 'Explain anything you want',
      }
    }
  }
};

export default Issue96Page;
