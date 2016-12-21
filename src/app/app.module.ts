import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    apiKey: "AIzaSyCWYY3poe4SpATY-tx2FAIaou-ToD2I1wM",
    authDomain: "baristacompany-b618b.firebaseapp.com",
    databaseURL: "https://baristacompany-b618b.firebaseio.com",
    storageBucket: "baristacompany-b618b.appspot.com",
    messagingSenderId: "623851489264"
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
