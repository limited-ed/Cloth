import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogResult, Profession, ProfessionCloth } from 'models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Output() ok: EventEmitter<DialogResult> = new EventEmitter();

  visible = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.min(4)])
  });

  profession: Profession;

  constructor() { }

  ngOnInit() {
  }

  showModal(profession: Profession) {
    this.form.reset();
    this.profession = null;
    if (profession) {this.profession = Object.assign(profession);}
    if (profession) {
      this.form.get('title').setValue(profession.title);
    }
    this.visible = true;
  }

  okClick() {
    if (!this.profession) {
      let p: Profession = {id: 0, title: this.form.get('title').value, professionCloth: new Array<ProfessionCloth>()};
      this.profession = p;
    } else {
      this.profession.title = this.form.get('title').value;
    }
    this.visible = false;
    this.ok.emit({isOk: true, result: this.profession});
  }

}
