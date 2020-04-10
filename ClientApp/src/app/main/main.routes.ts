import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'core/guarsds/authentication.guard';

import { MainComponent, HelloComponent } from './components';
import { AdminGuard, SafetyGuard } from 'core';


const routes: Routes = [
    {
        path: '', component: MainComponent, canActivate: [ AuthenticationGuard ],
        children: [
            { path: '',  component: HelloComponent},
            { path: 'professions', loadChildren: () => import('professions/professions.module').then(module => module.ProfessionsModule), canActivate: [SafetyGuard]},
            { path: 'employees', loadChildren: () => import('employees/employees.module').then(module => module.EmployeesModule)},
            { path: 'cloth', loadChildren: () => import('cloth/cloth.module').then(module => module.ClothModule), canActivate: [SafetyGuard]},
            { path: 'divs', loadChildren: () => import('divisions/divisions.module').then(module => module.DivisionsModule), canActivate: [AdminGuard]},
            { path: 'reports', loadChildren: () => import('reports/reports.module').then(module => module.ReportsModule)},
            { path: 'users', loadChildren: () => import('users/users.module').then( module => module.UsersModule), canActivate: [AdminGuard] }
        ]
    }

];

// tslint:disable-next-line:variable-name
export const MainRoutes = RouterModule.forChild(routes);
