import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserEditResult, User } from 'models';


@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  @Output() ok: EventEmitter<UserEditResult> = new EventEmitter<UserEditResult>();
  visible: boolean;
  user: User;

  constructor() { }

  ngOnInit() {
  }

  showModal(user: User) {
    this.user = user;
    this.visible = true;
  }

  okClick() {
    this.visible = false;
    this.ok.emit ( {ok: true, user: this.user} );
  }

}
