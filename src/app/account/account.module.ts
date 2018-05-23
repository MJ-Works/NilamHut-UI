import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AccountRoutingModule } from './/account-routing.module';


import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [SigninComponent, SignupComponent]
})
export class AccountModule { }
