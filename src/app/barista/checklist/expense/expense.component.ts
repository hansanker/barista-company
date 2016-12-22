import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @Input('expense') public expenseForm: FormGroup;
  @Output() remove = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  removeExpense() {
    this.remove.next();
  }

}
