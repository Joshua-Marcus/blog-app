import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotToastModule } from '@ngneat/hot-toast';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from '@shared/layouts/layouts.module';
import { PrimaryLayout } from '@shared/layouts/primary.layout';

import { AppComponent } from './app.component';
import { GraphQLModule } from './gql/graphql.module';

const routes: Routes = [
  {
    path: '',
    component: PrimaryLayout,
    children: [
      {
        path: 'posts',
        loadChildren: () =>
          import('./pages/posts/posts.module').then((m) => m.PostsModule),
      },
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    RouterModule.forRoot(routes),
    LayoutsModule,
    HotToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
