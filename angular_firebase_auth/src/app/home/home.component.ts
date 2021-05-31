import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public user$: Observable<firebase.User | null> = new Observable();
  public showPopUp: boolean = false;
  public getPostId: string = '1';
  public deletePostId: string = '1';
  public deletedError: string | undefined;
  public deletePostSubscription: Subscription | undefined;
  public showMiniPopUp: boolean = false;
  public method: 'POST' | 'PUT' | undefined;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private serverRequestService: ServerRequestService
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.user;
  }

  toggleShowPopUp(method: 'POST' | 'PUT') {
    this.method = method;
    this.showPopUp = !this.showPopUp;
  }

  goToThePreviewPageFn(event: MouseEvent) {
    if ((event.target as HTMLElement).nodeName === 'DIV') {
      this.router.navigate(['/preview', this.getPostId]);
    }
  }

  deletePostFn() {
    this.deletePostSubscription = this.serverRequestService
      .deletePost(this.deletePostId)
      .subscribe(
        (data) => {
          this.showMiniPopUp = true;
          this.deletedError = undefined;
        },
        (error) => {
          this.deletedError = error.error.message;
        }
      );
  }

  ngOnDestroy() {
    if (this.deletePostSubscription) this.deletePostSubscription.unsubscribe();
  }
}
