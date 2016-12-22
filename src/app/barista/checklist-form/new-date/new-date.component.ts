import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../../core/util.service';

@Component({
  selector: 'app-new-date',
  templateUrl: './new-date.component.html',
  styleUrls: ['./new-date.component.css']
})
export class NewDateComponent implements OnInit {

  @Input() caption: string;
  @Output() dateAdded = new EventEmitter<string>();

  constructor(private utilService: UtilService) { }

  ngOnInit() {
  }

  addDate(date: string) {
    this.dateAdded.next(date);
  }

  getDateFormat() {
    return this.utilService.getDatepickerFormat();
  }

}
