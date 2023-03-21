import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { HeaderService } from 'src/app/header/header.service';
import { SpinnerService } from 'src/app/sharedComponent/spinner/spinner.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashBoardComponent implements OnInit, OnDestroy {
    public dashboardConfig: any = [];

    constructor(private http: HttpClient, private _snackBar: MatSnackBar, private headerService: HeaderService, public spinnerService: SpinnerService) {
        this.headerService.updateHeader("");
    }

    ngOnDestroy(): void {
        this.spinnerService.hideSpinner();
    }

    ngOnInit() {
        this.loadRequiredData();
    }

    private loadRequiredData(): void {
        this.spinnerService.showSpinner();
        this.headerService.updateHeader("");

        forkJoin(
            this.http.get(`../../assets/configurations/dashboard.json`),
        ).subscribe(([dashboardConfig]) => {
            this.spinnerService.hideSpinner();
            this.dashboardConfig = dashboardConfig;
            console.log( this.dashboardConfig);
            
        }, err => {
            this.spinnerService.hideSpinner();
            this._snackBar.open(err.message, "failed", {
                horizontalPosition: "start",
                verticalPosition: "bottom",
                duration: 3000
            });
        });
    }
}