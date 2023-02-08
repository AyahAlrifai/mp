import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() items: MenuItem[] = [];
  @ViewChild('childMenu', {static: true}) public childMenu: any;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
}
