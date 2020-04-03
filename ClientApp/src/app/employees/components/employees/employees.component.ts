import { Component, OnInit, ViewChild } from '@angular/core';
import { Division, Employee, EmployeeCloth } from 'models';
import { DivisionsComponent } from '../divisions/divisions.component';
import { EmployeesListComponent } from '../employees-list/employees-list.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  @ViewChild(EmployeesListComponent, { static: false }) employeesList: EmployeesListComponent;

  selectedEmployee: Employee;
  employeeCloth: EmployeeCloth[] = new Array<EmployeeCloth>();

  constructor() {

  }

  ngOnInit() {
  }

  changeDivision(division: Division) {
    this.employeesList.changeDivision(division);

  }

  changeEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    if (employee && employee.employeeCloths) {
      this.employeeCloth = employee.employeeCloths;
    } else {
      this.employeeCloth = new Array<EmployeeCloth>();
    }
  }

}
