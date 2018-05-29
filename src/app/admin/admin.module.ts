import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './/admin-routing.module';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [LocationComponent, CategoryComponent]
})
export class AdminModule { }
