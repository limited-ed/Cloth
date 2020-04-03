import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { ReportsRoutes } from './reports.routes';
import {  ClarityModule } from '@clr/angular';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ReportsRoutes,
    ClarityModule,
    NgxExtendedPdfViewerModule
  ]
})
export class ReportsModule { }
