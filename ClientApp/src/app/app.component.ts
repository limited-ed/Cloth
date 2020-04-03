import { Component, OnInit } from '@angular/core';
import { DivisionService, ShareDataService, MessageBusService } from 'core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ClientApp';

  constructor(  private messageBus: MessageBusService) {

  }

  ngOnInit(): void {

  }

}
