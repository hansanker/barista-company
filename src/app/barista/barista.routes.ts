import { BaristaComponent} from './barista.component';
import { ChecklistRoutes } from '../checklist/checklist.routes';
// import { ChecklistBaristaComponent } from '../checklist/checklist-barista/checklist-barista.component';

export const BaristaRoutes = [
  { path: 'barista',
    component: BaristaComponent,
    children: [
      ...ChecklistRoutes,
      {
        path: '',
    redirectTo: 'barista/checklistBarista',
    pathMatch: 'full'
      }
    ]

  }
];


