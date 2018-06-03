import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';


import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { CountdownTimerModule } from 'ngx-countdown-timer';
import { BidDialogComponent } from './bid-dialog/bid-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { FooterComponent } from './footer/footer.component';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { RoleGuardService } from './shared/services/role-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BidDialogComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AccountModule,
    ProductModule,
    AdminModule,
    MatInputModule,
    CountdownTimerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    NgSelectModule,
    MatProgressBarModule
    
  ],
  providers: [AuthService,AuthGuardService,RoleGuardService],
  bootstrap: [AppComponent],
  entryComponents:[BidDialogComponent]
})
export class AppModule { }
