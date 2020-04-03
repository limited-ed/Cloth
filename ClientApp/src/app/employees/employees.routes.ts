import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'core/guarsds/authentication.guard';

import { EmployeesComponent } from './components/employees/employees.component';


const routes: Routes = [
    {
        path: '', component: EmployeesComponent}

];

export const EmployeesRoutes = RouterModule.forChild(routes);
