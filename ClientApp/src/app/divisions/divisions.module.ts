import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionRoutes } from './divisions.routes';
import { ClarityModule } from '@clr/angular';
import { DivisionsComponent } from './components/divisions/divisions.component';
import { CoreModule } from 'core/core.module';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoveDialogComponent } from './components/move-dialog/move-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [DivisionsComponent, EditDialogComponent, MoveDialogComponent, DeleteDialogComponent],
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DivisionRoutes,
    ClarityModule
  ]
})
export class DivisionsModule { }
