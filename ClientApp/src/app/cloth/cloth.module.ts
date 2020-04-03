import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClothComponent } from './components/cloth/cloth.component';
import { ClothRoutes } from './cloth.routes';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from 'core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [ClothComponent, EditDialogComponent],
  imports: [
    ClothRoutes,
    CommonModule,
    CoreModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClothModule { }
