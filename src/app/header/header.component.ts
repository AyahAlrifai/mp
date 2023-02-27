import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { SettingsProgressDialog } from '../settingProgress/settingsProgress.dialog';

@Component({
  selector: 'header-view',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() name: string = "";

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SettingsProgressDialog, {
      height: '60%',
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
