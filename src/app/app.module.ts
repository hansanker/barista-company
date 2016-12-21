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
import { ChecklistFormComponent } from './barista/checklist-form/checklist-form.component';
import { ChecklistBaristaComponent } from './barista/checklist-barista/checklist-barista.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { ChecklistBackofficeComponent } from './backoffice/checklist-backoffice/checklist-backoffice.component';
import { ChecklistViewComponent } from './backoffice/checklist-view/checklist-view.component';

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
    ChecklistFormComponent,
    ChecklistBaristaComponent,
    ProfileComponent,
    MessagesComponent,
    ChecklistBackofficeComponent,
    ChecklistViewComponent
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
