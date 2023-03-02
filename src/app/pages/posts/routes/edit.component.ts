import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostQuery, UpdatePostMutation } from '@graph/posts';
import { HotToastService } from '@ngneat/hot-toast';
import { blankPost, Post } from '@types';
import { firstValueFrom, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-post',
  template: `
    <h2 class="text-3xl font-bold text-dark">Edit Post</h2>
    <div class="border-t border-gray-200 mt-8 px-4 pt-8">
      <div class="bg-white p-8 mx-auto shadow-md rounded">
        <posts-form
          *ngIf="post"
          [initialModel]="post"
          (saveClicked)="onSubmit($event)"
        >
        </posts-form>
      </div>
    </div>
  `,
})
export class EditPostComponent implements OnInit {
  post: Post;
  postId: number;
  constructor(
    private route: ActivatedRoute,
    private postQuery: PostQuery,
    private updateMutation: UpdatePostMutation,
    private t: HotToastService,
    private router: Router
  ) {}

  ngOnInit() {
    const postTap$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const paramId = params.get('id');
        if (!paramId) {
          return of(blankPost());
        } else {
          return this.postQuery
            .watch({
              id: paramId,
            })
            .valueChanges.pipe(
              tap((res) => console.log('res', res)),
              map((result) => {
                const queryResult = result.data.post;
                if (!!queryResult) {
                  this.postId = +paramId;
                  return queryResult;
                } else {
                  return blankPost();
                }
              })
            );
        }
      })
    );
    postTap$.subscribe((p) => {
      this.post = p;
    });
  }

  async onSubmit(p: Post) {
    try {
      await firstValueFrom(
        this.updateMutation.mutate({ input: p, id: this.postId })
      );
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
