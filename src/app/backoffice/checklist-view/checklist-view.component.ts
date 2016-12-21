import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Checklist } from '../../shared/checklist';
import { ChecklistStatuses } from '../../shared/checklistStatuses';
import { toast } from "angular2-materialize";

import * as moment from 'moment';

@Component({
  selector: 'app-checklist-view',
  templateUrl: 'checklist-view.component.html',
  styleUrls: ['checklist-view.component.css']
})
export class ChecklistViewComponent implements OnInit {

  checklistId: string;
  checklist: Checklist;

  constructor(private route: ActivatedRoute, private af: AngularFire) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.checklistId = params['id'];
      this.af.database.object(`checklists/${this.checklistId}`).subscribe((checklist) => {
        this.checklist = checklist;
      });
    });
  }

  approve() {
    this.af.database.object(`checklists/${this.checklistId}`).update({
      status: ChecklistStatuses.APPROVED
    }).then(() => {
      this.triggerToast('Checklist was approved');
    }, (err) => {
      this.triggerToast(err.message || 'An error occurred');
    })
  }

  reject() {
    this.af.database.object(`checklists/${this.checklistId}`).update({
      status: ChecklistStatuses.REJECTED
    }).then(() => {
      this.triggerToast('Checklist was rejected');
    }, (err) => {
      this.triggerToast(err.message || 'An error occurred');
    })
  }

  private triggerToast(message: string) {
    toast(message, 3000);
  }

  private updateChecklist(checklist: Checklist) {
    return new Promise((resolve, reject) => {
      this.af.database.object(`checklists/${this.checklistId}`).update(checklist).then(() => {
        resolve();
      }, (err) => {
        reject(err);
      })
    });
  }

}
