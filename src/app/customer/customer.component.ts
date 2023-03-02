import { CheckboxSelectionCallbackParams, ColDef, HeaderCheckboxSelectionCallbackParams } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { AccountNumberCell } from './AccountNumberCell/accountNumberCell.component';
import { SearchFields } from '../search/search-fields';
import { SearchDataModle } from '../search/search.data.model';
import { SpinnerService } from '../spinner/spinner.service';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public data: any = [];
  public customerQuickActions: any = [];
  public columnDefs: ColDef[] = [];
  public noRowsTemplate = "No Customers Found";
  public rowsPerPage: number = 100; // get it from server side
  public resultSize: number = 16337; // get it from server side
  public currentPage: number = 0;
  private categoryList: any = [];
  private cycleList: any = [];
  private pricebookList: any = [];
  public searchFields: any;
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

  private loadRequiredData() {
    this.spinnerService.showSpinner();
    forkJoin(
      // this.customerService.getCycles(),
      // this.customerService.getPricebook(),
      // this.customerService.getCategories(),
      this.http.get(`../../assets/configurations/customer-search-fields.json`),
      this.http.get(`../../assets/configurations/customer-quick-options.json`)
    ).subscribe(([/*cycles, plans, categories, */searchFields, customerQuickActions]) => {
      this.spinnerService.hideSpinner();
      // plans.returnValue.data.forEach((element: { planName: any; planCode: any; }) => {
      //   this.pricebookList.push({ key: element.planCode, value: element.planName });
      // });
      // cycles.returnValue.data.forEach((element: { cycleName: any; cycleCode: any; }) => {
      //   this.cycleList.push({ value: element.cycleName, key: element.cycleCode });
      // });
      // categories.returnValue.data.forEach((element: { categoryName: any; categoryCode: any; }) => {
      //   this.categoryList.push({ key: element.categoryCode, value: element.categoryName });
      // });
      this.searchFields = searchFields;
      this.customerQuickActions = customerQuickActions;
      console.log(this.customerQuickActions);
      this.updateSearchFields();
      this.initColDef();
      this.search();
    }, err => {
      this.spinnerService.hideSpinner();
      this._snackBar.open(err.message, "failed", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
        duration: 3000
      });
    });
  }
  initColDef() {
    this.columnDefs = [
      {
        headerName: "Account Number",
        field: "accountNumber",
        headerCheckboxSelection: (params: HeaderCheckboxSelectionCallbackParams) => {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        checkboxSelection: true,
        cellRenderer: AccountNumberCell,
        cellRendererParams: {
          "data": this.data,
          "customerQuickActions": this.customerQuickActions
        },
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 400,
        maxWidth: 500,
        pinned: 'left'
      },
      {
        headerName: "Company Name",
        field: "companyName",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 350,
        maxWidth: 500,
      },
      {
        headerName: "Contact Person",
        field: "contact",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 350,
        maxWidth: 500,
      },
      {
        headerName: "Parent Company",
        field: "parentCompany",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 200,
        maxWidth: 300,
      },
      {
        headerName: "Phone Number",
        field: "phoneNumber",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        headerName: "Category Name",
        field: "categoryName",
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 175,
        maxWidth: 300,
        rowGroup: true, // for row grouping
        hide: true,
        enableRowGroup: true,
      },
      {
        headerName: "Cycle Name",
        field: "cycleName",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 300,
      },
      {
        headerName: "Price Book",
        field: "planName",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 500,
      },
      {
        headerName: "External Id",
        field: "externalAccountId",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 200,
      },
      {
        headerName: "Created Date",
        field: "createdDate",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 175,
        maxWidth: 300,
      },
      {
        headerName: "Account Status",
        field: "accountStatus",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 175,
        maxWidth: 300,
      },
      {
        headerName: "Billable",
        field: "billable",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 300,
      },
      {
        headerName: "Account Details777",
        field: "accountDetailDescription01",
        enableRowGroup: false,
        editable: false,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 150,
        maxWidth: 300,
      }
    ];
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
    this.searchDataModel = [];

    this.searchFields.forEach((field: { formControlName: any; operator: any; }) => {
      if (field.formControlName == "createdDate") {
        let start = this.searchForm.controls["start"].value;
        let end = this.searchForm.controls["end"].value;
        if (start && end) {
          this.searchDataModel.push({
            "searchField": field.formControlName,
            "searchValues": [this.getFormattedDate(start), this.getFormattedDate(end)],
            "operator": field.operator,
            "condition": "and",
            "fromExternal": true
          });
        }
      } else {
        let fieldValue = this.searchForm.controls[field.formControlName].value;
        if (fieldValue) {
          this.searchDataModel.push({
            "searchField": field.formControlName,
            "searchValues": fieldValue,
            "operator": field.operator,
            "condition": "and",
            "fromExternal": true
          });
        }
      }
    });

    this.sendSearchRequest();
  }

  private sendSearchRequest() {
    let body = {
      "resourceId": 1,
      "loadData": true,
      "start": this.currentPage * 100,
      "length": this.rowsPerPage,
      "searchDataModel": this.searchDataModel,
      // "sortDataModel": [{
      //   "sortField": "accountNumber",
      //   "direction": "ordrd"
      // }],
      "dataHints": null,
      "sizeHints": null
    };

    this.spinnerService.showSpinner();
    this.customerService.search(body).subscribe(data => {
      this.data = data.returnValue.data;
      this.spinnerService.hideSpinner();
    }, err => {
      this.spinnerService.hideSpinner();
      this._snackBar.open(err.message, "failed", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
        duration: 3000
      });
    });

    this.data.forEach((v: any) => {
      v.billable = v.billable == 'Y' ? "Billable" : "Unbillable";
    });
  }

  private getFormattedDate(date: Date) {
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

}
