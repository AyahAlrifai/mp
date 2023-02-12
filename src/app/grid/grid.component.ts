import { CheckboxSelectionCallbackParams, ColDef, GridApi, GridReadyEvent, HeaderCheckboxSelectionCallbackParams } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  private gridApi!: GridApi<any>;
  @Input() public data: any = [];
  @Input() public columnDefs: ColDef[] = [];
  @Input() public rowsPerPage:number=10;
  public rowSelection: 'single' | 'multiple' = 'single';
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';
  public autoGroupColumnDef: ColDef = {
    headerName: 'Account Number',
    minWidth: 170,    
    maxWidth: 200,
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
    minWidth: 170,    
    maxWidth: 250,
  };

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

}
