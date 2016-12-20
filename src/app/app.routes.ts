import { BaristaComponent} from './barista/barista.component';
import { AuthComponent } from "./auth/auth.component";
import { ChecklistBaristaComponent } from "./checklist/checklist-barista/checklist-barista.component";
import { ChecklistFormComponent } from "./checklist/checklist-form/checklist-form.component";
import {ProfileComponent} from "./profile/profile.component";

export const AppRoutes = [
  { path: 'barista',
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
  },
  { path: 'login', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', pathMatch: 'full', component: BaristaComponent }
];
