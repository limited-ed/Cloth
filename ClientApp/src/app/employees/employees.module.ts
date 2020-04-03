import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesRoutes } from './employees.routes';
import { DivisionsComponent } from './components/divisions/divisions.component';
import { ClarityModule } from '@clr/angular';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { CoreModule } from 'core/core.module';
import { ClothListComponent } from './components/cloth-list/cloth-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { DateEditComponent } from './components/date-edit/date-edit.component';

@NgModule({
  declarations: [EmployeesComponent, DivisionsComponent, EmployeesListComponent, ClothListComponent, EmployeeEditComponent, DateEditComponent],
  imports: [
    CommonModule,
    EmployeesRoutes,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class EmployeesModule { }
