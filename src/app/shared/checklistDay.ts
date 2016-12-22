import { ChecklistHours } from './checklistHours';

export class ChecklistDay {
  date: string;
  startup: ChecklistHours;
  delivery: ChecklistHours;
  cleanup: ChecklistHours;
  total?: string;

  constructor(obj?: any) {
    this.date = obj && obj.date || '';
    this.startup = new ChecklistHours(obj.startup);
    this.delivery = new ChecklistHours(obj.delivery);
    this.cleanup = new ChecklistHours(obj.cleanup);
    this.total = obj && obj.total || '';
  }
}
