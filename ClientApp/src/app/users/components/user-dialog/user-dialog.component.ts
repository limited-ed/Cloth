import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Division, User, UserModel, TreeNode, UserEditResult, UserDivision } from 'models';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AutofocusDirective } from 'core';
import { sha256 } from 'js-sha256';
import { notRequiredOrMinLength, duplicatePassword } from 'core';

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  @Output() ok: EventEmitter<UserEditResult> = new EventEmitter<UserEditResult>();
  @ViewChild(AutofocusDirective, {static: false}) autofocus: AutofocusDirective;

  visible: boolean;

  editDlg = {
    showDlg: false,
    user: new User(),
    model: new UserModel(),
    submiting: false,
    newUser: false
  };

  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [notRequiredOrMinLength(6)]),
    confirm: new FormControl('', [notRequiredOrMinLength(6), duplicatePassword]),
    role: new FormControl()
  });

  nodes: TreeNode[] = new Array<TreeNode>();
  divisions: Division[];
  userModel: UserModel;
  private _user: User;
  private _selected: number[];

  constructor() { }

  ngOnInit() {
  }

  getChildren = (node: TreeNode) => node.nodes;

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.ok.emit({ok: true, user: this._user});
    }
  }

  okClick() {
    this.visible = false;
    let newUser = {
      id: this._user.id,
      login: this.form.get('login').value,
      userName: this.form.get('name').value,
      roleId: this.form.get('role').value * 1
    } as User;
    if ( this.form.value.password !== null && this.form.value.password.length > 0) {
      newUser.passwordHash = sha256(this.form.get('password').value);
    }
    newUser.userDivisions = new Array<UserDivision>();
    this._selected.forEach (e => newUser.userDivisions.push( {divisionId: e, identityUserId: newUser.id} ) );
    this.ok.emit({ok: true, user: newUser});
  }

  cancelClick() {
    this.visible = false;
    this.ok.emit({ok: false, user: null});
  }

  changeSelected(data, node: TreeNode) {
    if (this._selected === null) { return; }
    if (data !== 0) {
      this._selected.push(node.data.id);
    } else {
      let i = this._selected.findIndex(e => e === node.data.id);
      this._selected.splice(i, 1);
    }
  }

  showModal(user: User, divisions: Division[]) {
    this.form.reset();
    this._user = user;
    this._selected = new Array<number>();
    this.form.get('login').setValue(user.login);
    this.form.get('name').setValue(user.userName);
    this.form.get('role').setValue(user.roleId);
    this.nodes = new Array<TreeNode>();
    this.buildTree(this.nodes, 0, divisions, user);
    this.visible = true;
  }



  validate(group: FormGroup, field: string): boolean {
    return group.get(field).invalid && (group.get(field).dirty && group.get(field).touched);
  }

  validateError(group: FormGroup, field: string, error: string): boolean {
      const tmp = group.get(field).hasError(error) && (group.get(field).dirty && group.get(field).touched);
      return tmp;
  }

  private buildTree(nodes: TreeNode[], parent: number, divisions: Division[], user: User) {
    let childs = divisions.filter(f => f.parentId === parent);
    if (childs.length < 1) { return; }
    for (let child of childs) {
        let node = new TreeNode();
        node.title = child.title;
        node.data = child;
        node.nodes = new Array<TreeNode>();
        if (typeof user !== 'undefined' || user != null) {
          if (user.userDivisions.findIndex( e =>  e.divisionId === child.id ) !== -1) {
            node.selected = true;
          }
        }
        this.buildTree(node.nodes, child.id, divisions, user);
        nodes.push(node);
    }
}

}
