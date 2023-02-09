import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() searchFields: Array<SearchFields> = [];
  @Input() searchForm = new FormGroup({});
  @Output() onSearch = new EventEmitter();

  public panelOpenState = false;

  constructor(public customerService: CustomerService, public router: Router, public spinnerService: SpinnerService) {
  }

  ngOnInit() {
  }

  public search() {
    this.onSearch.emit(this.searchForm);
  }

}
