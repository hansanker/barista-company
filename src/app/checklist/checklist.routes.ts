import { ChecklistFormComponent } from '../checklist/checklist-form/checklist-form.component';
import { ChecklistBaristaComponent } from '../checklist/checklist-barista/checklist-barista.component';

export const ChecklistRoutes = [
  {
    path: '',
    component: ChecklistBaristaComponent
  },
  {
    path: 'checklistBarista',
    component: ChecklistBaristaComponent
  },
  {
    path: 'checklistBarista/checklistForm',
    component: ChecklistFormComponent
  }  
];
