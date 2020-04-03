import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'core/guarsds/authentication.guard';

import { DivisionsComponent } from './components/divisions/divisions.component';


const routes: Routes = [
    {
        path: '', component: DivisionsComponent}

];

export const DivisionRoutes = RouterModule.forChild(routes);
