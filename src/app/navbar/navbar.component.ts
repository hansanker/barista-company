import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(authData => {
      this.isLoggedIn = !!authData;
    })
  }

  ngOnInit() {
  }

  logout() {
    this.af.auth.logout();
  }


}
