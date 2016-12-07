import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import * as moment_ from 'moment';


@Component({
  selector: 'hours',
  templateUrl: './checklist-form-hours.component.html',
  styleUrls: ['./checklist-form-hours.component.css']
})
export class ChecklistFormHoursComponent {

  @Input('group')
  public hoursForm: FormGroup;

  constructor() { }


  calcHours() {
    const cTot = this.hoursForm.controls['opbouwTot'].value;
    const cVan = this.hoursForm.controls['opbouwVan'].value;

    var uren = moment_.utc(moment_(cTot, "HH:mm").diff(moment_(cVan, "HH:mm"))).format("HH:mm");

    (this.hoursForm.controls['opbouwUren'])
      .setValue(uren, { onlySelf: true });
  }
}

