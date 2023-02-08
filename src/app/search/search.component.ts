import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'
import * as SearchFieldsValue from '../../assets/configurations/customer-search-fields.json';
import { SearchFields } from './search-fields';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'search-view',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public panelOpenState = false;
  public searchFields: Array<SearchFields> = [];

  public searchForm = new FormGroup({
    accountNumber: new FormControl(''),
    companyName: new FormControl(''),
    contactPerson: new FormControl(''),
    parentCompany: new FormControl(''),
    phoneNumber: new FormControl(''),
    cycleName: new FormControl(''),
    priceBook: new FormControl(''),
    categoryName: new FormControl(''),
    externalId: new FormControl(''),
    emailAddress: new FormControl(''),
  });

  constructor(public router: Router, public spinnerService : SpinnerService) {
  }

  ngOnInit() {
    this.searchFields = (SearchFieldsValue as any).default;

  }

  public search():void {
    console.log(this.searchForm.value);
    this.spinnerService.showSpinner();

    setTimeout(() => {
      this.spinnerService.hideSpinner();
    }, 3000);
  }
}
