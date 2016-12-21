import { BaristaComponent} from './barista.component';
import { ChecklistBaristaComponent } from "./checklist-barista/checklist-barista.component";
import { ChecklistFormComponent } from "./checklist-form/checklist-form.component";

export const BaristaRoutes = [
  { path: '',
    component: BaristaComponent,
    children: [
      {
        path: 'checklists',
        component: ChecklistBaristaComponent,
      },
      {
        path: 'checklist/:id',
        component: ChecklistFormComponent
      },
      {
        path: '',
        redirectTo: '/checklists',
        pathMatch: 'full'
      }
    ]
  }
];
