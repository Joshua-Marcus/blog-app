import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePostMutation } from '@graph/posts';
import { HotToastService } from '@ngneat/hot-toast';
import { blankPost, Post } from '@types';
import { firstValueFrom, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-create-post',
  template: `
    <h2 class="text-3xl font-bold text-dark">Create Post</h2>
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
export class CreatePostComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private createMutation: CreatePostMutation,
    private t: HotToastService
  ) {}

  async ngOnInit() {
    const postTap$ = this.route.paramMap.pipe(
      switchMap(() => {
        return of(blankPost());
      })
    );

    postTap$.subscribe((p) => {
      this.post = p;
    });
  }

  async onSubmit(p: Post) {
    try {
      await firstValueFrom(this.createMutation.mutate({ input: p }));
      this.t.success('Post successfully created!', {
        iconTheme: {
          primary: '#567992',
          secondary: '#fffaf5',
        },
      });
      this.router.navigate(['posts']);
    } catch (e) {
      this.t.error(
        'There was a problem creating the post, please try again later.',
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
