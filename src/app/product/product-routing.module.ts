import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';

const routes: Routes =[
  { path:'product/id', component: ViewProductComponent},
  { path:'product', component: AddProductComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ProductRoutingModule { }
