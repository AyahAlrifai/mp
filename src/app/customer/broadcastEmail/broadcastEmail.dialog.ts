import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuillViewComponent } from 'ngx-quill';
import { AccountNumberCell } from '../AccountNumberCell/accountNumberCell.component';

@Component({
    selector: 'broadcast-email',
    templateUrl: './broadcastEmail.dialog.html',
    styleUrls: ['./broadcastEmail.dialog.scss']
})
export class BroadcastEmailDialog {
    
    @ViewChild('taskControler') editorText!: QuillViewComponent;
    public editorValue = "";

    public broadcastemailForm: FormGroup = new FormGroup({
        subject: new FormControl("", Validators.required),
        recipients: new FormControl("", Validators.required)
    });

    constructor(public dialogRef: MatDialogRef<AccountNumberCell>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.broadcastemailForm.controls.recipients.setValue(data.recipients);
    }

    public closeDialog(): void {
        this.dialogRef.close("close");
    }

    public contentChanged(obj: any) {
        this.editorValue = obj.html;
    }

    public isInvalid() : boolean {
        return this.broadcastemailForm.invalid || this.editorValue == '';
    }

    public send() : void {
        let x = this.broadcastemailForm.controls.subject.value;
        let y = this.broadcastemailForm.controls.recipients.value;
        this.dialogRef.close(`${x}   ${y}   ${this.editorValue}`);
    }

}