import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../spinner/spinner.service';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public spinnerService: SpinnerService) {

  }

  ngOnInit(): void {

  }

}
