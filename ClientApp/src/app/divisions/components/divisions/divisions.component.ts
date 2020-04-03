import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ShareDataService, DivisionService, MessageBusService } from 'core';
import { Division, TreeNode, DialogResult } from 'models';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ClrTreeNode } from '@clr/angular';
import { MoveDialogComponent } from 'divisions/components/move-dialog/move-dialog.component';
import { DeleteDialogComponent } from 'divisions/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss'],

})
export class DivisionsComponent implements OnInit {

  constructor(private data: ShareDataService, private service: DivisionService, private message: MessageBusService) {

  }

  @ViewChild(EditDialogComponent, { static: false }) editDlg: EditDialogComponent;
  @ViewChild(MoveDialogComponent, { static: false }) moveDlg: MoveDialogComponent;
  @ViewChild(DeleteDialogComponent, { static: false }) deleteDlg: DeleteDialogComponent;

  divisions: Division[];
  nodes: TreeNode[];
  selected: TreeNode = null;
  getChildren = (node: TreeNode) => node.nodes;

  ngOnInit() {
    this.nodes = new Array<TreeNode>();
    this.buildTree(this.nodes, null, this.data.divisions);
  }

  onNew() {
    this.editDlg.showModal(this.selected !== null ? this.selected.data : null );
  }

  onEdit() {
    if (this.selected !== null) {
      this.editDlg.showModal(this.selected.data, true);
    } else {
      this.message.sendMessage('error', 'Выберите подразделение');
    }
  }

  onMove() {
    if (this.selected !== null) {
      this.moveDlg.showModal(this.selected.data);
    } else {
      this.message.sendMessage('error', 'Выберите подразделение');
    }
  }

  onDelete() {
    this.deleteDlg.showModal(this.selected.data);
  }

  onEditOk(result: DialogResult) {
    let newDiv = result.result as Division;
    if (newDiv.id === 0 ) {
      this.service.add(newDiv).subscribe(
        res => {
          this.addNode(res);
          this.data.divisions.push(res)
        },
        error => {
          this.message.sendMessage('error', 'Ошибка при сохранении данных');
        });
    } else {
      this.service.edit(newDiv).subscribe (
        res => {
        this.selected.data = newDiv;
        this.selected.title = newDiv.title;
        let i = this.data.divisions.findIndex( f => f.id === newDiv.id);
        this.data.divisions[i] = newDiv;
      },
      error => {
        this.message.sendMessage('error', 'Ошибка при сохранении данных');
      });
    }
  }

  onMoveOk(result: DialogResult) {
    this.service.edit(result.result as Division).subscribe (
      res => {
        let i = this.data.divisions.findIndex( f => f.id === (result.result as Division).id);
        this.data.divisions[i] = (result.result as Division);
        let newParent = this.findNewParentNode(result.result as Division);
        if (newParent && newParent.nodes === null) {
          newParent.nodes = new Array<TreeNode>();
        }
        let index = this.selected.parent.nodes.findIndex( f => f.data.id === (result.result as Division).id);
        if (this.selected.parent.nodes) { this.selected.parent.nodes.splice(index, 1); }
        this.selected.parent = newParent;
        if (newParent) {
          newParent.nodes.push(this.selected);
        } else {
          this.nodes.push(this.selected);
        }
        let newNodes = new Array<TreeNode>();
        newNodes.push(...this.nodes);
        this.nodes = newNodes;
      },
      error => {
        this.message.sendMessage('error', 'Ошибка при сохранении данных');
      });
  }

  onDeleteOk(result: DialogResult) {
    let div: Division = result.result;
    this.service.delete(div).subscribe(
      res => {
        let parentNodes = this.selected.parent ? this.selected.parent.nodes : this.nodes;
        let i = parentNodes.findIndex( f => f.data.id === this.selected.data.id);
        parentNodes.splice(i, 1);
        let newNodes = Array<TreeNode>();
        newNodes.push(...this.nodes);
        this.nodes = newNodes;
      },
      error => {});
  }

  select(node: TreeNode) {
    if (this.selected !== null) {
      this.selected.active = false;
    }
    this.selected = node;
    node.active = true;
  }

  private buildTree(nodes: TreeNode[], parent: TreeNode, divisions: Division[]) {
    let parentId = (typeof parent === 'undefined' || parent === null) ? 0 : parent.data.id;
    let childs = divisions.filter(f => f.parentId === parentId);
    if (childs.length < 1) { return; }
    for (let child of childs) {
        let node = new TreeNode();
        node.title = child.title;
        node.data = child;
        node.parent = parent;
        node.active = false;
        node.nodes = new Array<TreeNode>();
        this.buildTree(node.nodes, node, divisions);
        nodes.push(node);
    }
  }

  private addNode(division: Division) {
    let node = {
      active: false,
      data: division,
      parent: this.selected,
      title: division.title,
      expanded: false,
      nodes: null,
      selected: false
    } as TreeNode;
    if (this.selected !== null) {
      if (this.selected.nodes === null) {
        this.selected.nodes = new Array<TreeNode>();
      }
      this.selected.nodes.push(node);
    } else {
      this.nodes.push(node);
    }
    let newNodes = new Array<TreeNode>();
    newNodes.push(...this.nodes);
    this.nodes = newNodes;
  }

  findNewParentNode(division: Division, nodes: TreeNode[] = null): TreeNode {
    if (nodes === null) {
      nodes = this.nodes;
    }
    for (let node of nodes) {
      if (node.data.id === division.parentId) {
        return node;
      }
      if (node.nodes !== null) {
        let finded = this.findNewParentNode(division, node.nodes);
        if (finded !== null) {
          return finded;
        }
      }
    }
    return null;
  }


}
