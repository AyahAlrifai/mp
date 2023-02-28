import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'setting-progress',
    templateUrl: './settingsProgress.dialog.html',
    styleUrls: ['./settingsProgress.dialog.scss']
})
export class SettingsProgressDialog {

    public tasks = [
        {
            name:"Tax Engine",
            status:"completed",
            route:"/"
        }, 
        {
            name:"Paymeny Gatway",
            status:"not completed",
            route:"/"
        }, 
        {
            name:"StoreFront Settings",
            status:"completed",
            route:"/"
        }, 
    ]

    constructor(public dialogRef: MatDialogRef<HeaderComponent>) {

    }

    closeDialog() {
        this.dialogRef.close();
    }

}