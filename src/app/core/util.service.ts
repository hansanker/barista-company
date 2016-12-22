import { Injectable } from '@angular/core';
import { utils } from '../shared/utils';
import { toast } from "angular2-materialize";
import * as moment from 'moment';

@Injectable()
export class UtilService {

  constructor() { }

  calculateTheDifference(date: string, start: string, end: string) {
    let difference;
    if (this.isValidTime(start) && this.isValidTime(end)) {    // check if time is entered
      let format = this.getDateTimeFormat(),
        momentFrom = moment(`${date} ${start}`, format),
        momentTo = moment(`${date} ${end}`, format);
      if (momentFrom.isBefore(momentTo)) {
        difference = moment.utc(momentTo.diff(momentFrom))
          .format(utils.timeFormat);
      }
    }
    return difference;
  }

  calculateTotal(timeIntervals: string[]) {
    let totalInterval,
      valid = timeIntervals.some(item => {
        return !!item;
      });
    if (valid) {
      let start = moment().startOf('day');
      timeIntervals.forEach((time) => {
        let momentTime = moment(time, utils.timeFormat);
        let hours = momentTime.format(utils.hoursFormat),
          minutes = momentTime.format(utils.minutesFormat);
        start.add(hours, 'hours').add(minutes, 'minutes');
      });
      totalInterval = start.format(utils.timeFormat);
    }
    return totalInterval;
  }

  getDatepickerFormat() {
    return utils.dateFormat.toLowerCase();
  }

  getDateTimeFormat() {
    return `${utils.dateFormat} ${utils.timeFormat};`
  }

  triggerToast(message: string) {
    toast(message, 3000);
  }

  private isValidTime(time: string) {
    return moment(time, utils.timeFormat, true).isValid();
  }

}
