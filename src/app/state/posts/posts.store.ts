import { Injectable } from '@angular/core';
import { PostQuery } from '@graph/posts';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Post } from '@types';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostsQuery } from '../../gql/posts/posts.query';

export interface PostsState {
  posts: Post[];
}

@Injectable()
export class PostsStore extends ComponentStore<PostsState> {
  constructor(
    private readonly postsQuery: PostsQuery,
    private readonly postQuery: PostQuery
  ) {
    super({ posts: [] });
    this.fetchPosts();
  }
  readonly posts$ = this.select(({ posts }) => posts);

  readonly fetchPosts = this.effect((event$) =>
    event$.pipe(
      switchMap(() =>
        this.postsQuery.fetch().pipe(
          tapResponse(
            (res) => this.updateState(res.data.posts.data),
            (error) => {
              console.error(`Error fetching posts: ${error}`);
              return EMPTY;
            }
          )
        )
      )
    )
  );

  readonly updateState = this.updater((_, posts: Post[]) => ({
    posts,
  }));

  selectPost(postId: string) {
    return this.select((state) => state.posts.find((p) => p.id === postId));
  }

  // readonly updateCurrentPageIndex = this.updater(
  //   (state, currentPageIndex: number) => ({
  //     ...state,
  //     currentPageIndex,
  //   })
  // );

  // readonly currentPostId$ = this.select((state) => state);

  // private readonly fetchPostData$ = this.select(
  //   {
  //     currentPostId: this.currentPostId$,
  //   },
  //   { debounce: true }
  // );

  // private readonly fetchPosts = this.effect(
  //   (
  //     postsData$: Observable<{
  //       currentPostId: number;
  //     }>
  //   ) => {
  //     return postsData$.pipe((() => {
  //       return this.postsQuery.fetch()
  //       .pipe(tap((results) => this.updateMovieResults(results)));
  //     })
  //     );
  //   }
  // );

  // readonly getPost = this.effect((postId$: Observable<number>) => {
  //   return postId$.pipe(
  //     switchMap((postId) =>
  //       this.postQuery
  //         .fetch({
  //           id: postId,
  //         })
  //         .pipe(
  //           tap((getPost) => console.log('The GetPost', getPost)),
  //           tap({
  //             next: (p) => console.log('Nex', p.data.post),
  //             error: (err) => console.log('getPost', err),
  //           }),
  //           catchError(() => EMPTY)
  //         )
  //     )
  //   );
  // });

  // readonly addPost = this.updater((state, post: Post) => {
  //   console.log('Adding post to state', state);
  //   return {
  //     posts: [...state.posts, post],
  //   };
  // });

  // selectPost(postId: number) {
  //   console.log('SelectPost', postId);
  //   return this.select((state) => state.posts.find((p) => p.id === postId));
  // }
}
