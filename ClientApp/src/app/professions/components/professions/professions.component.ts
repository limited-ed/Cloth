import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ProfessionService, ClothService } from 'core';
import { Profession, ProfessionCloth, DialogResult, Cloth } from 'models';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss']
})
export class ProfessionsComponent implements AfterViewInit {
  @ViewChild(EditDialogComponent, { static: false }) editDlg: EditDialogComponent;

  profs: Profession[];
  cloth: Cloth[];
  selected: Profession = {id: 0, title: '', professionCloth: new Array<ProfessionCloth> ()};

  constructor(private service: ProfessionService, private cservice: ClothService) { }

    ngAfterViewInit(): void {
      this.service.getAll( res => {
        this.profs = res;
        this.cservice.getAll( res=> {
          this.cloth = res;
        });
      });
  }

  onNew() {
    this.editDlg.showModal(null);
  }

  onEdit() {
    this.editDlg.showModal(this.selected);
  }

  onDelete() {

  }

  onEditOk(result: DialogResult) {
    let prof = result.result as Profession;
    if (prof.id === 0 ) {
      this.service.add(prof, res => {
        this.profs.push(res);
      });
    } else {
      this.service.edit(prof, () => {
        let i = this.profs.findIndex ( f => f.id === prof.id );
        this.profs[i] = prof;
      });
    }
  }
}
