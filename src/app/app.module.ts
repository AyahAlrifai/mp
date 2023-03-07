import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgGridModule } from '@ag-grid-community/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { CustomerComponent } from './customer/customer.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer/customer.service';
import { GridActionComponent } from './grid/gridActions/gridAction.component';
import { GridComponent } from './grid/grid.component';
import { ModuleRegistry } from '@ag-grid-community/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SettingsProgressDialog } from './settingProgress/settingsProgress.dialog';
import { AccountNumberCell } from './customer/AccountNumberCell/accountNumberCell.component';
import { TerminateCustomerDialog } from './customer/terminateCustomer/terminateCustomer.dialog';
import { BroadcastEmailDialog } from './customer/broadcastEmail/broadcastEmail.dialog';
import { QuillModule } from 'ngx-quill'
import { QuickMenuItemComponent } from './quickMenu/quickMenu.component';
import { BasicDialog } from './basicDialog/basic.dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './grid/CustomPaginatorConfiguration';
import { GridConfigurationActionComponent } from './grid/gridConfigAction/gridConfigurationAction.component';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

ModuleRegistry.registerModules([ExcelExportModule, CsvExportModule, RowGroupingModule, ClientSideRowModelModule]);

@NgModule({
  declarations: [
    AppComponent,
    MenuItemComponent,
    QuickMenuItemComponent,
    HeaderComponent,
    CustomerComponent,
    SearchComponent,
    SpinnerComponent,
    GridActionComponent,
    GridComponent,
    SettingsProgressDialog,
    TerminateCustomerDialog,
    BasicDialog,
    AccountNumberCell,
    BroadcastEmailDialog,
    GridConfigurationActionComponent
  ],
  imports: [
    QuillModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AppService, SpinnerService, CustomerService, { provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
