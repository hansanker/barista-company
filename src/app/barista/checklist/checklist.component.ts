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
  selector: 'app-checklist',
  templateUrl: 'checklist.component.html',
  styleUrls: ['checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  checklistForm: FormGroup;
  checklistId: string;
  userId: string;
  checklist: Checklist;

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
        this.checklist = new Checklist(checklist);
        this.buildForm();
      });
    });
  }

  onDayAdded(date: string) {
    const control = <FormArray>this.checklistForm.controls['days'];
    control.push(this.initDay(new ChecklistDay({date: date})));
  }

  onExpenseAdded(date: string) {
    const control = <FormArray>this.checklistForm.controls['expenses'];
    control.push(this.initExpense(new ChecklistExpense({date: date})));
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
      expenses: this.fb.array((this.checklist.expenses).map(expense => this.initExpense(expense))),
      totalHours: [this.checklist.totalHours],
      totalExpenses: [this.checklist.totalExpenses]
    });

    this.checklistForm.controls['days'].valueChanges.subscribe(() => {
      let days = <FormArray>this.checklistForm.controls['days'],
        daysLength = days.length,
        totalValues = [];
      for (let i = 0; i < daysLength; i++) {
        let total = (<FormGroup>days.controls[i]).controls['total'].value;
        totalValues.push(total);
      }
      let totalValue = this.utilService.calculateTotal(totalValues);
      this.checklistForm.controls['totalHours'].setValue(totalValue);
    });

    this.checklistForm.controls['expenses'].valueChanges.subscribe(() => {
      let expenses = <FormArray>this.checklistForm.controls['expenses'],
        expensesLength = expenses.length,
        totalValues = [];
      for (let i = 0; i < expensesLength; i++) {
        let total = (<FormGroup>expenses.controls[i]).controls['amount'].value;
        totalValues.push(total);
      }
      let totalValue = totalValues.reduce((a,b) => {return a + b}, 0);
      this.checklistForm.controls['totalExpenses'].setValue(totalValue);
    });
  }

  private initDay(day: ChecklistDay) {
    let dayForm = this.fb.group({
        'date': day.date,
        'startup': this.fb.group({
          'start': [day.startup.start, Validators.required],
          'end': [day.startup.end, Validators.required],
          'total': [day.startup.total, Validators.required]
        }),
        'delivery': this.fb.group({
          'start': [day.delivery.start, Validators.required],
          'end': [day.delivery.end, Validators.required],
          'total': [day.delivery.total, Validators.required]
        }),
        'cleanup': this.fb.group({
          'start': [day.cleanup.start, Validators.required],
          'end': [day.cleanup.end, Validators.required],
          'total': [day.cleanup.total, Validators.required]
        }),
        'total': day.total
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
