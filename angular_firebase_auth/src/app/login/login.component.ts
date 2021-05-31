import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import firebase from 'firebase/app';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public environment = environment;
  public loginError: string | undefined;
  public passwordEmailSend: string | undefined;

  constructor(
    public auth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public router: Router
  ) {}

  loginFormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  async loginWithGoogleFn() {
    try {
      await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.loginError = undefined;
      this.router.navigate(['home']);
    } catch (error) {
      this.loginError = error.message;
    }
  }
  async signInWithEmailAndPasswordFn() {
    try {
      await this.auth.signInWithEmailAndPassword(
        this.loginFormGroup.value.email,
        this.loginFormGroup.value.password
      );
      this.loginError = undefined;
      this.router.navigate(['home']);
    } catch (error) {
      this.loginError = error.message;
    }
  }
  async resetePasswordFn() {
    try {
      await this.auth.sendPasswordResetEmail(this.loginFormGroup.value.email);
      this.loginError = undefined;
      this.passwordEmailSend =
        'An email has been sent to you at ' + this.loginFormGroup.value.email;
    } catch (error) {
      this.passwordEmailSend = undefined;
      this.loginError = error.message;
    }
  }
}
