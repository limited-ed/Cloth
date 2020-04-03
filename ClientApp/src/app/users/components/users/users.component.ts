import { OnInit, Input } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { User, Division, UserRole, UserDivision, UserEditResult } from 'models';
import { MessageBusService, DivisionService, sleep, ShareDataService } from 'core';
import { UsersService } from 'core';
import { UserDialogComponent } from './../user-dialog/user-dialog.component';
import {  Observable } from 'rxjs';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {
    @ViewChild(UserDialogComponent, { static: false }) editUserDlg: UserDialogComponent;
    @ViewChild(PasswordDialogComponent, { static: false }) editPassDlg: PasswordDialogComponent;
    @ViewChild(DeleteDialogComponent, { static: false }) deleteDlg: DeleteDialogComponent;
    /** admin ctor */
    roles: UserRole[] = [
        { id: 1, role: 'Только просмотр' },
        { id: 2, role: 'Кладовщик' },
        { id: 3, role: 'Отдел охраны труда' },
        { id: 4, role: 'Администратор' },
    ];

    users: User[] = [];
    divisions: Division[] = [];

    showEdit = false;

    editUserSubscription: Observable<UserEditResult>;


    constructor(private service: UsersService, private dService: DivisionService,
                private messageBus: MessageBusService, private shareData: ShareDataService) {
    }

    ngOnInit(): void {
        this.messageBus.sendMessage('isLoading', true);
        this.service.getAll().subscribe(data => {
                this.messageBus.sendMessage('isLoading', false);
                this.users = data;
                this.divisions = this.shareData.divisions;

            }, error => {
                this.messageBus.sendMessage('error', 'Произошла ошибка во время загрузки данных');
        });
    }

    onNew() {
      this.editUserDlg.showModal({
        id: 0,
        userName: '',
        login: '',
        roleId: 1,
        userDivisions: new Array<UserDivision>()
      } as User, this.divisions);
    }

    onEdit(user: User) {
      this.editUserDlg.showModal(user, this.divisions);
    }

    saveUserToSrv(result: UserEditResult) {
      if (result.ok) {
        if (result.user.id > 0) {
          this.service.edit(result.user).subscribe( ok => {
              let index = this.users.findIndex( f => f.id === result.user.id);
              this.users[index] = result.user;
            }, error => {
              this.messageBus.sendMessage('error', 'Произошла ошибка во время сохранения данных');
            }
          );
        } else {
          this.service.add(result.user).subscribe( ok => {
              this.users.push( ok );
            }, error => {
              this.messageBus.sendMessage('error', 'Произошла ошибка во время сохранения данных');
            }
          );
        }
      }
    }

    onChangePassword(user: User) {
      this.editPassDlg.showModal(user);
    }

    onDelete(user: User) {
      this.deleteDlg.showModal(user);
    }

    deleteFromSrv(result: UserEditResult) {
      if (result.ok) {
        this.service.delete(result.user.id).subscribe ( ok => {
          let index = this.users.findIndex(f => f.id === result.user.id);
          this.users.splice(index, 1);
        }, error => {
          this.messageBus.sendMessage('error', 'Произошла ошибка во время сохранения данных');
        });
      }
    }

    getUserRole(id: number) {
        return (typeof id !== 'undefined') ? this.roles.find(f => f.id === id).role : 0;
    }

}

