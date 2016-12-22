export class ChecklistExpense {
  date: string;
  amount?: number;
  type?: string;
  remark?: string;

  constructor(obj: any) {
    this.date = obj.date || '';
    this.amount = obj.amount || 0;
    this.type = obj.type || '';
    this.remark = obj.remark || '';
  }
}
