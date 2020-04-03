import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeCloth } from 'models';


@Component({
  selector: 'date-edit',
  templateUrl: './date-edit.component.html',
  styleUrls: ['./date-edit.component.scss']
})
export class DateEditComponent implements OnInit {
  @Output() ok: EventEmitter<any> = new EventEmitter<any>();

  visible = false;

  date: Date = null;

  private ec: EmployeeCloth;

  constructor() { }

  ngOnInit() {

  }

  okClick() {
    this.ec.beginDate = this.date;
    this.ok.emit({employeeCloth: this.ec, date: this.date});
    this.visible = false;
  }

  showModal( ec: EmployeeCloth) {
    this.ec = ec;
    this.visible = true;
  }
}
