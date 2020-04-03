import { Division } from './';

export class TreeNode {
  title: string;
  nodes: TreeNode[];
  selected: boolean;
  active: boolean;
  data: Division;
  parent: TreeNode;
  expanded: boolean;
}
