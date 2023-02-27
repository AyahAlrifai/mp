import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'setting-progress',
    templateUrl: './settingsProgress.dialog.html',
    styleUrls: ['./settingsProgress.dialog.scss']
})
export class SettingsProgressDialog implements OnInit {

    constructor(fb: FormBuilder, public dialogRef: MatDialogRef<any>) {

    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    closeDialog() {
        this.dialogRef.close();
    }

}