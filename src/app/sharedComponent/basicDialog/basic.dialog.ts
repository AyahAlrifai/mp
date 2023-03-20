import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'basic-dialog',
    templateUrl: './basic.dialog.html',
    styleUrls: ['./basic.dialog.scss']
})
export class BasicDialog {

   public dialogName = "";
   public value = {};
    constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogName = data.dialogName;
        this.value=data.data;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    public getAllData() : string {               
         return JSON.stringify(this.value).split(",").join("<br>");
    }
}