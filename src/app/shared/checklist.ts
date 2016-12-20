import { ChecklistStatuses } from './checklistStatuses';
import { ChecklistDay } from './checklistDay';

export interface Checklist {
  customer: string;
  location: string;
  days: ChecklistDay[];
  user: string;   // user id
  status: ChecklistStatuses,

}
