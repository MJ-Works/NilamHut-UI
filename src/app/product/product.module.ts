import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './/product-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  declarations: [ViewProductComponent]
})
export class ProductModule { }
