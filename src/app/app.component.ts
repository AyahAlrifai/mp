import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as MenuItemData from '../assets/configurations/menu_items.json';
import * as ToolbarIcon from '../assets/configurations/tool_bar_icons.json';
import { MenuItem } from './menu/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public navItems: Array<MenuItem> = [];
  public toolbarItems: Array<MenuItem> = [];

  public logo: string = "";

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.logo = this.appService.getLogo();
    this.navItems = (MenuItemData as any).default;
    this.toolbarItems = (ToolbarIcon as any).default;
  }

}
