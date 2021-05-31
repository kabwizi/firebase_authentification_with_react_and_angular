import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  public signinError: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    public router: Router
  ) {}
  signinFormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  async createUserWithEmailAndPasswordFn() {
    try {
      await this.auth.createUserWithEmailAndPassword(
        this.signinFormGroup.value.email,
        this.signinFormGroup.value.password
      );
      this.signinError = undefined;
      this.router.navigate(['home']);
    } catch (error) {
      this.signinError = error.message;
    }
  }
}
