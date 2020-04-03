import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogResult, Division } from 'models';


@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  @Output() ok: EventEmitter<DialogResult> = new EventEmitter<DialogResult>();

  division: Division;
  visible = false;
  check: boolean;

  constructor() { }

  ngOnInit() {
  }

  showModal(division: Division) {
    this.division = division;
    this.visible = true;
    this.check = false;
  }

  okClick() {
    this.ok.emit({isOk: true, result: this.division});
    this.visible = false;
  }

}
