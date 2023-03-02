import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormTextComponent } from './controls/text.component';
import { FormTextareaComponent } from './controls/textarea.component';
import { PostsForm } from './posts.form';

const controls = [FormTextComponent, FormTextareaComponent];

@NgModule({
  declarations: [...controls, PostsForm],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  exports: [...controls, PostsForm],
  providers: [],
})
export class SharedFormsModule {}
