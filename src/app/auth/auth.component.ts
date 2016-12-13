import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Roles } from '../shared/roles';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string;

  constructor(private af: AngularFire) {}

  ngOnInit() {
  }

  loginWithGoogle() {
    this.error = '';
    this.af.auth.login({method: AuthMethods.Popup, provider: AuthProviders.Google})
      .then(authData => {
        this.af.database.object(`users/${authData.uid}`).subscribe(user => {
          if (!user) {                        // save user info
            let user = {
              name: authData.auth.displayName || authData.auth.email,
              role: Roles.BARRISTA
            };
            this.af.database.object(`users/${authData.uid}`).set(user);
          }
        });
      })
      .catch(err => {
        this.error = err.message || 'An error occurred';
      });
  }

}
