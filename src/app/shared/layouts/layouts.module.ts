import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { PrimaryLayout } from './primary.layout';

@NgModule({
  declarations: [PrimaryLayout, HeaderComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  exports: [PrimaryLayout],
  providers: [],
})
export class LayoutsModule {}
