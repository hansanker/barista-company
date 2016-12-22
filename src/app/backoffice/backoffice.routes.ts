import { BackofficeComponent} from "./backoffice.component";
import { ChecklistsBackofficeComponent} from "./checklists-backoffice/checklists-backoffice.component";
import { ChecklistViewComponent} from "./checklist-view/checklist-view.component";

export const BackofficeRoutes = [
  { path: '',
    component: BackofficeComponent,
    children: [
      {
        path: 'checklists',
        component: ChecklistsBackofficeComponent,
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
  }
];
