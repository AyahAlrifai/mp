import { CheckboxSelectionCallbackParams, ColDef, GridApi, GridReadyEvent, HeaderCheckboxSelectionCallbackParams } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  private gridApi!: GridApi<any>;
  @Input() public data: any = [];
  @Input() public columnDefs: ColDef[] = [];
  @Input() public rowsPerPage:number=10;
  @Input() public noRowsTemplate="";
  public noRowsTemplateValue="";

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';
  
  public autoGroupColumnDef: ColDef = {
    minWidth: 170,    
    maxWidth: 400,
    headerValueGetter: params => {
      console.log(params);
      return `${params.colDef.headerName}`;
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
      suppressCount: true,
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
    maxWidth: 400,
  };

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.noRowsTemplateValue = `<div style='display: flex;flex-direction: column;align-items: center;'><img style="display:block" src='../../assets/img/no_data_found.svg'><h2 style="color:#000000;">${this.noRowsTemplate}</h2></div>`;
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
