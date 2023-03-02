import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Post } from '@types';

@Component({
  selector: 'posts-form',
  template: `
    <form
      class="space-y-6"
      [formGroup]="postFormGroup"
      (submit)="onSubmitForm()"
    >
      <div>
        <form-text
          formControlName="title"
          name="title"
          placeholder="Input the title of your post"
          label="Title"
        >
        </form-text>
      </div>
      <div>
        <form-textarea
          formControlName="body"
          name="body"
          placeholder="Input the body content of your post"
          label="Body"
        >
        </form-textarea>
      </div>
      <div class="flex justify-end space-x-3">
        <button type="button" class="default-btn">Cancel</button>
        <button type="submit" class="accent-btn">Submit</button>
      </div>
    </form>
  `,
})
export class PostsForm implements OnInit {
  // I/O
  @Output()
  saveClicked = new EventEmitter<Post>();

  @Input()
  initialModel: Post;

  postFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  async ngOnInit() {
    const c = this.initialModel;
    if (!c) {
      throw new Error('Must set "initialModel"');
    }
    this.makeForm(c);
  }

  makeForm(p: Post) {
    this.postFormGroup = this.fb.group({
      title: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
    });
    this.postFormGroup.patchValue(p);
  }

  async onSubmitForm() {
    console.log('OnClickSubmit', this.postFormGroup.valid);
    //TODO Validate Form
    if (!this.postFormGroup.valid) {
      // Form Not Valid
      console.log('Invalid Form');
      return;
    }
    const p: Post = this.postFormGroup.value;
    this.saveClicked.emit(p);
  }
}
