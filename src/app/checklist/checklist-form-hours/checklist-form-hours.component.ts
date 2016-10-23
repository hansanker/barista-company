import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hours',
  templateUrl: './checklist-form-hours.component.html',
  styleUrls: ['./checklist-form-hours.component.css']
})
export class ChecklistFormHoursComponent {

  @Input('group')
  public hoursForm: FormGroup;

  constructor() { }



}
