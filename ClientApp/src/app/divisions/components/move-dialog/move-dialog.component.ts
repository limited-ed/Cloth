import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogResult, Division, TreeNode } from 'models';
import { ShareDataService } from 'core';

@Component({
  selector: 'move-dialog',
  templateUrl: './move-dialog.component.html',
  styleUrls: ['./move-dialog.component.scss']
})
export class MoveDialogComponent implements OnInit {
  @Output() ok: EventEmitter<DialogResult> = new EventEmitter<DialogResult>();

  visible = false;

  divisions: Division[];
  nodes: TreeNode[];
  selected: TreeNode = null;
  division: Division;

  getChildren = (node: TreeNode) => node.nodes;

  constructor(private shareData: ShareDataService) { }

  ngOnInit() {

  }

  showModal(division: Division) {
    this.nodes = new Array<TreeNode>();
    this.division = division;
    this.nodes.push({
      active: false,
      data: { id: 0, parentId: 0, title: '' },
      expanded: true,
      nodes: new Array<TreeNode>(),
      parent: null,
      selected: false,
      title: 'Корень'
    })
    this.buildTree(this.nodes[0].nodes, null, this.shareData.divisions, division);
    this.visible = true;
  }

  okClick() {
    this.visible = false;
    this.division.parentId = this.selected.data.id;
    this.ok.emit({isOk: true, result: this.division});
  }

  select(node: TreeNode) {
    if (this.selected !== null) {
      this.selected.active = false;
    }
    this.selected = node;
    node.active = true;
  }

  private buildTree(nodes: TreeNode[], parent: TreeNode, divisions: Division[], exclude: Division) {
    let parentId = (typeof parent === 'undefined' || parent === null) ? 0 : parent.data.id;
    let childs = divisions.filter(f => f.parentId === parentId);
    if (childs.length < 1) { return; }
    for (let child of childs) {
        if (child.id === exclude.id ) {
          continue;
        }
        let node = new TreeNode();
        node.title = child.title;
        node.data = child;
        node.parent = parent;
        node.active = false;
        node.nodes = new Array<TreeNode>();
        this.buildTree(node.nodes, node, divisions, exclude);
        nodes.push(node);
    }
  }

}
