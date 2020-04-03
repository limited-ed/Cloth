import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Employee, EmployeeCloth } from 'models';
import { ClrDatagrid } from '@clr/angular';
import { DateEditComponent } from '../date-edit/date-edit.component';
import { EmployeeClothService, AuthService } from 'core';
import { cloneObj } from 'core';

@Component({
  selector: 'cloth-list',
  templateUrl: './cloth-list.component.html',
  styleUrls: ['./cloth-list.component.scss']
})
export class ClothListComponent implements OnInit, OnChanges {
  @Input() items: EmployeeCloth[];

  @ViewChild(ClrDatagrid, { static: false }) dg: ClrDatagrid;
  @ViewChild(DateEditComponent, { static: false }) de: DateEditComponent;

  selected: EmployeeCloth;

  constructor( private service: EmployeeClothService, private auth: AuthService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dg && this.dg.selection.current) { this.dg.selection.clearSelection(); }
  }

  changeDate( ec: EmployeeCloth ) {
    this.de.showModal(ec);
  }

  onOk(res: any) {
    let newec: EmployeeCloth = cloneObj(res.employeeCloth);
    newec.beginDate = res.date;
    this.service.edit(newec, ec => {
      (res.employeeCloth as EmployeeCloth).beginDate = ec.beginDate;
      (res.employeeCloth as EmployeeCloth).endDate = ec.endDate;
    });
  }

  getClass(ec: EmployeeCloth) {
    if (!ec.beginDate || !ec.endDate) {  return 'clear'; }
    let diff = this.datediff( (new Date(ec.endDate)).valueOf(), (new Date()).valueOf());
    if (diff < 31 && diff > 1) {
      return 'yellow';
    } else if (diff < 0) {
      return 'red';
    } else {
      return 'clear';
    }
  }

  getImageClass(ec: EmployeeCloth) {
    if (!ec.beginDate || !ec.endDate) {  return 'clear'; }
    let diff = this.datediff( (new Date(ec.endDate)).valueOf(), (new Date()).valueOf());
    if (diff < 31 && diff > 1) {
      return 'yellow';
    } else if (diff < 0) {
      return 'red';
    } else {
      return 'clear';
    }
  }

  datediff(first, second) {
    return Math.round((first - second) / (1000 * 60 * 60 * 24));
  }

  getRole() {
    return parseInt(this.auth.getRole(), 10);
  }

}
