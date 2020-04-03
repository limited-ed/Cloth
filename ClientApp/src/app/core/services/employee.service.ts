import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Configuration } from 'app.constants';
import { Employee } from 'models';
import { MessageBusService } from 'core/messagebus/message-bus.service';

@Injectable()
export class EmployeeService {
    private readonly apiPath = '/api/employee/';

    constructor(private http: HttpClient, private message: MessageBusService) {

    }

    getAll( ok: (result: Employee[]) => void): void {
      this.message.sendMessage('isLoading', true);
      let res = this.http.get(Configuration.Server + this.apiPath) as Observable<Employee[]>;
      let s = res.subscribe( {
        next: ok,
        error:  error => {},
        complete: () => {
          this.message.sendMessage('isLoading', false);
          s.unsubscribe();
        }
      });
    }
    add(employee: Employee, ok: (employee: Employee) => void): void {
      this.message.sendMessage('isSaving', true);
      let result = this.http.post(Configuration.Server + this.apiPath, employee) as Observable<Employee>;
      let s = result.subscribe({
        next: next => ok(next),
        error: error => {},
        complete: () => {
          this.message.sendMessage('isSaving', false);
          s.unsubscribe();
        }
      });
    }

    edit(employee: Employee, ok: () => void): Observable<any> {
      this.message.sendMessage('isSaving', true);
      let result = this.http.put(Configuration.Server + this.apiPath + employee.id.toString(), employee);
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

        deletee(employee: Employee): Observable<Employee> {
        return  of(null); //this.http.delete(Configuration.Server + this.apiPath + Employee.id.toString()) as Observable<Employee>;
    }
  }
