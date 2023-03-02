import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  exports: [LoaderComponent],
  providers: [],
})
export class SharedComponentsModule {}
