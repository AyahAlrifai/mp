import { ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent, IRowNode } from '@ag-grid-community/core';
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
  @Input() public gridConfigActions: any= {};
  @Input() public rowsPerPage: number = 0;
  @Input() public resultSize: number = 0;
  @Input() public noRowsTemplate = "";
  @Input() public selectedData: any[] = [];

  @Output() public pageChange = new EventEmitter<any>();;
  @Output() public selectedRowData = new EventEmitter<any>();;
  @Output() public onSaveColDef = new EventEmitter<any>();
  @Output() public onResetColDef = new EventEmitter<any>();

  public noRowsTemplateValue = "";
  public groupDefaultExpanded : number=-1;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'never';
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
    autoHeaderHeight: true,
    autoHeight: true,
    unSortIcon: true,
  }

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.noRowsTemplateValue = `<div style='display: flex;flex-direction: column;align-items: center;'><img style="display:block" src='../../assets/img/no_data_found.svg'><h3 style="color:#000000;">${this.noRowsTemplate}</h3></div>`;
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;    
  }

  public onPageSizeChanged(event: any): void {
    this.selectedRowData.emit(this.selectedData);
    this.pageChange.emit(event);
  }

  public setSelectedRowData(): void {
    let newSelectedRows = this.gridApi.getSelectedRows();
    if (this.selectedData.length != 0) {
      this.selectedData = [this.selectedData, ...newSelectedRows];
    } else {
      this.selectedData = [...newSelectedRows];
    }
  }

  public onDownloadCSV(event: any): void {
    this.gridApi.exportDataAsCsv();
  }

  public onDownloadExcel(event : any) : void {
    this.gridApi.exportDataAsExcel({
      sheetName:"sheet1",
      author:"Ayah Alrefai"
    });
  }

  public onColDefChange(event : any) :void {
    this.columnDefs = [...event];    
  }

  public resetColDef(columnDefs : any) : void {
    this.onResetColDef.emit(columnDefs);
  }

  public saveColDef(columnDefs : any) : void {
    this.onSaveColDef.emit(columnDefs)
  }

  // onRowSelected(event: any) {
  //   console.log("/*******************************************/");
  //   console.log(event);
  //   console.log(event.node.selected);
  //   console.log(event.rowIndex);
  // }

  // onSelectionChanged(event: any) {
  //   console.log("/*******************************************/");
  //   console.log(event); // verify that the method is fired upon selection
  //   // do the rest
  // }
}
