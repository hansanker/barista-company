import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from '../../../../core/util.service';

@Component({
  selector: 'app-work-hours',
  templateUrl: './work-hours.component.html',
  styleUrls: ['./work-hours.component.css']
})
export class WorkHoursComponent implements OnInit {

  @Input('hours') public hoursForm: FormGroup;
  @Input() caption: string;
  @Input() date: string;

  mask = [/\d/, /\d/, ':', /\d/, /\d/];

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    let start = this.hoursForm.controls['start'],
      end = this.hoursForm.controls['end'],
      total = this.hoursForm.controls['total'];
    start.valueChanges.subscribe(() => {
      total.setValue(this.calculateTotal(this.date, start.value, end.value));
    });
    end.valueChanges.subscribe(() => {
      total.setValue(this.calculateTotal(this.date, start.value, end.value));
    });
  }

  private calculateTotal(date, start, end) {
    return this.utilService.calculateTheDifference(date, start, end);
  }

}
