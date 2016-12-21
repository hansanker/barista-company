import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { BaristaRoutes } from './barista.routes';
import { SharedModule } from '../shared/shared.module';

import { BaristaComponent } from './barista.component';
import { ChecklistBaristaComponent } from './checklist-barista/checklist-barista.component';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';

@NgModule({
  declarations: [
    BaristaComponent,
    ChecklistBaristaComponent,
    ChecklistFormComponent
  ],
  exports: [BaristaComponent],
  imports: [
    CommonModule,
    TextMaskModule,
    ReactiveFormsModule,
    RouterModule.forChild(BaristaRoutes),
    MaterializeModule,
    SharedModule
  ]
})
export class BaristaModule { }
