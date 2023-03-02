import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from './control.base';

@Component({
  selector: 'form-textarea',
  template: `
    <label [for]="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1">
      <textarea
        [name]="autoCompleteObscureName"
        [id]="autoCompleteObscureName"
        [autocomplete]="autoCompleteText"
        [placeholder]="placeholder"
        [formControl]="internalControl"
        [rows]="rows"
        required
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      ></textarea>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextareaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormTextareaComponent),
      multi: true,
    },
  ],
})
export class FormTextareaComponent
  extends FormControlBase<string>
  implements OnInit
{
  @Input()
  rows: number;
}
