import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Checklist } from '../../shared/checklist';
import { ChecklistStatuses } from '../../shared/checklistStatuses';
import { UtilService } from '../../core/util.service';

@Component({
  selector: 'app-checklist-view',
  templateUrl: 'checklist-view.component.html',
  styleUrls: ['checklist-view.component.css']
})
export class ChecklistViewComponent implements OnInit {

  checklistId: string;
  checklist: Checklist;

  constructor(private route: ActivatedRoute,
              private af: AngularFire,
              private utilService: UtilService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.checklistId = params['id'];
      this.af.database.object(`checklists/${this.checklistId}`).subscribe((checklist) => {
        this.checklist = new Checklist(checklist);
      });
    });
  }

  approve() {
    this.af.database.object(`checklists/${this.checklistId}`).update({
      status: ChecklistStatuses.APPROVED
    }).then(() => {
      this.utilService.triggerToast('Checklist was approved');
    }, (err) => {
      this.utilService.triggerToast(err.message || 'An error occurred');
    })
  }

  reject() {
    this.af.database.object(`checklists/${this.checklistId}`).update({
      status: ChecklistStatuses.REJECTED
    }).then(() => {
      this.utilService.triggerToast('Checklist was rejected');
    }, (err) => {
      this.utilService.triggerToast(err.message || 'An error occurred');
    })
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
