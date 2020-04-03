import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cloth } from 'models';
import { Configuration } from 'app.constants';
import { MessageBusService } from 'core/messagebus/message-bus.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class ClothService {
    private readonly apiPath = '/api/cloth/';

    constructor(private http: HttpClient, private message: MessageBusService) {

    }

    getAll( ok: (result: Cloth[]) => void): void {
      this.message.sendMessage('isLoading', true);
      let res = this.http.get(Configuration.Server + this.apiPath) as Observable<Cloth[]>;
      let suscription = res.subscribe( {
        next: ok,
        error:  error => {},
        complete: () => {
          this.message.sendMessage('isLoading', false);
          suscription.unsubscribe();
        }
      });

    }

    get(id: number): Observable<Cloth> {
      this.message.sendMessage('isLoading', true);
      let result = this.http.get(Configuration.Server + this.apiPath + id.toString()) as Observable<Cloth>;
      let suscription = result.subscribe({
        error: error => {},
        complete: () => {
          this.message.sendMessage('isLoading', false);
          suscription.unsubscribe();
        }
      });
      return result;
    }

    add(cloth: Cloth, ok: (cloth: Cloth) => void): void {
      this.message.sendMessage('isSaving', true);
      let result = this.http.post(Configuration.Server + this.apiPath, cloth) as Observable<Cloth>;
      let suscription = result.subscribe({
        next: next => ok(next),
        error: error => {},
        complete: () => {
          this.message.sendMessage('isSaving', false);
          suscription.unsubscribe();
        }
      });
    }

    edit(cloth: Cloth): Observable<any> {
      this.message.sendMessage('isSaving', true);
      let result = this.http.put(Configuration.Server + this.apiPath + cloth.id.toString(), cloth);
      let suscription = result.subscribe({
        error: error => {},
        complete: () => {
          this.message.sendMessage('isSaving', false);
          suscription.unsubscribe();
        }
      });
      return result;
    }

    delete(cloth: Cloth): Observable<Cloth> {
        return  of(null); //this.http.delete(Configuration.Server + this.apiPath + Cloth.id.toString()) as Observable<Cloth>;
    }
}
