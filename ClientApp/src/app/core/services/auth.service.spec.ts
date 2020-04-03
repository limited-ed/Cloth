import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { Configuration } from 'app.constants';

describe('AuthService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    localStorage.removeItem('token');

  });

  it('Testing login', inject([ HttpTestingController , AuthService], (httpMock: HttpTestingController, service: AuthService) => {
      service.login('login', 'password').subscribe( data => {
          expect(data).toBeTruthy();
          //expect(localStorage.getItem('token')).toEqual('token');
          //expect(service.isLoggedOn()).toBeTruthy();
        });
      const req = httpMock.expectOne(Configuration.Server + '/token');
      expect(req.request.method).toEqual('POST');

      req.flush({token: 'token', refresh_token: 'refresh_token'});
  }));



  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
});
