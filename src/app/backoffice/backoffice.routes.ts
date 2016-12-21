import { BackofficeComponent} from "./backoffice.component";
import { ChecklistBackofficeComponent} from "./checklist-backoffice/checklist-backoffice.component";
import { ChecklistViewComponent} from "./checklist-view/checklist-view.component";

export const BackofficeRoutes = [
  { path: '',
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
  }
];
