import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountNumberCell } from '../AccountNumberCell/accountNumberCell.component';

@Component({
    selector: 'terminate-customer',
    templateUrl: './terminateCustomer.dialog.html',
    styleUrls: ['./terminateCustomer.dialog.scss']
})
export class TerminateCustomerDialog {

    public accountNumber='';
    public showTerminateDate = false;
    public tirmenateDate: FormGroup = new FormGroup({
        tirmenateDate:new FormControl("",Validators.required)
    });

    constructor(public dialogRef: MatDialogRef<AccountNumberCell>,@Inject(MAT_DIALOG_DATA) public data:any) {
        this.accountNumber=data.accountNumber;
        this.showTerminateDate=data.showTerminateDate;
    }

    public closeDialog() : void {
        this.dialogRef.close("close");
    }

    public confirm() : void {
        let terminate = this.tirmenateDate.controls.tirmenateDate.value;
        if(!this.showTerminateDate || terminate) {
            this.dialogRef.close("confirm (send api request) "+terminate);
        } 
    }

}