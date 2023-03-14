import { ColDef, HeaderCheckboxSelectionCallbackParams } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { AccountNumberCell } from './AccountNumberCell/accountNumberCell.component';
import { SearchFields } from '../search/search-fields';
import { SearchDataModle } from '../search/search.data.model';
import { SpinnerService } from '../spinner/spinner.service';
import { CustomerService } from './customer.service';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public data: any = [];
  public customerQuickActions: any = [];
  public addIconActions: any = {};
  public columnDefs: ColDef[] = [];
  public noRowsTemplate = "No Customers Found";
  public currentDensity: string = "Compact";
  public rowsPerPage: number = 100; // get it from server side
  public resultSize: number = 0; // get it from server side
  public currentPage: number = 0;
  private categoryList: any = [];
  private cycleList: any = [];
  private pricebookList: any = [];
  public searchFields: any;
  public selectedRowData: any[] = [];
  private accountStatusList: any = [
    { key: "ACTIVE", value: "Active" },
    { key: "INACTIVE", value: "Inactive" },
    { key: "SUSPENDED", value: "Suspended" },
  ];
  public searchForm: FormGroup = new FormGroup({});
  private searchDataModel: Array<SearchDataModle> = [];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public customerService: CustomerService, public spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.loadRequiredData();
  }

  private loadRequiredData(): void {
    this.spinnerService.showSpinner();
    forkJoin(
      this.http.get(`../../assets/customer.json`),
      this.http.get(`../../assets/cycle.json`),
      this.http.get(`../../assets/price_book.json`),
      this.http.get(`../../assets/category.json`),
      this.http.get(`../../assets/configurations/default-customer-column-def.json`),
      this.http.get(`../../assets/configurations/customer-column-def.json`),
      this.http.get(`../../assets/configurations/customer-search-fields.json`),
      this.http.get(`../../assets/configurations/customer-quick-options.json`),
      this.http.get(`../../assets/configurations/customer-grid-configuration-action.json`)
    ).subscribe(([customer, cycles, plans, categories, defaultColDef, colDef, searchFields, customerQuickActions, addIconActions]) => {
      this.spinnerService.hideSpinner();

      this.data = customer;
      this.resultSize = customer.size;
      this.data.forEach((element: any) => {
        element.pk = element.accountNumber;
      });

      plans.forEach((element: { planName: any; planCode: any; }) => {
        this.pricebookList.push({ key: element.planCode, value: element.planName });
      });
      cycles.forEach((element: { cycleName: any; cycleCode: any; }) => {
        this.cycleList.push({ value: element.cycleName, key: element.cycleCode });
      });
      categories.forEach((element: { categoryName: any; categoryCode: any; }) => {
        this.categoryList.push({ key: element.categoryCode, value: element.categoryName });
      });

      if (!colDef) {
        this.columnDefs = defaultColDef as ColDef[];
      } else {
        this.columnDefs = colDef as ColDef[];
      }
      this.searchFields = searchFields;
      this.customerQuickActions = customerQuickActions;
      this.addIconActions = addIconActions;

      this.editColDef();
      this.updateSearchFields();
      // this.search();
    }, err => {
      this.spinnerService.hideSpinner();
      this._snackBar.open(err.message, "failed", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
        duration: 3000
      });
    });
  }

  private editColDef(): void {
    for (let i = 0; i < this.columnDefs.length; i++) {
      switch (this.columnDefs[i].field) {
        case "pk":
          this.columnDefs[i].headerCheckboxSelection = (params: HeaderCheckboxSelectionCallbackParams) => {
            return params.columnApi.getRowGroupColumns().length === 0;
          }
          break;
        case "accountNumber":
          this.columnDefs[i].cellRenderer = AccountNumberCell
          this.columnDefs[i].cellRendererParams = {
            "data": this.data,
            "customerQuickActions": this.customerQuickActions
          }
          break;
        case "billable":
          this.columnDefs[i].cellRenderer = (params: { value: string; }) => {
            return params.value == 'Y' ? "Billable" : "Unbillable";
          }
          break;
      }
    }
  }

  private updateSearchFields(): void {
    this.searchFields.forEach((element: SearchFields) => {
      if (element.formControlName === "categoryCode") {
        element.list = this.categoryList;
      } else if (element.formControlName === "planCode") {
        element.list = this.pricebookList;
      } else if (element.formControlName === "cycleCode") {
        element.list = this.cycleList;
      } else if (element.formControlName === "accountStatus") {
        element.list = this.accountStatusList;
      }
    });
    this.initSearchForm();
  }

  private initSearchForm(): void {
    let formFields: any = {};
    this.searchFields.forEach((field: { formControlName: string | number; }) => {
      if (field.formControlName == "createdDate") {
        formFields["start"] = new FormControl();
        formFields["end"] = new FormControl();
      } else {
        formFields[field.formControlName] = new FormControl();
      }
    });
    this.searchForm = new FormGroup(formFields);
  }

  public search(): void {
    //   this.searchDataModel = [];
    //   this.searchFields.forEach((field: { formControlName: any; operator: any; }) => {
    //     if (field.formControlName == "createdDate") {
    //       let start = this.searchForm.controls["start"].value;
    //       let end = this.searchForm.controls["end"].value;
    //       if (start && end) {
    //         this.searchDataModel.push({
    //           "searchField": field.formControlName,
    //           "searchValues": [this.getFormattedDate(start), this.getFormattedDate(end)],
    //           "operator": field.operator,
    //           "condition": "and",
    //           "fromExternal": true
    //         });
    //       }
    //     } else {
    //       let fieldValue = this.searchForm.controls[field.formControlName].value;
    //       if (fieldValue) {
    //         this.searchDataModel.push({
    //           "searchField": field.formControlName,
    //           "searchValues": fieldValue,
    //           "operator": field.operator,
    //           "condition": "and",
    //           "fromExternal": true
    //         });
    //       }
    //     }
    //   });

    //   this.sendSearchRequest();
  }

  private sendSearchRequest(): void {
    //   let body = {
    //     "resourceId": 1,
    //     "loadData": true,
    //     "start": this.currentPage * 100,
    //     "length": this.rowsPerPage,
    //     "searchDataModel": this.searchDataModel,
    //     "sortDataModel": [{
    //       "sortField": "accountNumber",
    //       "direction": "ordrd"
    //     }],
    //     "dataHints": null,
    //     "sizeHints": null
    //   };

    //   this.spinnerService.showSpinner();
    //   this.customerService.search(body).subscribe(data => {
    //     if (data.executionSuccessful) {
    //       this.data = data.returnValue.data;
    //       console.log(this.data);
    //       this.resultSize = data.returnValue.size;
    //       this.data.forEach((element: any) => {
    //         element.pk = element.accountNumber;
    //       });
    //       this.spinnerService.hideSpinner();
    //     } else {
    //       this.spinnerService.hideSpinner();
    //       this._snackBar.open(data.errorCode, "failed", {
    //         horizontalPosition: "start",
    //         verticalPosition: "bottom",
    //         duration: 3000
    //       });
    //     }
    //   }, err => {
    //     this.spinnerService.hideSpinner();
    //     this._snackBar.open(err.message, "failed", {
    //       horizontalPosition: "start",
    //       verticalPosition: "bottom",
    //       duration: 3000
    //     });
    //   });
  }

  private getFormattedDate(date: Date): string {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  public onPageChange(event: any): void {
    this.rowsPerPage = event.pageSize;
    this.currentPage = event.pageIndex;
    this.sendSearchRequest();
  }

  public setSelectedRowData(selectedRowData: any): void {
    if (this.selectedRowData.length != 0) {
      this.selectedRowData = [...this.selectedRowData, ...selectedRowData];
    } else {
      this.selectedRowData = [...selectedRowData];
    }
    console.log(this.selectedRowData);

  }

  public resetColDef(colDef: any): void {
    // send api request
    this.spinnerService.showSpinner();
    forkJoin(
      this.http.get(`../../assets/configurations/default-customer-column-def.json`)
    ).subscribe(([colDef]) => {
      this.spinnerService.hideSpinner();
      this.columnDefs = colDef as ColDef[];
      this.editColDef();
    }, err => {
      this.spinnerService.hideSpinner();
      this._snackBar.open(err.message, "failed", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
        duration: 3000
      });
    });
  }

  public saveColDef(colDef: any): void {
    // send api request
    this._snackBar.open("should send api request to save new column def for this partner", "success", {
      horizontalPosition: "start",
      verticalPosition: "bottom",
      duration: 3000
    });
  }
}
