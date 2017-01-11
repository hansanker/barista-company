import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';

  // Initialize Firebase
  export const firebaseConfig = {
    apiKey: "AIzaSyDTywUOqrAU61m1jEGjExF8ep6EjwI8x5M",
    authDomain: "barista-5651a.firebaseapp.com",
    databaseURL: "https://barista-5651a.firebaseio.com",
    storageBucket: "barista-5651a.appspot.com",
    messagingSenderId: "1091191482407"
  };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(AppRoutes),

    CoreModule,
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
