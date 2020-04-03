import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({providedIn: 'root'})
export class MessageBusService {


    private subject = new Subject<Message>();

    sendMessage(serviceName: string, payload: any) {
        this.subject.next({ serviceName, payload });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<Message> {
        return this.subject.asObservable();
    }

}
