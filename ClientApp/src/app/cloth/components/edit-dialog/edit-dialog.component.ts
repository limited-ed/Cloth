import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogResult, Cloth } from 'models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Output() ok: EventEmitter<DialogResult> = new EventEmitter();

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    period: new FormControl('', [Validators.required, Validators.min(1), Validators.max(60)])
  });

  visible = false;
  edit = false;

  private cloth: Cloth;

  constructor() { }

  ngOnInit() {
  }

  showModal(cloth: Cloth) {
    this.cloth = cloth;
    if (cloth) {
      this.form.get('title').setValue(cloth.title);
      this.form.get('period').setValue(cloth.period);
      this.edit = true;
    } else {
      this.form.get('title').reset();
      this.form.get('period').reset();
      this.edit = false;
    }
    this.visible = true;
  }

  okClick() {
    if (this.cloth) {
      this.cloth.title = this.form.get('title').value;
      this.cloth.period = this.form.get('period').value;
    } else {
      this.cloth = {
        id: 0,
        title: this.form.get('title').value,
        period: this.form.get('period').value
      } as Cloth;
    }
    this.ok.emit({ isOk: true, result: this.cloth});
    this.visible = false;
  }

}
