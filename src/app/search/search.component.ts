import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms'
import { SearchFields } from './search-fields';
import { SpinnerService } from '../spinner/spinner.service';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'search-view',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() searchFields: Array<SearchFields> = [];
  @Input() searchForm = new FormGroup({});
  @Output() onSearch = new EventEmitter();

  public expanded = true;

  public panelOpenState = false;

  constructor(public customerService: CustomerService, public router: Router, public spinnerService: SpinnerService) {
  }

  ngOnInit() {
  }

  public setExpanded(value: boolean) : void  {
    this.expanded = !value;
  }

  public search() {
    this.setExpanded(false);
    this.onSearch.emit(this.searchForm);
  }

}
