import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cloth, DialogResult } from 'models';

@Component({
  selector: 'cloth-dialog',
  templateUrl: './cloth-dialog.component.html',
  styleUrls: ['./cloth-dialog.component.scss']
})
export class ClothDialogComponent implements OnInit {
  @Input() items: Cloth[] = null;
  @Input() selected: Cloth[];
  @Output() ok: EventEmitter<DialogResult> = new EventEmitter();

  constructor() { }

  visible = false;

  ngOnInit() {
  }

  showModal() {
    this.visible = true;
  }

  okClick() {
    this.visible = false;
    this.ok.emit({isOk: true, result: Object.assign(this.selected)});
  }

}
