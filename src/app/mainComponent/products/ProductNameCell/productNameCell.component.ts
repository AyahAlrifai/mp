import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import {
    ICellRendererParams,
} from '@ag-grid-community/core';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicDialog } from 'src/app/sharedComponent/basicDialog/basic.dialog';
import dialogLookup from 'src/app/dialogLookup';

@Component({
    selector: 'product-name-cell',
    templateUrl: './productNameCell.component.html',
    styleUrls: ['./productNameCell.component.scss']
})
export class ProductNameCell implements ICellRendererAngularComp {
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

    public manageCategories(): void {
        const dialogRef = this.dialog.open(BasicDialog, {
            disableClose: true,
            width: '50%',
            data:{
              "dialogName":"manage Categories",
              "data":"manage Categories dialog"
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
          });
    }

    public addProducts(): void {
        const dialogRef = this.dialog.open(BasicDialog, {
            disableClose: true,
            width: '50%',
            data:{
              "dialogName":"add product",
              "data":"add product dialog"
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
          });
    }
}