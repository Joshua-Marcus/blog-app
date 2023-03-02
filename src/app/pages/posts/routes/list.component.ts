import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeletePostMutation } from '@graph/posts';
import { HotToastService } from '@ngneat/hot-toast';
import { firstValueFrom } from 'rxjs';
import { PostsStore } from 'src/app/state/posts/posts.store';

@Component({
  selector: 'app-posts-list',
  template: `
    <h2 class="text-3xl font-bold text-dark">Posts</h2>
    <app-loader [active]="!(posts$ | async)?.length"></app-loader>
    <div
      class="mx-auto grid grid-cols-1 gap-x-12 gap-y-12 border-t border-gray-200 mt-8 pt-8 lg:grid-cols-2"
    >
      <post
        (onClickEdit)="routeToEditPost($event)"
        (onClickDelete)="onDeletePost($event)"
        *ngFor="let post of posts$ | async"
        [post]="post"
      ></post>
    </div>
  `,
  providers: [PostsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {
  readonly posts$ = this.store.posts$;

  constructor(
    private readonly store: PostsStore,
    private router: Router,
    private deleteMutation: DeletePostMutation,
    private t: HotToastService
  ) {}

  routeToEditPost($event: Event) {
    this.router.navigate([`/posts/edit/${$event}`]);
  }

  async onDeletePost($event: Event) {
    try {
      await firstValueFrom(this.deleteMutation.mutate({ id: $event }));
      this.t.success('Post successfully deleted!', {
        iconTheme: {
          primary: '#567992',
          secondary: '#fffaf5',
        },
      });
    } catch (error) {
      this.t.error(
        'There was a problem deleting the post, please try again later.',
        {
          iconTheme: {
            primary: '#e6908b',
            secondary: '#fffaf5',
          },
        }
      );
    }
  }
}
