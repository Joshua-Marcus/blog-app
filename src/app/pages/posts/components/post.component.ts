import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/types';

@Component({
  selector: 'post',
  templateUrl: `post.component.html`,
})
export class PostComponent {
  @Input()
  post: Post;

  @Output()
  onClickEdit = new EventEmitter();

  @Output()
  onClickDelete = new EventEmitter();
}
