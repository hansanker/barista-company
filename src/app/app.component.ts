import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private af: AngularFire, private router: Router) {
    this.af.auth.subscribe(authData => {
      if (authData) {
        this.af.database.object(`users/${authData.uid}`).subscribe(user => {
          switch (user.role) {
            case 0:
              this.router.navigate(['barista/checklists']);
              break;
            case 1:
              this.router.navigate(['backoffice/checklists']);
              break;
            default:
              this.router.navigate(['profile']);
          }
        });
      } else {
        this.router.navigate(['login']);
      }
    })
  }
}
