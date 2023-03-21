import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgGridModule } from '@ag-grid-community/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { CustomerComponent } from './mainComponent/customer/customer.component';
import { SearchComponent } from './sharedComponent/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './sharedComponent/spinner/spinner.component';
import { SpinnerService } from './sharedComponent/spinner/spinner.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomerService } from './mainComponent/customer/customer.service';
import { GridActionComponent } from './sharedComponent/grid/gridActions/gridAction.component';
import { ModuleRegistry } from '@ag-grid-community/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SettingsProgressDialog } from './sharedComponent/settingProgress/settingsProgress.dialog';
import { AccountNumberCell } from './mainComponent/customer/AccountNumberCell/accountNumberCell.component';
import { TerminateCustomerDialog } from './sharedComponent/terminateCustomer/terminateCustomer.dialog';
import { QuillModule } from 'ngx-quill'
import { BasicDialog } from './sharedComponent/basicDialog/basic.dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './sharedComponent/grid/CustomPaginatorConfiguration';
import { GridConfigurationActionComponent } from './sharedComponent/grid/gridConfigAction/gridConfigurationAction.component';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { HomeComponent } from './mainComponent/home/home.component';
import { ServicesService } from './mainComponent/services/services.service';
import { ServiceNameCell } from './mainComponent/services/ServiceNumberCell/serviceNameCell.component';
import { ServicesComponent } from './mainComponent/services/services.component';
import { ProductsComponent } from './mainComponent/products/products.component';
import { ProductNameCell } from './mainComponent/products/ProductNameCell/productNameCell.component';
import { ProductsService } from './mainComponent/products/products.service';
import { QuickMenuItemComponent } from './sharedComponent/quickMenu/quickMenu.component';
import { GridComponent } from './sharedComponent/grid/grid.component';
import { BroadcastEmailDialog } from './sharedComponent/broadcastEmail/broadcastEmail.dialog';
import { MenuItemComponent } from './sharedComponent/menu/menu.component';
import { HeaderService } from './header/header.service';
import { ManageHttpInterceptor } from './managehttp.interceptor';
import { AgentProductsComponent } from './mainComponent/agentProducts/agentProducts.component';
import { AgentProductsService } from './mainComponent/agentProducts/agentProducts.service';
import { PricingComponent } from './mainComponent/pricing/pricing.component';
import { priceBookNameCell } from './mainComponent/pricing/PriceBookNameCell/priceBookNameCell.component';
import { PricingService } from './mainComponent/pricing/pricing.service';

ModuleRegistry.registerModules([ExcelExportModule, CsvExportModule, RowGroupingModule, ClientSideRowModelModule]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuItemComponent,
    QuickMenuItemComponent,
    HeaderComponent,
    CustomerComponent,
    ServicesComponent,
    ProductsComponent,
    PricingComponent,
    priceBookNameCell,
    AgentProductsComponent,
    SearchComponent,
    SpinnerComponent,
    GridActionComponent,
    GridComponent,
    SettingsProgressDialog,
    TerminateCustomerDialog,
    BasicDialog,
    AccountNumberCell,
    ServiceNameCell,
    ProductNameCell,
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
  providers: [AppService, PricingService, AgentProductsService, HeaderService, SpinnerService, CustomerService, ServicesService, ProductsService,
    //{ provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
