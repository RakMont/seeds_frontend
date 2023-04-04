import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {MenuService} from "../services/menu.service";

interface IMenu {
  text: string;
  icon: string;
  routerLink?: string;
  children?: IMenu[];
}
interface FoodNode {
  name: string;
  children?: FoodNode[];
}
const content = require('../../../assets/menu.json');
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() open: any;
  @Input() menuList: IMenu[];
  events: string[] = [];
  opened: boolean;
  //menuList: IMenu[];
  loadingMenuList = true;
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  constructor(private menuS: MenuService) {
  }

  ngOnInit(): void {
    // this.menuList = menu
    //this.menuList = content;
    //console.log(content);
    //this.getMenu();
  }

  getMenu(){
    this.menuS.getMenu().subscribe((data)=>{
      this.menuList=data;
      this.loadingMenuList = false;
    })
  }
}

