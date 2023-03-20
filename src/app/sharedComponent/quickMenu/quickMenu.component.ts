import { ComponentType } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import dialogLookup from '../../dialogLookup';
import { QuickMenuItem } from './quick-menu-item';

@Component({
  selector: 'app-quick-menu-item',
  templateUrl: './quickMenu.component.html',
  styleUrls: ['./quickMenu.component.scss']
})
export class QuickMenuItemComponent implements OnInit {
  @Input() items: QuickMenuItem[] = [];
  @Input() data:any = {}
  @ViewChild('childMenu', { static: true }) public childMenu: any;

  constructor(public router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  public openDialog(component : any,text:any): void {
    const dialogRef = this.dialog.open(dialogLookup.get(component), {
      disableClose: true,
      width: '50%',
      data:{
        "dialogName":text,
        "data":this.data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
