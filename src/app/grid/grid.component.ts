import { CheckboxSelectionCallbackParams, ColDef, GridReadyEvent, HeaderCheckboxSelectionCallbackParams } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() public data: any = [];
  //@Input() 
  public columnDefs: ColDef[] = [];
  public rowSelection: 'single' | 'multiple' = 'single';
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';
  public autoGroupColumnDef: ColDef = {
    headerName: 'Account Number',
    minWidth: 170,
    field: 'accountNumber',
    valueGetter: (params) => {
      if (params.node!.group) {
        return params.node!.key;
      } else {
        return params.data[params.colDef.field!];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };

  public defaultColDef: ColDef = {
    editable: false,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 150,
  };
  private filePath: string = "customer-grid-configuration";

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.http.get(`../../assets/configurations/${this.filePath}.json`)
      .subscribe((data) => {
        this.columnDefs = data as ColDef[];
        this.columnDefs[0].checkboxSelection = checkboxSelection;
        this.columnDefs[0].headerCheckboxSelection = headerCheckboxSelection;
      }, err => {
        this._snackBar.open(err.message, "failed", {
          horizontalPosition: "start",
          verticalPosition: "bottom",
        });
      });
  }

  onGridReady(params: GridReadyEvent<any>) {

  }

}

var checkboxSelection = function (params: CheckboxSelectionCallbackParams) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (
  params: HeaderCheckboxSelectionCallbackParams
) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};