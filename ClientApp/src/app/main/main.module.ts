import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { MainRoutes} from './main.routes';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { HelloComponent } from './components/hello/hello.component';
import { CoreModule } from 'core/core.module';

@NgModule({
  declarations: [MainComponent, HelloComponent ],
  imports: [
    MainRoutes,
    ClarityModule,
    ClrIconModule,
    CommonModule,
    CoreModule
  ]
})
export class MainModule { }
