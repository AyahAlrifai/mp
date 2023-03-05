import { ColDef, GridApi, GridReadyEvent } from '@ag-grid-community/core';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  @Input() public rowsPerPage: number = 0;
  @Input() public resultSize: number = 0;
  @Input() public noRowsTemplate = "";

  @Output() public pageChange = new EventEmitter<any>();;

  public noRowsTemplateValue = "";

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';

  public defaultColDef: ColDef = {
    enableRowGroup: false,
    editable: false,
    enablePivot: false,
    enableValue: false,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 250,
    maxWidth: 500,
    autoHeaderHeight:true,
    autoHeight:true,
    unSortIcon:true
  }

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.noRowsTemplateValue = `<div style='display: flex;flex-direction: column;align-items: center;'><img style="display:block" src='../../assets/img/no_data_found.svg'><h3 style="color:#000000;">${this.noRowsTemplate}</h3></div>`;
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  onPageSizeChanged(event:any) {
    this.pageChange.emit(event);
  }

}
