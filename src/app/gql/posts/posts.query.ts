import { Injectable } from '@angular/core';
import { Post } from '@types';
import { gql, Query } from 'apollo-angular';

export interface Response {
  posts: {
    data: Post[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostsQuery extends Query<Response> {
  override document = gql`
    query Posts($options: PageQueryOptions) {
      posts(options: $options) {
        data {
          id
          title
          body
        }
      }
    }
  `;
}
