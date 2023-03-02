import { Injectable } from '@angular/core';
import { Post } from '@types';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class PostQuery extends Query<{ post: Post }> {
  override document = gql`
    query Post($id: ID!) {
      post(id: $id) {
        id
        title
        body
      }
    }
  `;
}
