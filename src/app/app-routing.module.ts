import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentProductsComponent } from './mainComponent/agentProducts/agentProducts.component';
import { CustomerComponent } from './mainComponent/customer/customer.component';
import { HomeComponent } from './mainComponent/home/home.component';
import { ProductsComponent } from './mainComponent/products/products.component';
import { PricingComponent } from './mainComponent/services copy/pricing.component';
import { ServicesComponent } from './mainComponent/services/services.component';

const routes: Routes = [
  { path: "mp_u_v_customers", component: CustomerComponent },
  { path: "mp_u_services", component: ServicesComponent },
  { path: "mp_u_product", component: ProductsComponent },
  { path: "mp_u_catalog_products", component: AgentProductsComponent },
  { path: "mp_u_pricing", component: PricingComponent },
  { path: "", component: HomeComponent },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
