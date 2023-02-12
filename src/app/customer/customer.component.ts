import { CheckboxSelectionCallbackParams, ColDef, HeaderCheckboxSelectionCallbackParams } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { SearchFields } from '../search/search-fields';
import { SearchDataModle } from '../search/search.data.model';
import { SpinnerService } from '../spinner/spinner.service';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public columnDefs: ColDef[] = [];
  public rowsPerPage: number = 10;
  private categoryList: any = [];
  private cycleList: any = [];
  private pricebookList: any = [];
  public searchFields: any;
  private filePath: string = "customer-search-fields";
  private accountStatusList: any = [
    { key: "ACTIVE", value: "Active" },
    { key: "INACTIVE", value: "Inactive" },
    { key: "SUSPENDED", value: "Suspended" },
  ];
  public searchForm: FormGroup = new FormGroup({});
  public data: any = [];
  private configFilePath: string = "customer-grid-configuration";

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public customerService: CustomerService, public spinnerService: SpinnerService) {

  }

  ngOnInit() {
    this.loadRequiredData();
    this.loadGridConfig();
  }

  private loadGridConfig() {
    this.http.get(`../../assets/configurations/${this.configFilePath}.json`)
      .subscribe((data:any) => {
        this.rowsPerPage = data.rowsPerPage;
        this.columnDefs = data.colDefs as ColDef[];
        this.columnDefs[0].checkboxSelection = checkboxSelection;
        this.columnDefs[0].headerCheckboxSelection = headerCheckboxSelection;
      }, err => {
        this._snackBar.open(err.message, "failed", {
          horizontalPosition: "start",
          verticalPosition: "bottom",
        });
      });
  }

  private loadRequiredData() {
    this.spinnerService.showSpinner();
    forkJoin(
      this.customerService.getCycles(),
      this.customerService.getPricebook(),
      this.customerService.getCategories(),
      this.http.get(`../../assets/configurations/${this.filePath}.json`)
    ).subscribe(([cycles, plans, categories, searchFields]) => {
      this.spinnerService.hideSpinner();

      plans.returnValue.data.forEach((element: { planName: any; planCode: any; }) => {
        this.pricebookList.push({ key: element.planCode, value: element.planName });
      });
      cycles.returnValue.data.forEach((element: { cycleName: any; cycleCode: any; }) => {
        this.cycleList.push({ value: element.cycleName, key: element.cycleCode });
      });
      categories.returnValue.data.forEach((element: { categoryName: any; categoryCode: any; }) => {
        this.categoryList.push({ key: element.categoryCode, value: element.categoryName });
      });

      this.searchFields = searchFields;
      this.updateSearchFields();
    }, err => {
      this.spinnerService.hideSpinner();
      this._snackBar.open(err.message, "failed", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
      });
    });
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
    let searchDataModel: Array<SearchDataModle> = [];

    this.searchFields.forEach((field: { formControlName: any; operator: any; }) => {
      if (field.formControlName == "createdDate") {
        let start = this.searchForm.controls["start"].value;
        let end = this.searchForm.controls["end"].value;
        if (start && end) {
          searchDataModel.push({
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
          searchDataModel.push({
            "searchField": field.formControlName,
            "searchValues": fieldValue,
            "operator": field.operator,
            "condition": "and",
            "fromExternal": true
          });
        }
      }
    });

    let body = {
      "resourceId": 1,
      "loadData": true,
      "start": 0,
      "length": "50",
      "searchDataModel": searchDataModel,
      "sortDataModel": [{
        "sortField": "accountNumber",
        "direction": "ordrd"
      }],
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
      });
    })
  }

  private getFormattedDate(date: Date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

}


const checkboxSelection = (params: CheckboxSelectionCallbackParams) => {
  return params.columnApi.getRowGroupColumns().length === 0;
};

const headerCheckboxSelection = (params: HeaderCheckboxSelectionCallbackParams) => {
  return params.columnApi.getRowGroupColumns().length === 0;
};