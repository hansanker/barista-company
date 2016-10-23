// import { LoginComponent } from './auth/login';
// import { RegistrationComponent } from './auth/registration';
import { BaristaRoutes } from './barista/barista.routes';
import { BaristaComponent} from './barista/barista.component';


export const AppRoutes = [
 ...BaristaRoutes,
   { path: '', component: BaristaComponent },
//   { path: 'register', component: RegistrationComponent }
];