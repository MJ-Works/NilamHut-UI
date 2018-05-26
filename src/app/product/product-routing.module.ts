import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes =[
  {path:'product/id',component: ViewProductComponent},
  {path:'product',component: AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ProductRoutingModule { }
