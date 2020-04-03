import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageBusService } from '../messagebus/message-bus.service';
import { Observable } from 'rxjs';
import { Configuration } from 'app.constants';
import { Profession, ProfessionCloth } from 'models';

@Injectable()
export class ProfessionClothService {
  private readonly apiPath = '/api/professioncloth/';

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

  edit(prof: number, profCloth: ProfessionCloth[], ok: () => void): Observable<any> {
    this.message.sendMessage('isSaving', true);
    let result = this.http.post(Configuration.Server + this.apiPath + prof.toString(), profCloth);
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
