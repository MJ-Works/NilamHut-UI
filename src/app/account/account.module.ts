import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AccountRoutingModule } from './/account-routing.module';


import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { AccountService } from './services/account.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { BarRatingModule } from "ngx-bar-rating";
import { ReportComponent } from './report/report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    BarRatingModule
  ],
  providers : [AccountService],
  declarations: [SigninComponent, SignupComponent, ProfileEditComponent, ProfileViewComponent, ReportComponent]
})
export class AccountModule { }
