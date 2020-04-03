import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Division } from 'models/division';
import { Configuration } from 'app.constants';

@Injectable()
export class DivisionService {
    private readonly apiPath = '/api/divisions/';

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<Division[]> {
        return this.http.get(Configuration.Server + this.apiPath) as Observable<Division[]>;
    }

    get(id: number): Observable<Division> {
        return this.http.get(Configuration.Server + this.apiPath + id.toString()) as Observable<Division>;
    }

    add(division: Division): Observable<Division> {
        return this.http.post(Configuration.Server + this.apiPath, division) as Observable<Division>;
    }

    edit(division: Division): Observable<any> {
        return this.http.put(Configuration.Server + this.apiPath + division.id.toString(), division);
    }

    delete(division: Division): Observable<Division> {
        return  of(null); //this.http.delete(Configuration.Server + this.apiPath + division.id.toString()) as Observable<Division>;
    }
}
