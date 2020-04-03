import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionsComponent } from './components/professions/professions.component';
import { ProfClothComponent } from './components/prof-cloth/prof-cloth.component';
import { ProfessionRoutes } from './professions.routes';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from 'core/core.module';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClothDialogComponent } from './components/cloth-dialog/cloth-dialog.component';


@NgModule({
  declarations: [ProfessionsComponent, ProfClothComponent, EditDialogComponent, ClothDialogComponent],
  imports: [
    CommonModule,
    ProfessionRoutes,
    ClarityModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class ProfessionsModule { }
