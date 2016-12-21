import { BaristaComponent} from './barista/barista.component';
import { AuthComponent } from "./auth/auth.component";
import { ChecklistBaristaComponent } from "./barista/checklist-barista/checklist-barista.component";
import { ChecklistFormComponent } from "./barista/checklist-form/checklist-form.component";
import { ProfileComponent} from "./profile/profile.component";
import { BackofficeComponent} from "./backoffice/backoffice.component";
import { ChecklistBackofficeComponent} from "./backoffice/checklist-backoffice/checklist-backoffice.component";
import { ChecklistViewComponent} from "./backoffice/checklist-view/checklist-view.component";

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
  { path: 'backoffice',
    component: BackofficeComponent,
    children: [
      {
        path: 'checklists',
        component: ChecklistBackofficeComponent,
      },
      {
        path: 'checklist/:id',
        component: ChecklistViewComponent
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
