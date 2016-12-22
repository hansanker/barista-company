import { ChecklistStatuses } from './checklistStatuses';
import { ChecklistDay } from './checklistDay';
import { ChecklistExpense } from "./checklistExpense";

export class Checklist {
  customer: string;
  location: string;
  days: ChecklistDay[];
  user: string;   // user id
  status: ChecklistStatuses;
  expenses: ChecklistExpense[];
  totalHours: string;
  totalExpenses: number;

  constructor(obj?: any) {
    this.customer = obj && obj.customer || '';
    this.location = obj && obj.location || '';
    this.user = obj && obj.user || '';
    this.days = obj && obj.days ? obj.days.map(day => new ChecklistDay(day)) : [];
    this.status = obj && obj.status || ChecklistStatuses.CREATED;
    this.expenses = obj && obj.expenses ? obj.expenses.map(expense => new ChecklistExpense(expense)) : [];
    this.totalHours = obj && obj.totalHours || '';
    this.totalExpenses = obj && obj.totalExpenses || '';
  }
}
