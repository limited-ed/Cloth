import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LoginScreenComponent } from './login-screen/login-screen.component';
import { LoginRoutes } from './login.routes';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [LoginScreenComponent],
  imports: [
    FormsModule,
    LoginRoutes,
    ClarityModule,
    CommonModule
  ]
})
export class LoginModule { }
