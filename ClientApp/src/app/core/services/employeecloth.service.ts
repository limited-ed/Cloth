import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Configuration } from 'app.constants';
import { EmployeeCloth } from 'models';
import { MessageBusService } from 'core/messagebus/message-bus.service';

@Injectable()
export class EmployeeClothService {
    private readonly apiPath = '/api/employeeCloth/';

    constructor(private http: HttpClient, private message: MessageBusService) {

    }

    getAll( ok: (result: EmployeeCloth[]) => void): void {
      this.message.sendMessage('isLoading', true);
      let res = this.http.get(Configuration.Server + this.apiPath) as Observable<EmployeeCloth[]>;
      let s = res.subscribe( {
        next: ok,
        error:  error => {},
        complete: () => {
          this.message.sendMessage('isLoading', false);
          s.unsubscribe();
        }
      });
    }
    add(employeeCloth: EmployeeCloth, ok: (employeeCloth: EmployeeCloth) => void): void {
      this.message.sendMessage('isSaving', true);
      let result = this.http.post(Configuration.Server + this.apiPath, employeeCloth) as Observable<EmployeeCloth>;
      let s = result.subscribe({
        next: next => ok(next),
        error: error => {},
        complete: () => {
          this.message.sendMessage('isSaving', false);
          s.unsubscribe();
        }
      });
    }

    edit(employeeCloth: EmployeeCloth, ok: (employeeCloth: EmployeeCloth) => void): Observable<any> {
      this.message.sendMessage('isSaving', true);
      let result = this.http.put(Configuration.Server + this.apiPath, employeeCloth);
      let s = result.subscribe({
        next: ok,
        error: error => {},
        complete: () => {
          this.message.sendMessage('isSaving', false);
          s.unsubscribe();
        }
      });
      return result;
    }

        deletee(employeeCloth: EmployeeCloth): Observable<EmployeeCloth> {
        return  of(null); //this.http.delete(Configuration.Server + this.apiPath + EmployeeCloth.id.toString()) as Observable<EmployeeCloth>;
    }
  }
