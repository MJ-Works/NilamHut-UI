import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';

const routes: Routes = [
  { path: "location", component: LocationComponent },
  { path: "category", component: CategoryComponent },
  { path: "tag", component: TagComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
