import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  model: any = { username: '', password: ''};
  error = '';
  inProgress = false;


  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.inProgress = true;
    this.error = '';
    this.auth.login(this.model.username, this.model.password).subscribe(
      result => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.error = '';
        }
      },
      error => {
        this.inProgress = false;
        if (error.status === 401) {
          this.error = 'Пользователь не авторизован. Неверное имя или пароль';
        } else {
          this.error = 'Ошибка подключения';
        }
      }
    );

  }

}
