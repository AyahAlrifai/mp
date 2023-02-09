import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'
import { SearchFields } from './search-fields';
import { SpinnerService } from '../spinner/spinner.service';
import { CustomerService } from '../customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchDataModle } from './search.data.model';

@Component({
  selector: 'search-view',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() filePath = "";
  public panelOpenState = false;
  public searchFields: Array<SearchFields> = [];
  public categoryNameSelection = {
    showCheckbox: true,
    showSelectAll: true
  }
  public categoryList:Array<string> =[];

  public searchForm = new FormGroup({});

  constructor(public customerService: CustomerService, public router: Router, public spinnerService: SpinnerService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadSearchFields();
    this.loadCategories();
  }

  private loadCategories() {
    this.spinnerService.showSpinner();
    this.customerService.getCategories().subscribe(data => {
      this.spinnerService.hideSpinner();
      data.returnValue.data.forEach((element: { categoryName: any; categoryCode: any; }) => {
        this.categoryList.push(element.categoryName);
      });
    }, err => {
      this.spinnerService.hideSpinner();
      this._snackBar.open(err.message, "failed", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
      });
    });
  }

  private loadSearchFields() : void {
    this.searchFields = require(`../../assets/configurations/${this.filePath}.json`);
    this.initForm();
  }

  private initForm()  : void {
    let formFields : any = {};

    this.searchFields.forEach(field => {
        formFields[field.formControlName] = new FormControl();
    });
    this.searchForm = new FormGroup(formFields);    
  }

  public search(): void {
    let searchDataModel : Array<SearchDataModle> =[{
      "searchField": "agentAccountNumber",
      "searchValues": null,
      "operator": "eq"
    }];

    this.searchFields.forEach(field => {
      let fieldValue = this.searchForm.controls[field.formControlName].value;
      if(fieldValue) {
          searchDataModel.push({
            "searchField": field.formControlName,
            "searchValues": fieldValue,
            "operator": field.operator,
            "condition": "and",
            "fromExternal": true
          });
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
      console.log(data);
      this.spinnerService.hideSpinner();
    }, err => {
      console.log(err);
      this.spinnerService.hideSpinner();
    })
  }
}
