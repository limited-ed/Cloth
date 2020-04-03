import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Cloth, Profession, ProfessionCloth, DialogResult } from 'models';
import { ClothDialogComponent } from '../cloth-dialog/cloth-dialog.component';
import { ProfessionClothService } from 'core';

@Component({
  selector: 'prof-cloth',
  templateUrl: './prof-cloth.component.html',
  styleUrls: ['./prof-cloth.component.scss'
  ]
})
export class ProfClothComponent implements OnInit {
  @Input() prof: Profession;
  @Input() cloth: Cloth[];
  @ViewChild(ClothDialogComponent, { static: false }) clothDlg: ClothDialogComponent;

  selected: Cloth;
  selectedArray: Cloth[];

  constructor(private service: ProfessionClothService) { }

  ngOnInit() {
  }

  onAdd() {
    this.selectedArray = new Array<Cloth>();
    this.prof.professionCloth.forEach( f => this.selectedArray.push(this.cloth.find( i => i.id === f.clothId)));
    this.clothDlg.showModal();
  }

  onOk(result: DialogResult) {
    let newCloth = new Array<ProfessionCloth> ();
    (result.result as Cloth[]).forEach( f => newCloth.push ({
        professionId: this.prof.id,
        clothId: f.id,
       // cloth: this.cloth.find( i => i.id === f.id)
      } as ProfessionCloth));
    this.service.edit(this.prof.id, newCloth, () => {
      newCloth.forEach( f => f.cloth = this.cloth.find( i => i.id === f.clothId));
      this.prof.professionCloth = newCloth;
    });

  }
}
