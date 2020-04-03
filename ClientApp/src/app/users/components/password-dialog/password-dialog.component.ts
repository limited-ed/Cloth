import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserEditResult, User, PasswordModel } from 'models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { duplicatePassword } from 'core';

import { sha256 } from 'js-sha256';

@Component({
  selector: 'password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
  @Output() ok: EventEmitter<UserEditResult> = new EventEmitter<UserEditResult>();
  visible: boolean;

  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm: new FormControl('', [Validators.required, Validators.minLength(6), duplicatePassword])
  });

  model = { newPassword: '', confirmation: '' } as PasswordModel;
  user: User;


  constructor() { }

  ngOnInit() {
  }

  showModal(user) {
    this.user = user;
    this.visible = true;
  }

  onOk() {
    this.user.passwordHash = sha256(this.form.get('password').value);
    this.ok.emit( {ok: true, user: this.user} );
    this.visible = false;
  }

  onCancel() {
    this.ok.emit( {ok: false, user: null} );
    this.visible = false;
  }

  validate(group: FormGroup, field: string): boolean {
    return group.get(field).invalid && (group.get(field).dirty && group.get(field).touched);
  }

  validateError(group: FormGroup, field: string, error: string): boolean {
      const tmp = group.get(field).hasError(error) && (group.get(field).dirty && group.get(field).touched);
      return tmp;
  }


}
