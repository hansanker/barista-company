import { AuthComponent } from "./auth/auth.component";
import { ProfileComponent} from "./profile/profile.component";

export const AppRoutes = [
  { path: 'login', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'barista', loadChildren: './barista/barista.module#BaristaModule'},
  { path: 'backoffice', loadChildren: './backoffice/backoffice.module#BackofficeModule'},
  { path: '', pathMatch: 'full', redirectTo: 'profile'},
  { path: '**', pathMatch: 'full', redirectTo: 'profile'}
];
