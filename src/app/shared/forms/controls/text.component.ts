import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from './control.base';

@Component({
  selector: 'form-text',
  template: `
    <label [for]="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        [name]="autoCompleteObscureName"
        [id]="autoCompleteObscureName"
        [type]="type"
        [autocomplete]="autoCompleteText"
        [placeholder]="placeholder"
        [formControl]="internalControl"
        [maxlength]="maxlength"
        [value]="default"
        required
        [class]="errorBorder() ? 'border-red-300' : 'border-gray-300'"
        class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      <div
        class="alert text-xs text-red-600 mt-1.5"
        *ngIf="
          !internalControl.valid &&
          internalControl.touched &&
          internalControl.dirty
        "
      >
        <div>{{ this.generateErrorMessage() }}</div>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormTextComponent),
      multi: true,
    },
  ],
})
export class FormTextComponent
  extends FormControlBase<string>
  implements OnInit
{
  @Input()
  maxlength: number;

  @Input()
  default: string;

  errorBorder() {
    return (
      !this.internalControl.valid &&
      this.internalControl.touched &&
      this.internalControl.dirty
    );
  }
}
