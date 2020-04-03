import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageBusService } from '../messagebus/message-bus.service';
import { Observable } from 'rxjs';
import { Configuration } from 'app.constants';
import { Profession } from 'models';

@Injectable()
export class ProfessionService {
  private readonly apiPath = '/api/profession/';

  constructor(private http: HttpClient, private message: MessageBusService) {

  }

  getAll( ok: (result: Profession[]) => void): void {
    this.message.sendMessage('isLoading', true);
    let res = this.http.get(Configuration.Server + this.apiPath) as Observable<Profession[]>;
    let s = res.subscribe( {
      next: ok,
      error:  error => {},
      complete: () => {
        this.message.sendMessage('isLoading', false);
        s.unsubscribe();
      }
    });
  }

  add(prof: Profession, ok: (prof: Profession) => void): void {
    this.message.sendMessage('isSaving', true);
    let result = this.http.post(Configuration.Server + this.apiPath, prof) as Observable<Profession>;
    let s = result.subscribe({
      next: next => ok(next),
      error: error => {},
      complete: () => {
        this.message.sendMessage('isSaving', false);
        s.unsubscribe();
      }
    });
  }

  edit(prof: Profession, ok: () => void): Observable<any> {
    this.message.sendMessage('isSaving', true);
    let result = this.http.put(Configuration.Server + this.apiPath + prof.id.toString(), prof);
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
}
