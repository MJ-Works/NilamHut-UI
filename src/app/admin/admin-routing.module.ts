import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { RoleGuardService as RoleGuard } from '../shared/services/role-guard.service';

const routes: Routes = [
  { path: "location", component: LocationComponent, canActivate : [RoleGuard], data : {expectedRole : "Administrator"} },
  { path: "category", component: CategoryComponent, canActivate : [RoleGuard], data : {expectedRole : "Administrator"} },
  { path: "tag", component: TagComponent, canActivate : [RoleGuard], data : {expectedRole : "Administrator"} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
