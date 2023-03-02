import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UpdatePostMutation } from '@graph/posts';
import { HotToastService } from '@ngneat/hot-toast';
import { blankPost, Post } from '@types';
import { firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { PostsStore } from 'src/app/state/posts/posts.store';

@Component({
  selector: 'app-edit-post',
  template: `
    <h2 class="text-3xl font-bold text-dark">Edit Post</h2>
    <div class="border-t border-gray-200 mt-8 px-4 pt-8">
      <app-loader [active]="!(post$ | async)"></app-loader>
      <div
        *ngIf="post$ | async as post"
        class="bg-white p-8 mx-auto shadow-md rounded"
      >
        <posts-form [initialModel]="post" (saveClicked)="onSubmit($event)">
        </posts-form>
      </div>
    </div>
  `,
  providers: [PostsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent implements OnInit {
  post$: Observable<Post>;

  constructor(
    private readonly store: PostsStore,

    private route: ActivatedRoute,
    private updateMutation: UpdatePostMutation,
    private t: HotToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const paramId = params.get('id');
        if (!paramId) {
          return of(blankPost());
        }
        const currentPost = this.store.selectPost(paramId) as Observable<Post>;
        if (!currentPost) {
          return of(blankPost());
        }
        return currentPost;
      })
    );
  }

  async onSubmit(p: Post) {
    try {
      await firstValueFrom(this.updateMutation.mutate({ input: p, id: p.id }));
      this.t.success('Post successfully updated!', {
        iconTheme: {
          primary: '#567992',
          secondary: '#fffaf5',
        },
      });
      this.router.navigate(['posts']);
    } catch (e) {
      this.t.error(
        'There was a problem updating the post, please try again later.',
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
