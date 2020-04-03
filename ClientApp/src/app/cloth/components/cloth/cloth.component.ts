import { Component, OnInit, ViewChild, AfterViewInit, } from '@angular/core';
import { ClothService } from 'core';
import { Cloth, DialogResult } from 'models';
import { EditDialogComponent } from 'cloth/components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-cloth',
  templateUrl: './cloth.component.html',
  styleUrls: ['./cloth.component.scss']
})
export class ClothComponent implements AfterViewInit {

  @ViewChild(EditDialogComponent, { static: false }) editDlg: EditDialogComponent;

  cloth: Cloth[];
  selected: Cloth = null;

  constructor(private service: ClothService) { }

  ngAfterViewInit() {
    this.service.getAll( result => {
      setTimeout( () => {
          this.cloth = result;
        });
    });
  }

  onNew( ) {
    this.editDlg.showModal(null);
  }

  onEdit() {
    if ( this.selected !== null)  {
      this.editDlg.showModal(this.selected);
    }


  }

  onOkEdit( res: DialogResult ) {
    let cloth = res.result as Cloth;
    if (cloth.id === 0) {
      this.service.add(cloth, result => {
        this.cloth.push(result);
      });
    } else {
      this.service.edit(cloth);
    }
  }

  onDelete() {

  }
}
