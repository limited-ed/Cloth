import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { EmployeeService, ProfessionService, EmployeeClothService, AuthService } from 'core';
import { Employee, Division, Profession, EmployeeCloth } from 'models';
import { ClrDatagrid } from '@clr/angular';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EditResult } from 'models/editResult';

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  @Output() selectionChanged: EventEmitter<Employee> = new EventEmitter<Employee>();
  @ViewChild(ClrDatagrid, { static: false }) dg: ClrDatagrid;
  @ViewChild(EmployeeEditComponent, { static: false }) employeeEdit: EmployeeEditComponent;


  private allEmployees: Employee[];
  division: Division;
  professions: Profession[];
  currentEmployees: Employee[] = new Array<Employee>();
  selected: Employee;
  findName = '';

  constructor(private service: EmployeeService, private profService: ProfessionService,
              private ecService: EmployeeClothService, private auth: AuthService) { }

  ngOnInit() {
    this.service.getAll( res => {
      this.allEmployees = res;
      this.profService.getAll(profres => {
        this.professions = profres;
      });
    });
  }

  onSelectionChanged(current: Employee ) {
    this.selectionChanged.emit(current);
  }

  changeDivision(division: Division ) {
    if (this.currentEmployees) { this.dg.selection.clearSelection(); }
    this.currentEmployees = this.allEmployees.filter( f => f.divisionId === division.id);
    this.division = division;
  }

  getProf( id: number ) {
    return this.professions.find( f => f.id === id);
  }

  getRowClass(e: Employee) {
    if (!e) { return ''; }
    let color = '';
    e.employeeCloths.forEach( f => {
      if (!f.beginDate || !f.endDate) { return ''; }
      let diff = this.datediff( (new Date(f.endDate)).valueOf(), (new Date()).valueOf());
      if (diff < 31 && diff > 1) {
        color = (color !== 'red') ? 'yellow' : '';
      } else if (diff < 0) {
        color = 'red';
      } else {
        color = (color !== 'red' && color !== 'yellow' ) ? '' : color;
      }

    });
    return color;
  }

  onNew() {
    this.employeeEdit.showModal(null);
  }

  onEdit() {
    if (this.selected) {
      this.employeeEdit.showModal(this.selected);
    }
  }

  editOk( result: Employee ) {
    let employee: Employee = result as Employee;
    if ( employee.id !== 0 ) {
      this.service.edit(employee, () => {
        let oldDivision = this.selected.divisionId;
        let i = this.allEmployees.findIndex( e => e.id === employee.id);
        this.allEmployees[i] = employee;
        this.changeDivision(this.division);
       });

    } else {
      this.service.add(result, res => {
        this.professions.find( f=> f.id === res.professionId).professionCloth.forEach( f => {
          this.ecService.add({employeeId: res.id, clothId: f.clothId} as EmployeeCloth, null);
        });
        this.allEmployees.push(res);
        this.changeDivision(this.division);
    });

    }

  }

  onDelete() {

  }

  onFindEnterPress() {
    if (this.currentEmployees) { this.dg.selection.clearSelection(); }
    this.currentEmployees = this.allEmployees.filter( f => f.fullName.includes(this.findName) || f.tabNumber.toString() === this.findName);
  }

  private datediff(first, second) {
    return Math.round((first - second) / (1000 * 60 * 60 * 24));
  }

  getRole() {
    return parseInt(this.auth.getRole(), 10);
  }
}
