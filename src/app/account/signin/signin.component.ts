import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '../models/Login';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;
  public name: FormControl;
  public password: FormControl;
  public hide: boolean = true;
  public IsRequesting: boolean = false;
  login: Login;

  private CreateForm(): void {
    this.signinForm = new FormGroup({
      name: this.name,
      password: this.password,
    });
  }

  private CreateFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    ]);
  }

  constructor(private _accountService: AccountService, private route: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.CreateFormControls();
    this.CreateForm();
  }
  onSubmit() {
    this.IsRequesting = true;
    this.login = new Login();
    this.login.username = this.name.value;
    this.login.password = this.password.value;
    this._accountService.login(this.login).subscribe(data => {
      this._accountService.storeToken(data);
      //console.log(data);
      this.IsRequesting = false;
      this.route.navigate(['/']);
    }, error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
    //this.signinForm.reset();
  }
}

