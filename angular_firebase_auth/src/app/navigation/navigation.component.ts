import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  public user$: Observable<any> | undefined;
  constructor(public auth: AngularFireAuth, public router: Router) {}

  ngOnInit(): void {
    this.user$ = this.auth.user;
  }

  async logoutFn() {
    await this.auth.signOut();
    this.router.navigate(['']);
  }
}
