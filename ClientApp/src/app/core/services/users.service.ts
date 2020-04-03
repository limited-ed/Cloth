import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Configuration } from 'app.constants';
import { User } from 'models';
import { map } from 'rxjs/operators';


@Injectable()
export class UsersService {

    private readonly apiPath = '/api/users/';

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<User[]> {
        return this.http.get(Configuration.Server + this.apiPath) as Observable<User[]>;
    }

    edit(user: User): Observable<any> {
        return this.http.put(Configuration.Server + this.apiPath + user.id.toString(), user);
    }

    add(user: User): Observable<User> {
        return this.http.post(Configuration.Server + this.apiPath, user) as Observable<User>;
    }

    delete(userId: number): Observable<any> {
        return this.http.delete(Configuration.Server + this.apiPath + userId);
    }

}
