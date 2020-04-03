import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutes } from './user.routes';
import { CoreModule } from 'core/core.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [UsersComponent, UserDialogComponent, PasswordDialogComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    UsersRoutes,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    CoreModule
  ]
})
export class UsersModule { }
