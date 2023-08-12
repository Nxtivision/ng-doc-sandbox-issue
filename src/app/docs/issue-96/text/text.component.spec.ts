import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { OneFormsModule, TextComponent } from '@one/forms';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

describe('TextComponent', () => {
  let spectator: SpectatorHost<TextComponent>;
  const createHost = createHostFactory({
    component: TextComponent,
    imports: [FormsModule, ReactiveFormsModule, OneFormsModule],
  });

  const template = `
      <one-forms-input-text 
        label='text'
        [formControl]='formControl'
      ></one-forms-input-text>
    `;

  it('component is successfully created', () => {
    spectator = createHost(template, {
      hostProps: {
        formControl: new FormControl(''),
      },
    });
    expect(spectator.component).toBeDefined();
  });

  it('is of type="text"', () => {
    spectator = createHost(template, {
      hostProps: {
        formControl: new FormControl(''),
      },
    });
    expect(spectator.query('input')).toHaveAttribute('type', 'text');
  });

  it('works with ngModel', async () => {
    const template = `
        <one-forms-input-text 
          label='text'
          [(ngModel)]='ngModel'
        ></one-forms-input-text>
      `;
    spectator = createHost(template, {
      hostProps: {
        ngModel: '',
      },
    });

    expect(spectator.component).toBeDefined();

    const userInput = 'myText';
    const input = spectator.query('input', { root: true }) as HTMLInputElement;
    spectator.typeInElement(String(userInput), input);
    spectator.blur(input);

    expect((spectator.hostComponent as any).ngModel).toBe(userInput);
  });

  it('works with FormGroup context', () => {
    const template = `
      <form [formGroup]='formGroup'>
        <one-forms-input-text 
          label='text'
          formControlName='myText'
        ></one-forms-input-text>
      </form>
    `;
    spectator = createHost(template, {
      hostProps: {
        formGroup: new FormGroup({
          myText: new FormControl(''),
        }),
      },
    });

    const userInput = 'myText';
    const input = spectator.query('input', { root: true }) as HTMLInputElement;
    spectator.typeInElement(String(userInput), input);
    spectator.blur(input);

    const formGroup = (spectator.hostComponent as any).formGroup as FormGroup;

    expect(formGroup.valid).toBe(true);
    expect(formGroup.value).toStrictEqual({ myText: userInput });
  });
});
