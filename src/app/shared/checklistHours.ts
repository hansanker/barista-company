export class ChecklistHours {
  start: string;
  end: string;
  total: string;

  constructor(obj?: any) {
    this.start = obj && obj.start || '';
    this.end = obj && obj.end || '';
    this.total = obj && obj.total || '';
  }
}

