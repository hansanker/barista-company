import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { BackofficeRoutes } from './backoffice.routes';

import { BackofficeComponent } from './backoffice.component';
import { ChecklistsBackofficeComponent } from './checklists-backoffice/checklists-backoffice.component';
import { ChecklistViewComponent } from './checklist-view/checklist-view.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    ChecklistsBackofficeComponent,
    ChecklistViewComponent
  ],
  exports: [BackofficeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(BackofficeRoutes)
  ]
})
export class BackofficeModule { }
