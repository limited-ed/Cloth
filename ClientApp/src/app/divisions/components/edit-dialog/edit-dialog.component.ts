import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Division, TreeNode, DialogResult } from 'models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShareDataService} from 'core';


@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Output() ok: EventEmitter<DialogResult> = new EventEmitter<DialogResult>();
  visible = false;

  division: Division = null;

  editForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  edit: boolean;

  constructor() { }

  ngOnInit() {
  }

  okClick() {
    let newDiv = {
      id: this.division.id,
      title: this.editForm.get('title').value,
      parentId: this.division.parentId
    };
    this.ok.emit( {isOk: true, result: newDiv} );
    this.visible = false;
  }

  showModal(division: Division, edit: boolean = false) {
    if (edit) {
      this.division = division;
    } else {
      this.division = {
        id: 0,
        title: '',
        parentId: division !== null ? division.id : 0
      };
    }
    this.edit = edit;
    this.editForm.get('title').setValue(this.division.title);
    this.visible = true;

  }

  private buildTree(nodes: TreeNode[], parent: TreeNode, divisions: Division[], exclude: Division) {
    let parentId = (typeof parent === 'undefined' || parent === null) ? 0 : parent.data.id;
    let childs = divisions.filter(f => f.parentId === parentId);
    if (childs.length < 1) { return; }
    for (let child of childs) {
      if (!exclude !== null && child.id !== exclude.id) {
        let node = new TreeNode();
        node.title = child.title;
        node.data = child;
        node.parent = parent;
        node.nodes = new Array<TreeNode>();
        this.buildTree(node.nodes, node, divisions, exclude);
        nodes.push(node);
      }

    }
  }

}
