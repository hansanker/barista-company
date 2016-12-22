import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { Checklist } from '../../shared/checklist';
import { ChecklistDay } from '../../shared/checklistDay';
import { ChecklistStatuses } from "../../shared/checklistStatuses";
import { ChecklistExpense } from '../../shared/checklistExpense';
import { UtilService } from '../../core/util.service';

@Component({
  selector: 'app-checklist-form',
  templateUrl: 'checklist-form.component.html',
  styleUrls: ['checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  checklistForm: FormGroup;
  checklistId: string;
  userId: string;
  checklist: Checklist;

  mask = [/\d/, /\d/, ':', /\d/, /\d/];

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private af: AngularFire,
              private utilService: UtilService) {
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
        // TODO refactor it later
        if (!this.checklist.expenses) {
          this.checklist.expenses = [];
        }
        this.buildForm();
      });
    });
  }

  onDayAdded(date: string) {
    const control = <FormArray>this.checklistForm.controls['days'];
    control.push(this.initDay({date: date}));
  }

  onExpenseAdded(date: string) {
    const control = <FormArray>this.checklistForm.controls['expenses'];
    control.push(this.initExpense({date: date}));
  }

  removeDate(i: number) {
    const control = <FormArray>this.checklistForm.controls['days'];
    control.removeAt(i);
  }

  removeExpense(i: number) {
    const control = <FormArray>this.checklistForm.controls['expenses'];
    control.removeAt(i);
  }

  save(checklist: Checklist) {
    this.updateChecklist(checklist).then(
      () => { this.utilService.triggerToast('Your checklist was saved') },
      (err) => {this.utilService.triggerToast(err.message || 'An error occured')}
    )
  }

  submit(checklist: Checklist) {
    checklist.status = ChecklistStatuses.SUBMITTED;
    this.updateChecklist(checklist).then(
      () => { this.utilService.triggerToast('Your checklist was submitted') },
      (err) => {this.utilService.triggerToast(err.message || 'An error occured')}
    )
  }

  private buildForm() {
    this.checklistForm = this.fb.group({
      customer: [this.checklist.customer, Validators.required],
      location: [this.checklist.location],
      days: this.fb.array(this.checklist.days.map(day => this.initDay(day))),
      expenses: this.fb.array((this.checklist.expenses).map(expense => this.initExpense(expense)))
    });
  }

  private initDay(day: ChecklistDay) {
    //TODO refactor this shit
    let dayForm = this.fb.group({
        'date': day.date,
        'startupStart': [day.startupStart, Validators.required],
        'startupEnd': [day.startupEnd, Validators.required],
        'startupTotal': [day.startupTotal, Validators.required],
        'deliveryStart': [day.deliveryStart, Validators.required],
        'deliveryEnd': [day.deliveryEnd, Validators.required],
        'deliveryTotal': [day.deliveryTotal, Validators.required],
        'cleanupStart': [day.cleanupStart, Validators.required],
        'cleanupEnd': [day.cleanupEnd, Validators.required],
        'cleanupTotal': [day.cleanupTotal, Validators.required],
        'total': day.total
      }),
      startupStart = dayForm.controls['startupStart'],
      startupEnd = dayForm.controls['startupEnd'],
      startupTotal = dayForm.controls['startupTotal'],
      deliveryStart = dayForm.controls['deliveryStart'],
      deliveryEnd = dayForm.controls['deliveryEnd'],
      deliveryTotal = dayForm.controls['deliveryTotal'],
      cleanupStart = dayForm.controls['cleanupStart'],
      cleanupEnd = dayForm.controls['cleanupEnd'],
      cleanupTotal = dayForm.controls['cleanupTotal'],
      total = dayForm.controls['total'];
    startupStart.valueChanges.subscribe(() => {
      let difference = this.utilService.calculateTheDifference(day.date, startupStart.value, startupEnd.value);
      startupTotal.setValue(difference);
      total.setValue(this.utilService.calculateTotal(startupTotal.value, deliveryTotal.value, cleanupTotal.value));
    });
    startupEnd.valueChanges.subscribe(() => {
      let difference = this.utilService.calculateTheDifference(day.date, startupStart.value, startupEnd.value);
      startupTotal.setValue(difference);
      total.setValue(this.utilService.calculateTotal(startupTotal.value, deliveryTotal.value, cleanupTotal.value));
    });
    deliveryStart.valueChanges.subscribe(() => {
      let difference = this.utilService.calculateTheDifference(day.date, deliveryStart.value, deliveryEnd.value);
      deliveryTotal.setValue(difference);
      total.setValue(this.utilService.calculateTotal(startupTotal.value, deliveryTotal.value, cleanupTotal.value));
    });
    deliveryEnd.valueChanges.subscribe(() => {
      let difference = this.utilService.calculateTheDifference(day.date, deliveryStart.value, deliveryEnd.value);
      deliveryTotal.setValue(difference);
      total.setValue(this.utilService.calculateTotal(startupTotal.value, deliveryTotal.value, cleanupTotal.value));
    });
    cleanupStart.valueChanges.subscribe(() => {
      let difference = this.utilService.calculateTheDifference(day.date, cleanupStart.value, cleanupEnd.value);
      cleanupTotal.setValue(difference);
      total.setValue(this.utilService.calculateTotal(startupTotal.value, deliveryTotal.value, cleanupTotal.value));
    });
    cleanupEnd.valueChanges.subscribe(() => {
      let difference = this.utilService.calculateTheDifference(day.date, cleanupStart.value, cleanupEnd.value);
      cleanupTotal.setValue(difference);
      total.setValue(this.utilService.calculateTotal(startupTotal.value, deliveryTotal.value, cleanupTotal.value));
    });

    return dayForm;
  }

  private initExpense(expense: ChecklistExpense) {
    return this.fb.group({
      'date': [expense.date, Validators.required],
      'amount': [expense.amount, Validators.required],
      'type': [expense.type, Validators.required],
      'remark': expense.remark
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
