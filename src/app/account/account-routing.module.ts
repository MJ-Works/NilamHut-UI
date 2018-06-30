import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';
import { ReportComponent } from './report/report.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "profile/edit", component: ProfileEditComponent, canActivate : [AuthGuard]},
  { path: "profile/:id", component: ProfileViewComponent },
  { path: "report", component: ReportComponent, canActivate : [AuthGuard]},
  { path: "payment", component: PaymentComponent, canActivate : [AuthGuard] }
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
