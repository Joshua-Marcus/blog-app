import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class DeletePostMutation extends Mutation {
  override document = gql`
    mutation ($id: ID!) {
      deletePost(id: $id)
    }
  `;
}
