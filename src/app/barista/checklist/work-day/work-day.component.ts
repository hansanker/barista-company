import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from '../../../core/util.service';

@Component({
  selector: 'app-work-day',
  templateUrl: './work-day.component.html',
  styleUrls: ['./work-day.component.css']
})
export class WorkDayComponent implements OnInit {

  @Input('workDay') public workDayForm: FormGroup;
  @Input() deleteAvailable: boolean;
  @Output() remove = new EventEmitter<void>();

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    let startupTotal = (<FormGroup>this.workDayForm.controls['startup']).controls['total'],
      deliveryTotal = (<FormGroup>this.workDayForm.controls['delivery']).controls['total'],
      cleanupTotal = (<FormGroup>this.workDayForm.controls['cleanup']).controls['total'],
      total = this.workDayForm.controls['total'];
    startupTotal.valueChanges.subscribe(() => {
      total.setValue(this.utilService.calculateTotal([startupTotal.value, deliveryTotal.value, cleanupTotal.value]))
    });
    deliveryTotal.valueChanges.subscribe(() => {
      total.setValue(this.utilService.calculateTotal([startupTotal.value, deliveryTotal.value, cleanupTotal.value]))
    });
    cleanupTotal.valueChanges.subscribe(() => {
      total.setValue(this.utilService.calculateTotal([startupTotal.value, deliveryTotal.value, cleanupTotal.value]))
    });
  }

  removeDay() {
    this.remove.next();
  }

}
