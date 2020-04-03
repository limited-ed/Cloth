import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee, Division, TreeNode, Profession } from 'models';
import { EditResult } from 'models/editResult';
import { ShareDataService } from 'core';


@Component({
  selector: 'employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  @Input() professions: Profession[];
  @Output() ok: EventEmitter<Employee> = new EventEmitter<Employee>();

  visible = false;
  nodes: TreeNode[];
  selected: TreeNode = null;
  division: Division;
  employee: Employee;

  editForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    tabNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]),
    profession: new FormControl('',[ Validators.required]),
    height: new FormControl('', [Validators.required, Validators.min(100)]),
    headSize: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    clothSize: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]*$')]),
    legSize: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]*$')])
  });

  getChildren = (node: TreeNode) => node.nodes;
  okDisabled = () => {
    return this.editForm.invalid && this.selected === null;
  }

  constructor(private shareData: ShareDataService) { }

  ngOnInit() {
  }

  okClick() {
    this.visible = false;
    Object.entries(this.editForm.value).forEach(([key, value]) => {
      if (key === 'profession') {
        key = 'professionId';
        value  = (value as Profession).id;
      }
      this.employee[key] = value;
    });
    this.employee.divisionId = this.selected.data.id;
    this.ok.emit( this.employee );
  }

  showModal(employee: Employee) {
    this.nodes = new Array<TreeNode>();
    this.selected = null;
    this.buildTree(this.nodes, null, this.shareData.divisions, employee);
    this.editForm.reset();
    if (employee) {
      this.editForm.setValue({fullName: employee.fullName,
                              tabNumber: employee.tabNumber,
                              profession: this.professions.find( f => f.id === employee.professionId),
                              height: employee.height,
                              headSize: employee.headSize,
                              clothSize: employee.clothSize,
                              legSize: employee.legSize});
    }
    this.employee = new Employee();
    if (employee) {
      Object.entries(employee).forEach(([key, value]) => {
        this.employee[key] = value;
      });
    } else {
      this.employee.id = 0;
    }
    this.visible = true;
  }


  select(node: TreeNode) {
    if (this.selected !== null) {
      this.selected.active = false;
    }
    this.selected = node;
    node.active = true;
  }

  private buildTree(nodes: TreeNode[], parent: TreeNode, divisions: Division[], selected: Employee) {
    let parentId = (typeof parent === 'undefined' || parent === null) ? 0 : parent.data.id;
    let childs = divisions.filter(f => f.parentId === parentId);
    if (childs.length < 1) { return; }
    for (let child of childs) {
        let node = new TreeNode();
        node.title = child.title;
        node.data = child;
        node.parent = parent;
        node.active = false;
        if (selected && child.id === selected.divisionId) {
          node.active = true;
          this.expandParents(node.parent);
          this.selected = node;
        }
        node.nodes = new Array<TreeNode>();
        this.buildTree(node.nodes, node, divisions, selected);
        nodes.push(node);
    }
  }

  private expandParents(node: TreeNode) {
    if (node) {
      node.expanded = true;
      this.expandParents(node.parent);
    }
  }

}
