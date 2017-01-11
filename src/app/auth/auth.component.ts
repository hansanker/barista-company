import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailPasswordCredentials } from "angularfire2/auth";

import { Roles } from '../shared/roles';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string;
  authForm: FormGroup;
  isLoggingIn = true;

  constructor(private fb: FormBuilder, private af: AngularFire) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  toggleLogin() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  loginWithGoogle() {
    this.error = '';
    this.af.auth.login({method: AuthMethods.Popup, provider: AuthProviders.Google})
      .then(authData => {
        this.createUserIfNeeded(authData);
      })
      .catch(err => {
        this.error = err.message || 'An error occurred';
      });
  }

  submit(credentials: EmailPasswordCredentials) {
    this.error = '';
    if (this.isLoggingIn) {
      this.login(credentials);
    } else {
      this.register(credentials);
    }
  }

  private login(credentials: EmailPasswordCredentials) {
    this.af.auth.login(credentials, {method: AuthMethods.Password, provider: AuthProviders.Password})
      .catch(err => {
        this.error = err.message || 'An error occurred';
      });
  }

  private register(credentials: EmailPasswordCredentials) {
    this.af.auth.createUser(credentials)
      .then(authData => {
        this.createUser(authData);
      })
      .catch(err => {
        this.error = err.message || 'An error occurred';
      });
  }

  private createUserIfNeeded(authData) {
    this.af.database.object(`users/${authData.uid}`).subscribe(user => {
      if (user.$value === null) {                        // user does not exist yet
        this.createUser(authData);
      }
    });
  }

  private createUser(authData) {
        let user = {
          name: authData.auth.displayName || authData.auth.email,
          role: Roles.BARRISTA
        };
        this.af.database.object(`users/${authData.uid}`).set(user);
  }

}
