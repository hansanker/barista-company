import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Validators, FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { Checklist } from '../../shared/checklist';
import { ChecklistDay } from '../../shared/checklistDay';
import { utils } from '../../shared/utils';
import { ChecklistStatuses } from "../../shared/checklistStatuses";
import { toast } from "angular2-materialize";

import * as moment from 'moment';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  checklistForm: FormGroup;
  checklistId: string;
  userId: string;
  checklist: Checklist = {
    customer: '',
    location: '',
    user: '',
    status: null,
    days: []
  };

  mask = [/\d/, /\d/, ':', /\d/, /\d/];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private af: AngularFire) {
    this.af.auth.subscribe(authData => {
      if (authData) {
        this.userId = authData.uid;
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.checklistId = params['id'];
      this.af.database.object(`checklists/${this.checklistId}`).subscribe((checklist) => {
        this.checklist = checklist;
        this.buildForm();
      });
    });
  }

  addDate(date: string) {
    const control = <FormArray>this.checklistForm.controls['days'];
    control.push(this.initDay({date: date}));
  }

  removeDate(i: number) {
    const control = <FormArray>this.checklistForm.controls['days'];
    control.removeAt(i);
  }

  getDateFormat() {
    return utils.dateFormat.toLowerCase();  // for datepickler format should be lower case
  }

  save(checklist: Checklist) {
    this.updateChecklist(checklist).then(
      () => { this.triggerToast('Your checklist was saved') },
      (err) => {this.triggerToast(err.message || 'An error occured')}
    )
  }

  submit(checklist: Checklist) {
    checklist.status = ChecklistStatuses.SUBMITTED;
    this.updateChecklist(checklist).then(
      () => { this.triggerToast('Your checklist was submitted') },
      (err) => {this.triggerToast(err.message || 'An error occured')}
    )
  }

  private buildForm() {
    this.checklistForm = this.fb.group({
      customer: [this.checklist.customer, Validators.required],
      location: [this.checklist.location],
      days: this.fb.array(this.checklist.days.map(day => this.initDay(day)))
    });
  }

  private initDay(day: ChecklistDay) {
    let dayForm = this.fb.group({
      'date': day.date,
      'startupStart': [day.startupStart, Validators.required],
      'startupEnd': [day.startupEnd, Validators.required],
      'startupTotal': day.startupTotal,
      'deliveryStart': [day.deliveryStart, Validators.required],
      'deliveryEnd': [day.deliveryEnd, Validators.required],
      'deliveryTotal': day.deliveryTotal,
      'cleanupStart': [day.cleanupStart, Validators.required],
      'cleanupEnd': [day.cleanupEnd, Validators.required],
      'cleanupTotal': day.cleanupTotal
    }),
      startupStart = dayForm.controls['startupStart'],
      startupEnd = dayForm.controls['startupEnd'],
      startupTotal = dayForm.controls['startupTotal'],
      deliveryStart = dayForm.controls['deliveryStart'],
      deliveryEnd = dayForm.controls['deliveryEnd'],
      deliveryTotal = dayForm.controls['deliveryTotal'],
      cleanupStart = dayForm.controls['cleanupStart'],
      cleanupEnd = dayForm.controls['cleanupEnd'],
      cleanupTotal = dayForm.controls['cleanupTotal'];

    startupStart.valueChanges.subscribe(() => {
      let difference = this.calculateTheDifference(day.date, startupStart.value, startupEnd.value);
      startupTotal.setValue(difference);
      //this.calculateTotal(startupTotal.value, deliveryTotal.value, cleanupTotal.value);
    });
    startupEnd.valueChanges.subscribe(() => {
      let difference = this.calculateTheDifference(day.date, startupStart.value, startupEnd.value);
      startupTotal.setValue(difference);
    });
    deliveryStart.valueChanges.subscribe(() => {
      let difference = this.calculateTheDifference(day.date, deliveryStart.value, deliveryEnd.value);
      deliveryTotal.setValue(difference);
    });
    deliveryEnd.valueChanges.subscribe(() => {
      let difference = this.calculateTheDifference(day.date, deliveryStart.value, deliveryEnd.value);
      deliveryTotal.setValue(difference);
    });
    cleanupStart.valueChanges.subscribe(() => {
      let difference = this.calculateTheDifference(day.date, cleanupStart.value, cleanupEnd.value);
      cleanupTotal.setValue(difference);
    });
    cleanupEnd.valueChanges.subscribe(() => {
      let difference = this.calculateTheDifference(day.date, cleanupStart.value, cleanupEnd.value);
      cleanupTotal.setValue(difference);
    });

    return dayForm;
  }

  private calculateTheDifference(date: string, start: string, end: string) {
    let difference;
    if (this.timeEntered(start) && this.timeEntered(end)) {    // check if time is entered
      let from = date + ' ' + start,
        to = date + ' ' + end,
        format = utils.dateFormat + utils.timeFormat;
      // TODO check if from is earlier that to
      difference = moment.utc(moment(to, format).diff(moment(from, format)))
        .format(utils.timeFormat);
    }
    return difference;
  }

  // private calculateTotal(timeIntervals: string[]) {
  //   let totalInterval,
  //     valid = timeIntervals.every(item => {
  //     return !!item;
  //   });
  //   if (valid) {
  //
  //   }
  //   return totalInterval;
  // }

  private timeEntered(time) {
    return time && time.length === 5 && time.indexOf('_') === -1;
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
