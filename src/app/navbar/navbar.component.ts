import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user: any;

  baristaRoutes = [
    {path: '/barista/checklists', name: 'Checklists', icon: 'view_headline'}
  ];

  backofficeRoutes = [
    {path: '/backoffice/checklists', name: 'Checklists', icon: 'view_headline'}
  ];

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(authData => {
      if (authData) {
        this.isLoggedIn = true;
        this.af.database.object(`users/${authData.uid}`).subscribe(user => {
          this.user = user;
        })
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit() {
  }

  logout() {
    this.af.auth.logout();
  }

  getRoutes() {
    if (this.user) {
      return this.user.role === 0 ? this.baristaRoutes : this.backofficeRoutes;
    }
  }

}
