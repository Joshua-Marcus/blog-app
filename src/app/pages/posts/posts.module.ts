import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '@shared/components/components.module';
import { SharedFormsModule } from '@shared/forms/forms.module';
import { PostComponent } from './components/post.component';
import { CreatePostComponent } from './routes/create.component';
import { EditPostComponent } from './routes/edit.component';
import { PostsListComponent } from './routes/list.component';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'edit/:id', component: EditPostComponent },
];

@NgModule({
  declarations: [
    PostsListComponent,
    PostComponent,
    CreatePostComponent,
    EditPostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedFormsModule,
  ],
})
export class PostsModule {}
