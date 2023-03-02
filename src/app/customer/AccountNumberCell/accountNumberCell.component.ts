import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import {
    ICellRendererParams,
} from '@ag-grid-community/core';
import { MatDialog } from '@angular/material/dialog';
import { BroadcastEmailDialog } from '../broadcastEmail/broadcastEmail.dialog';
import { TerminateCustomerDialog } from '../terminateCustomer/terminateCustomer.dialog';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
    selector: 'account-number-cell',
    templateUrl: './accountNumberCell.component.html',
    styleUrls: ['./accountNumberCell.component.scss']
})
export class AccountNumberCell implements ICellRendererAngularComp {
    value: any = {};
    public customerQuickActions: any = [{
        text:"",
        textRoute:"",
        icon:"menu",
        iconRoute:"",
        children:[]
    }];

    constructor(public dialog: MatDialog,private http: HttpClient, private _snackBar: MatSnackBar) {
    }

    agInit(params: ICellRendererParams<any, any>): void {
        if (params.data)
            this.value = params.data;
        forkJoin(
            this.http.get(`../../assets/configurations/customer-quick-options.json`)
        ).subscribe(([customerQuickActions]) => {
            this.customerQuickActions = customerQuickActions;
        }, err => {
            this._snackBar.open(err.message, "failed", {
                horizontalPosition: "start",
                verticalPosition: "bottom",
            });
        });
    }

    refresh(params: ICellRendererParams) {
        if (params.value)
            this.value = params.value;
        return true;
    }

    public addAlert(): void {

    }

    public broadcastEmail(): void {
        const dialogRef = this.dialog.open(BroadcastEmailDialog, {
            disableClose: true,
            width: '50%',
            data: { "recipients": "selected" }
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
            disableClose: true,
            width: '50%',
            data: { "accountNumber": this.value.accountNumber, "companyName": this.value.companyName, "showTerminateDate": true }
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
            disableClose: true,
            width: '50%',
            data: { "accountNumber": this.value.accountNumber, "companyName": this.value.companyName, "showTerminateDate": false }
        });

        dialogRef.afterClosed().subscribe(result => {
            this._snackBar.open(result, "select", {
                horizontalPosition: "start",
                verticalPosition: "bottom",
            });
        });
    }
}