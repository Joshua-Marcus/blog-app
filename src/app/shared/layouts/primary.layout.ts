import { Component } from '@angular/core';

@Component({
  selector: 'primary-layout',
  template: ` <div class="flex flex-col p-8 lg:px-10">
    <app-header></app-header>
    <div class="mx-auto max-w-7xl py-12 w-full">
      <router-outlet> </router-outlet>
    </div>
  </div>`,
})
export class PrimaryLayout {}
