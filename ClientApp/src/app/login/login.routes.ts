import { Routes, RouterModule } from '@angular/router';

import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent }
];

export const LoginRoutes = RouterModule.forChild(routes);
