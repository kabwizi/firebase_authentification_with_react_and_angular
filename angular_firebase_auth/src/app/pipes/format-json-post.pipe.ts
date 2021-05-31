import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../services/server-request.service';

@Pipe({ name: 'formatJsonPostPipes' })
export class FormatJsonPostPipes implements PipeTransform {
  transform(post: IPost) {
    return JSON.stringify(post, undefined, 2).replace(
      /\n( *)/g,
      function (match, p1) {
        return '<br>' + '&nbsp;'.repeat(p1.length);
      }
    );
  }
}
