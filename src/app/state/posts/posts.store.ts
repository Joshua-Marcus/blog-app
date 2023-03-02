import { Injectable } from '@angular/core';
import { PostQuery } from '@graph/posts';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Post } from '@types';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { PostsQuery } from '../../gql/posts/posts.query';

export interface PostsState {
  readonly posts: Post[];
}

@Injectable()
export class PostsStore extends ComponentStore<PostsState> {
  constructor(
    private readonly postsQuery: PostsQuery,
    private readonly postQuery: PostQuery
  ) {
    super({ posts: [] });
  }

  readonly posts$ = this.select(({ posts }) => posts);

  readonly fetchAll = this.effect((event$) =>
    event$.pipe(
      switchMap(() =>
        this.postsQuery.fetch().pipe(
          tapResponse(
            (res) => this.addMany(res.data.posts.data),
            (error) => {
              console.error(`Error fetching posts: ${error}`);
              return EMPTY;
            }
          )
        )
      )
    )
  );

  readonly addMany = this.updater((_, posts: Post[]) => ({
    posts,
  }));

  readonly getPost = this.effect((postId$: Observable<string>) => {
    return postId$.pipe(
      switchMap((postId) =>
        this.postQuery
          .fetch({
            id: postId,
          })
          .pipe(
            tap({
              next: (p) => this.addPost(p.data.post),
              error: (err) => console.log('getPost', err),
            }),
            catchError(() => EMPTY)
          )
      )
    );
  });

  readonly addPost = this.updater((state, post: Post) => ({
    posts: [...state.posts, post],
  }));

  selectPost(postId: number) {
    return this.select((state) => state.posts.find((p) => p.id === postId));
  }
}
