import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent }
];

export const UsersRoutes = RouterModule.forChild(routes);
