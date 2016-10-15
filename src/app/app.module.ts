import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';


import { AppComponent } from './app.component';
import { BaristaComponent } from './barista/barista.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { AuthComponent } from './auth/auth.component';
import { ChecklistFormComponent } from './checklist/checklist-form/checklist-form.component';

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
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
