import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { Subject } from 'rxjs';
import { auditTime, take, takeUntil } from 'rxjs/operators';

function MakeId(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function ToTitleCase(input: string): string {
  const capitalsWithSpaces = input.replace(/([A-Z])/g, ' $1').trim();
  const underscoresToSpaces = capitalsWithSpaces.replace(/_/g, ' ');
  return underscoresToSpaces
    .split(' ')
    .map((p) => p.charAt(0).toUpperCase() + p.substring(1).toLowerCase())
    .join(' ');
}

@Directive()
export class FormControlBase<T>
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  internalControl: FormControl = new FormControl();

  autoCompleteObscureName: string;
  autoCompleteText = 'no';

  disabled = false;
  validationError: string;

  _value: T;

  @Input()
  allowAutoComplete: boolean;
  @Input()
  formControlName: string;
  @Input()
  placeholder: string;
  @Input()
  label: string;
  @Input()
  name = 'default';
  @Input()
  type = 'text';

  $nginit = new Subject<void>();
  $ngdestroy = new Subject<void>();

  _destroyed = new Subject<void>();
  isRequired = false;

  constructor() {
    this.$nginit.pipe(take(1)).subscribe(() => this._init());
    this.$ngdestroy.pipe(take(1)).subscribe(() => this._destroy());
  }

  ngOnInit() {
    this.$nginit.next();
  }

  ngOnDestroy() {
    this.$ngdestroy.next();
  }

  private _init() {
    this._destroyed.next();
    if (this.allowAutoComplete) {
      this.autoCompleteObscureName = this.formControlName || this.name;
      this.autoCompleteText = 'yes';
    } else {
      this.autoCompleteObscureName = MakeId(8);
    }
    this.internalControl.valueChanges
      .pipe(takeUntil(this._destroyed))
      .pipe(auditTime(100))
      .subscribe(() => {
        this._value = this.internalControl.value;
        this.onChange(this._value);
        this.onTouched();
      });

    if (!this.label) {
      const nameParsed = ToTitleCase(this.formControlName + '');
      this.label = nameParsed;
    }
  }

  private _destroy() {
    this._destroyed.next();
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.internalControl.setValue(val);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  onTouched: any = () => {};

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    setTimeout(() => {
      if (isDisabled) {
        this.internalControl.disable();
      } else {
        this.internalControl.enable();
      }
    });
  }

  public validate(c: FormControl) {
    this.internalControl.setValidators(c.validator);
    return !this.validationError
      ? null
      : {
          validationError: {
            valid: false,
          },
        };
  }

  onChange(inputValue: T) {
    this.validationError = '';
    if (!!this.validationError) {
      this.propagateChange(this.value);
    } else {
      this.propagateChange(inputValue);
    }
  }

  generateErrorMessage() {
    let errorMessage = '';
    const errors = this.internalControl.errors;
    if (errors != null || errors != undefined) {
      Object.entries(errors).forEach(([key, value]) => {
        if (key === 'pattern') {
          errorMessage += 'Please input correct email format. ';
        } else if (key === 'required') {
          errorMessage += 'This field is required. ';
        } else if (key === 'minlength') {
          errorMessage += `The minimum length for this field is ${errors['minlength'].requiredLength} characters.`;
        } else if (key === 'maxlength') {
          errorMessage += `The maximum length for this field is ${errors['maxlength'].requiredLength} characters.`;
        } else {
          if (value.message) {
            errorMessage += value.message;
          }
        }
      });
    }

    return errorMessage;
  }
}
