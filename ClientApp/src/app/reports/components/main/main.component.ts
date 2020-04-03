import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';
import { Report } from 'models';
import { MessageBusService } from 'core';

// tslint:disable: object-literal-key-quotes
// tslint:disable: variable-name
@Component({
  selector: 'report-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private http: HttpClient, private message: MessageBusService) { }

  pdf: ArrayBuffer;
  visible = false;
  reportsList: Report[] = [{id: 1, title: 'Полный отчет'},
                           {id: 1, title: 'С истекающим сроком'},
                           {id: 1, title: 'С истекшим сроком'}];
  selectedReport: Report = null;

  ngOnInit() {

  }

  async showPdf() {
    if (!this.selectedReport) { return; }
    this.message.sendMessage('isLoading', true);
    let HTTPOptions = {
      headers: new HttpHeaders({
         'Accept': 'application/pdf'
      }),
      'responseType': 'blob' as 'json'
   };

    this.http.get('http:\\\\localhost:5000/report/one', HTTPOptions).subscribe( data => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        this.pdf = fileReader.result as ArrayBuffer;
        this.visible = true;
        this.message.sendMessage('isLoading', false);
      };
      fileReader.readAsArrayBuffer(data as Blob);
    });
  }

}
