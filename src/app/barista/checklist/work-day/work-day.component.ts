import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-day',
  templateUrl: './work-day.component.html',
  styleUrls: ['./work-day.component.css']
})
export class WorkDayComponent implements OnInit {

  @Input('workDay') public workDayForm: FormGroup;
  @Input() deleteAvailable: boolean;
  @Output() remove = new EventEmitter<void>();

  mask = [/\d/, /\d/, ':', /\d/, /\d/];

  constructor() { }

  ngOnInit() {
  }

  removeDay() {
    this.remove.next();
  }

}
