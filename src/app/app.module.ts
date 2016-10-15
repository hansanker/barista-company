import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';


import { AppComponent } from './app.component';
import { BaristaComponent } from './barista/barista.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { AuthComponent } from './auth/auth.component';
import { ChecklistFormComponent } from './checklist/checklist-form/checklist-form.component';

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
    BaristaComponent,
    NavbarComponent,
    BackofficeComponent,
    AuthComponent,
    ChecklistFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
