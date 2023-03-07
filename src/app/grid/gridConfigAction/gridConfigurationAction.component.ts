import { ColDef } from '@ag-grid-community/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'grid-config-action',
  templateUrl: './gridConfigurationAction.component.html',
  styleUrls: ['./gridConfigurationAction.component.scss']
})
export class GridConfigurationActionComponent implements OnInit {
  @Input() public gridConfigActions: { "column": Array<any> } = { "column": [] };
  @Input() public columnDefs: ColDef[] = [];
  @Output() public downloadCSV = new EventEmitter<any>();;
  @Output() public downloadExcel = new EventEmitter<any>();;
  @Output() public onColDefChange = new EventEmitter<any>();;

  ngOnInit(): void {
  }

  public onDownloadExcel(): void {
    this.downloadExcel.emit();
  }

  public onDownloadCSV(): void {
    this.downloadCSV.emit();
  }

  public toggleColumn(event: any, key: string | undefined): void {
    if (key) {
      for (let i = 0; i < this.columnDefs.length; i++) {
        if (this.columnDefs[i].field == key) {
          this.columnDefs[i].hide = !this.columnDefs[i].hide;
          this.onColDefChange.emit(this.columnDefs);
        }
      }
    }
    event.stopPropagation();

  }

  public setGroupBY(key: string | undefined): void {
    if (key) {
      for (let i = 0; i < this.columnDefs.length; i++) {
        if (this.columnDefs[i].field == key) {
          this.columnDefs[i].enableRowGroup = !this.columnDefs[i].enableRowGroup;
          this.columnDefs[i].rowGroup = !this.columnDefs[i].rowGroup;
        } else {
          this.columnDefs[i].enableRowGroup = false;
          this.columnDefs[i].rowGroup = false;
        }
      }
      this.onColDefChange.emit(this.columnDefs);
    }
  }
}