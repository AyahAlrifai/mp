import { ColDef, HeaderCheckboxSelectionCallbackParams } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { HeaderService } from 'src/app/header/header.service';
import { SpinnerService } from '../../sharedComponent/spinner/spinner.service';
import { ProductNameCell } from '../products/ProductNameCell/productNameCell.component';
import { AgentProductsService } from './agentProducts.service';

@Component({
  selector: 'agent-products',
  templateUrl: './agentProducts.component.html',
  styleUrls: ['./agentProducts.component.scss']
})
export class AgentProductsComponent implements OnInit, OnDestroy {
  public data: any = [];
  public columnDefs: ColDef[] = [];
  public noRowsTemplate = "No Product Found";
  public currentDensity: string = "Compact";
  public addIconActions: any = {};
  public rowsPerPage: number = 100; // get it from server side
  public resultSize: number = 0; // get it from server side
  public currentPage: number = 0;
  public selectedRowData: any[] = [];

  constructor(private http: HttpClient, private headerService: HeaderService, private _snackBar: MatSnackBar, public agentProductsService: AgentProductsService, public spinnerService: SpinnerService) {
  }

  ngOnDestroy(): void {
    this.spinnerService.hideSpinner();
  }

  ngOnInit() {
    this.loadRequiredData();
  }

  private loadRequiredData(): void {
    this.spinnerService.showSpinner();
    this.headerService.updateHeader("<p>products</p>");
    forkJoin(
      this.http.get(`../../assets/configurations/default-agent-products-column-def.json`),
      this.http.get(`../../assets/configurations/agent-products-column-def.json`),
      this.http.get(`../../assets/configurations/agent-products-grid-configuration-action.json`)
    ).subscribe(([defaultColDef, colDef, addIconActions]) => {
      this.spinnerService.hideSpinner();

      if (!colDef) {
        this.columnDefs = defaultColDef as ColDef[];
      } else {
        this.columnDefs = colDef as ColDef[];
      }
      this.addIconActions = addIconActions;

      this.editColDef();
      this.sendSearchRequest();
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
        case "productName":
          this.columnDefs[i].cellRenderer = ProductNameCell
          this.columnDefs[i].cellRendererParams = {
            "data": this.data
          }
          break;
      }
    }
  }

  private sendSearchRequest(): void {
    let body = {
      "loadData": true,
      "start": this.currentPage * this.rowsPerPage,
      "length": this.rowsPerPage,
      "searchDataModel": [
        {
          "searchField": "productCategoryCode",
          "searchValues": "BUNDLE",
          "operator": "neq"
        },
        {
          "searchField": "productCategoryCode",
          "searchValues": "DISCOUNT",
          "operator": "neq"
        }
      ],
      "sortDataModel": [],
      "dataHints": null,
      "sizeHints": null
    };

    this.spinnerService.showSpinner();
    this.agentProductsService.search(body).subscribe(data => {
      if (data.executionSuccessful) {
        this.data = data.returnValue.data;
        this.resultSize = data.returnValue.size;
        this.data.forEach((element: any) => {
          element.pk = element.accountNumber;
        });
        this.spinnerService.hideSpinner();
      } else {
        this.spinnerService.hideSpinner();
        this._snackBar.open(data.errorCode, "failed", {
          horizontalPosition: "start",
          verticalPosition: "bottom",
          duration: 3000
        });
      }
    }, err => {
      this.spinnerService.hideSpinner();
      this._snackBar.open(err.message, "failed", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
        duration: 3000
      });
    });
  }

  public onPageChange(event: any): void {
    console.log(this.selectedRowData);
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
  }

  public resetColDef(colDef: any): void {
    // send api request
    this.spinnerService.showSpinner();
    forkJoin(
      this.http.get(`../../assets/configurations/default-agent-products-column-def.json`)
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