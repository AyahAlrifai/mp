import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { QuickMenuItem } from './quick-menu-item';

@Component({
  selector: 'app-quick-menu-item',
  templateUrl: './quickMenu.component.html',
  styleUrls: ['./quickMenu.component.scss']
})
export class QuickMenuItemComponent implements OnInit {
  @Input() items: QuickMenuItem[] = [];
  @ViewChild('childMenu', {static: true}) public childMenu: any;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
}
