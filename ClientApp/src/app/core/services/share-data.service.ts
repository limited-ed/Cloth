import { Injectable } from '@angular/core';
import { Division } from 'models';
@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public divisions: Division[];

  constructor() { }
}
