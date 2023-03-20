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
  @Input() public addIconActions: any[] = [];
  @Input() public currentDensity: string = "Compact";
  @Output() public downloadCSV = new EventEmitter<any>();
  @Output() public downloadExcel = new EventEmitter<any>();
  @Output() public onColDefChange = new EventEmitter<any>();
  @Output() public onSaveColDef = new EventEmitter<any>();
  @Output() public onResetColDef = new EventEmitter<any>();
  @Output() public onSetDensity = new EventEmitter<any>();

  ngOnInit(): void {
    console.log(this.addIconActions);
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

  public setGroupBY(event: any, key: string | undefined): void {
    if (key) {
      for (let i = 0; i < this.columnDefs.length; i++) {
        if (this.columnDefs[i].field == key) {
          this.columnDefs[i].rowGroup = !this.columnDefs[i].rowGroup;
        } else {
          this.columnDefs[i].rowGroup = false;
        }
      }
      this.onColDefChange.emit(this.columnDefs);
      event.stopPropagation();
    }
  }

  public pinnedColumn(event: any, key: string | undefined): void {
    if (key) {
      for (let i = 0; i < this.columnDefs.length; i++) {
        if (this.columnDefs[i].field != 'pk') {
          if (this.columnDefs[i].field == key) {
            this.columnDefs[i].pinned = true;
          } else {
            this.columnDefs[i].pinned = false;
          }
        }
      }
      this.onColDefChange.emit(this.columnDefs);
      event.stopPropagation();
    }
  }

  public resetColDef(): void {
    this.onResetColDef.emit(this.columnDefs);
  }

  public saveColDef(): void {
    this.onSaveColDef.emit(this.columnDefs)
  }

  public setDensity(event: any,density : string) {
    this.onSetDensity.emit(density);
    event.stopPropagation();

  }
}