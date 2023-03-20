import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import {
    ICellRendererParams,
} from '@ag-grid-community/core';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicDialog } from 'src/app/sharedComponent/basicDialog/basic.dialog';

@Component({
    selector: 'pricing-book-name-cell',
    templateUrl: './priceBookNameCell.component.html',
    styleUrls: ['./priceBookNameCell.component.scss']
})
export class priceBookNameCell implements ICellRendererAngularComp {
    value: any = {};
    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {
    }

    agInit(params: any): void {
        if (params.data) {
            this.value = params.data;
        }
    }

    refresh(params: ICellRendererParams) {
        if (params.data)
            this.value = params.data;
        return true;
    }

    public edit(): void {
        const dialogRef = this.dialog.open(BasicDialog, {
            disableClose: true,
            width: '50%',
            data:{
              "dialogName":"edit",
              "data":"edit dialog"
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
          });
    }

    public managePriceBook(): void {
        const dialogRef = this.dialog.open(BasicDialog, {
            disableClose: true,
            width: '50%',
            data:{
              "dialogName":"manage Price Book",
              "data":"manage Price Book dialog"
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
          });
    }

    public assignAgents(): void {
        const dialogRef = this.dialog.open(BasicDialog, {
            disableClose: true,
            width: '50%',
            data:{
              "dialogName":"assign agents",
              "data":"assign agents dialog"
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
          });
    }
}