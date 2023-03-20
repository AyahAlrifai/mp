import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { SettingsProgressDialog } from '../sharedComponent/settingProgress/settingsProgress.dialog';
import { HeaderService } from './header.service';

@Component({
  selector: 'header-view',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public name: String = "";

  constructor(public headerService:HeaderService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SettingsProgressDialog, {
      disableClose: true,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
