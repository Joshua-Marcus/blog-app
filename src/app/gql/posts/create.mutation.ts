import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreatePostMutation extends Mutation {
  override document = gql`
    mutation ($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        title
        body
      }
    }
  `;
}
