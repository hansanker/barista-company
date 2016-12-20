import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { MaterializeModule } from 'angular2-materialize';
import { AngularFireModule } from 'angularfire2';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { BaristaComponent } from './barista/barista.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { AuthComponent } from './auth/auth.component';
import { ChecklistFormComponent } from './checklist/checklist-form/checklist-form.component';
import { ChecklistBaristaComponent } from './checklist/checklist-barista/checklist-barista.component';
import { ChecklistFormHoursComponent } from './checklist/checklist-form-hours/checklist-form-hours.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './shared/messages/messages.component';

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
    BaristaComponent,
    NavbarComponent,
    BackofficeComponent,
    AuthComponent,
    ChecklistFormComponent,
    ChecklistBaristaComponent,
    ChecklistFormHoursComponent,
    ProfileComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(AppRoutes),
    TextMaskModule,
    MomentModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
