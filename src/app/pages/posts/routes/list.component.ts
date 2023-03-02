import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeletePostMutation, PostsQuery } from '@graph/posts';
import { HotToastService } from '@ngneat/hot-toast';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Post } from 'src/app/types';

@Component({
  selector: 'app-posts-list',
  template: `
    <h2 class="text-3xl font-bold text-dark">Posts</h2>
    <app-loader [active]="isLoading"></app-loader>
    <div
      class="mx-auto grid grid-cols-1 gap-x-12 gap-y-12 border-t border-gray-200 mt-8 pt-8 lg:grid-cols-2"
    >
      <post
        (onClickEdit)="routeToEditPost($event)"
        (onClickDelete)="onDeletePost($event)"
        *ngFor="let post of posts | async"
        [post]="post"
      ></post>
    </div>
  `,
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]>;
  isLoading = true;

  constructor(
    private postsQuery: PostsQuery,
    private router: Router,
    private deleteMutation: DeletePostMutation,
    private t: HotToastService
  ) {}

  ngOnInit() {
    this.posts = this.postsQuery
      .watch({
        options: {
          paginate: {
            limit: 20,
          },
        },
      })
      .valueChanges.pipe(
        map((result) => {
          this.isLoading = result.loading;
          return result.data.posts.data;
        })
      );
  }

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
