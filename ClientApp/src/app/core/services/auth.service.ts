import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpHeaders, HttpClient} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Configuration } from 'app.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: HttpClient) {

    }

    public login(user: string, password: string) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(Configuration.Server + '/token', JSON.stringify({ Username: user, Password: password }), { headers }).pipe
          (map((response: Response) => {
                if (response['token']) {
                    this.token = response['token'];
                    localStorage.setItem('id_token', response['token']);
                    localStorage.setItem('refresh_token', response['refreshToken']);
                    return true;
                } else {
                    return false;
                }

         }));
    }

    public getRole() {
        if (localStorage.getItem('id_token') == null) {
            return false;
        }
        const helper = new JwtHelperService();
        const token = helper.decodeToken(localStorage.getItem('id_token'));
        return token.userRole;
    }

    public getUserName() {
      if (localStorage.getItem('id_token') == null) {
          return false;
      }
      const helper = new JwtHelperService();
      const token = helper.decodeToken(localStorage.getItem('id_token'));
      return token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }



    public isLoggedOn(): boolean {

        if (localStorage.getItem('id_token') != null) {
            const helper = new JwtHelperService();
            if (helper.isTokenExpired(localStorage.getItem('id_token'))) {
                localStorage.removeItem('id_token');
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
}
