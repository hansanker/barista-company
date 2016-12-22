import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { BaristaRoutes } from './barista.routes';
import { SharedModule } from '../shared/shared.module';

import { BaristaComponent } from './barista.component';
import { ChecklistsBaristaComponent } from './checklists-barista/checklists-barista.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { NewDateComponent } from './checklist/new-date/new-date.component';
import { ExpenseComponent } from './checklist/expense/expense.component';
import { WorkDayComponent } from './checklist/work-day/work-day.component';

@NgModule({
  declarations: [
    BaristaComponent,
    ChecklistsBaristaComponent,
    ChecklistComponent,
    NewDateComponent,
    ExpenseComponent,
    WorkDayComponent
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
