import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'core/guarsds/authentication.guard';

import { ProfessionsComponent } from './components/professions/professions.component';


const routes: Routes = [
    {
        path: '', component: ProfessionsComponent}

];

export const ProfessionRoutes = RouterModule.forChild(routes);
