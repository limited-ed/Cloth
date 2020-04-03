import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpModule, Http, RequestOptions } from "@angular/http";
import { AuthHttp, AuthConfig, AuthConfigConsts, IAuthConfig, provideAuth } from 'angular2-jwt';
import { Division } from '../../models/division';
import { Configuration } from './../../app.constants';
import { DivisionService } from './divisions.service';
import { AuthService } from '../services/auth.service';


describe('Divisions Service', async () => {
    var auth: AuthService;

    const authConfig: IAuthConfig = {
        headerName: AuthConfigConsts.DEFAULT_HEADER_NAME,
        headerPrefix: null,
        tokenName: AuthConfigConsts.DEFAULT_TOKEN_NAME,
        tokenGetter: () => {
            var token = localStorage.getItem('id_token');
            return token;
        },
        noJwtError: false,
        noClientCheck: false,
        globalHeaders: [],
        noTokenScheme: false
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [provideAuth(authConfig), Configuration, DivisionService, AuthService
            ]
        });
        //localStorage.removeItem('id_token');
   /*     auth = TestBed.get(AuthService);
        await auth.login('', '').toPromise();      */

    });
    it('login', async () => {
       // localStorage.removeItem('id_token');
        const loginSrv: AuthService = TestBed.get(AuthService);
        await loginSrv.login('', '').toPromise();
    });

    it('get all', () => {
        const service: DivisionService = TestBed.get(DivisionService);
        service.getAll().subscribe(divisions => {
            expect(divisions.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('get by id', () => {
        const service: DivisionService = TestBed.get(DivisionService);
        service.get(1).subscribe(division => {
            expect(division.id).toBe(1);
        });
        
    });

    it('add new', () => {
        const service: DivisionService = TestBed.get(DivisionService);
        var division: Division = new Division();
        division.organizationId = 1;
        division.title = 'Новое подразделение';
        service.add(division).subscribe(_new =>
            service.get(_new.id).subscribe(returned =>
                expect(returned.id).toEqual(_new.id)));
    });

    it('edit', () => {
        const service: DivisionService = TestBed.get(DivisionService);
        service.getAll().subscribe(d => {
            d[0].title = 'testing';
            service.edit(d[0]).subscribe(_ => {
                service.get(d[0].id).subscribe(_new => {
                    expect(_new.title).toEqual(d[0].title);
                })
            })
        });
    });

    it('delete', () => {
        const service: DivisionService = TestBed.get(DivisionService);
        service.getAll().subscribe(d => {
            service.delete(d[0]).subscribe(deleted => {
                expect(deleted.id).toEqual(d[0].id);
            })
        });
    });

});
