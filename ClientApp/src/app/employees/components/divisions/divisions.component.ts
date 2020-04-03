import { Component, OnInit, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { Division, TreeNode } from 'models';
import { ShareDataService } from 'core';


@Component({
  selector: 'divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.scss']
})
export class DivisionsComponent implements AfterViewInit {
  @Output() selectionChanged: EventEmitter<Division> = new EventEmitter<Division>();

  nodes: TreeNode[];
  getChildren = (node: TreeNode) => node.nodes;

  constructor(private shared: ShareDataService) { }


  ngAfterViewInit(): void {
    setTimeout(() => {
        this.nodes = new Array<TreeNode>();
        this.buildTree(this.nodes, null, this.shared.divisions);
    });

  }

  click(node: TreeNode) {
    this.selectionChanged.emit(node.data);
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

}
