import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import {
    ICellRendererParams,
} from '@ag-grid-community/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BroadcastEmailDialog } from '../broadcastEmail/broadcastEmail.dialog';
import { TerminateCustomerDialog } from '../terminateCustomer/terminateCustomer.dialog';

@Component({
    selector: 'account-number-cell',
    templateUrl: './accountNumberCell.component.html',
    styleUrls: ['./accountNumberCell.component.scss']
})
export class AccountNumberCell implements ICellRendererAngularComp {
    value: any = ['',''];

    constructor(public dialog: MatDialog,private _snackBar: MatSnackBar) {
    }

    agInit(params: ICellRendererParams<any, any>): void {
        if(params.value)
            this.value = params.value;
    }

    refresh(params: ICellRendererParams) {
        if(params.value)
            this.value = params.value;
        return true;
    }

    public addAlert(): void {

    }
    
    public broadcastEmail(): void {
        const dialogRef = this.dialog.open(BroadcastEmailDialog, {
            width: '60%',
            data:{"recipients":"selected"}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this._snackBar.open(result, "select", {
                horizontalPosition: "start",
                verticalPosition: "bottom",
              });
          });
    }

    public terminateCustomer(): void {
        const dialogRef = this.dialog.open(TerminateCustomerDialog, {
            width: '60%',
            data:{"accountNumber":this.value[0],"showTerminateDate":true}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this._snackBar.open(result, "select", {
                horizontalPosition: "start",
                verticalPosition: "bottom",
              });
          });
    }

    public ImmediatleTerminateCustomer(): void {
        const dialogRef = this.dialog.open(TerminateCustomerDialog, {
            width: '60%',
            data:{"accountNumber":this.value[0],"showTerminateDate":false}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this._snackBar.open(result, "select", {
                horizontalPosition: "start",
                verticalPosition: "bottom",
              });
          });
    }
}