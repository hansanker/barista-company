import { BaristaComponent} from './barista.component';
import { ChecklistsBaristaComponent } from "./checklists-barista/checklists-barista.component";
import { ChecklistComponent } from "./checklist/checklist.component";

export const BaristaRoutes = [
  { path: '',
    component: BaristaComponent,
    children: [
      {
        path: 'checklists',
        component: ChecklistsBaristaComponent,
      },
      {
        path: 'checklist/:id',
        component: ChecklistComponent
      },
      {
        path: '',
        redirectTo: 'checklists',
        pathMatch: 'full'
      }
    ]
  }
];
