import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './/admin-routing.module';
import { LocationComponent } from './location/location.component';
import { CategoryComponent } from './category/category.component';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './tag/tag.component';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShowReportsComponent } from './show-reports/show-reports.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    ToastrModule.forRoot()
  ],
  declarations: [LocationComponent, CategoryComponent, TagComponent, ShowReportsComponent]
})
export class AdminModule { }
