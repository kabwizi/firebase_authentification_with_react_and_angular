import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ServerRequestService,
  IPost,
} from '../services/server-request.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
})
export class PreviewComponent implements OnInit, OnDestroy {
  public postFound$: Observable<IPost[]> | undefined;
  public routerSubscription: Subscription | undefined;
  constructor(
    private serverRequest: ServerRequestService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.params.subscribe((data) => {
      if (data.id) {
        this.postFound$ = this.serverRequest
          .getAllPostById(data.id)
          .pipe(map((post) => [post]));
      } else {
        this.postFound$ = this.serverRequest.getAllPost();
      }
    });
  }
  ngOnDestroy() {
    if (this.routerSubscription) return this.routerSubscription.unsubscribe();
  }
}
