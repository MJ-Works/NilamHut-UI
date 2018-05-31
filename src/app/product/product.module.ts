import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './/product-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductService } from './services/product.service';


@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    NgSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    DlDateTimePickerDateModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    CountdownTimerModule,
    MatDialogModule
  ],
  providers : [ProductService],
  declarations: [ViewProductComponent, AddProductComponent]
})
export class ProductModule { }
