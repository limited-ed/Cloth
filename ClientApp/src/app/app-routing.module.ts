import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./main/main.module').then(module => module.MainModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(module => module.LoginModule)}
];

export const AppRoutes = RouterModule.forRoot(routes);

/*

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/
