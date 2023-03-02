import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <nav class="mx-auto flex max-w-7xl items-start justify-between">
      <a routerLink="/">
        <img
          class="h-16 w-auto"
          src="assets/images/logo.svg"
          alt="Application Logo"
        />
      </a>
      <button type="button" (click)="routeToCreate()" class="fab-btn-accent">
        <!-- @heroicon/plus -->

        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </nav>
  `,
})
export class HeaderComponent {
  constructor(private router: Router) {}

  routeToCreate() {
    this.router.navigate(['/posts/create']);
  }
}
