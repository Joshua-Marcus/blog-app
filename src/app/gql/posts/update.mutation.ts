import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UpdatePostMutation extends Mutation {
  override document = gql`
    mutation ($id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
        id
        title
        body
      }
    }
  `;
}
