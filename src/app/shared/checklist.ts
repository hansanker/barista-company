import { ChecklistStatuses } from './checklistStatuses';
import { ChecklistDay } from './checklistDay';
import { ChecklistExpense } from "./checklistExpense";

export interface Checklist {
  customer: string;
  location: string;
  days: ChecklistDay[];
  user: string;   // user id
  status: ChecklistStatuses;
  expenses: ChecklistExpense[];
}
