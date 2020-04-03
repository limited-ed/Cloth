import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent }
];

export const ReportsRoutes = RouterModule.forChild(routes);
