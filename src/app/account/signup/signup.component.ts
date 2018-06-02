import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Register } from '../models/Register';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { Login } from '../models/Login';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public hide: boolean = true;
  public hide1: boolean = true;
  register : Register;
  login : Login;

  
  private CreateForm(): void {
    this.signupForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  private CreateFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);
    this.email = new FormControl('',[
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required
    ]);
  }

  constructor(private _accountService : AccountService,private route: Router) { }

  ngOnInit() {
    this.CreateFormControls();
    this.CreateForm();
  }

  onSubmit() {
     this.register = new Register();
     this.register.UserName = this.name.value;
     this.register.Email = this.email.value;
     this.register.Password = this.password.value;
     this.register.ConfirmPassword = this.confirmPassword.value;
    this._accountService.register(this.register).subscribe( data => {
        //if successfully registered login user
        this.login = new Login();
        this.login.username = this.register.UserName;
        this.login.password = this.register.Password;
        this._accountService.login(this.login).subscribe (val => {
            this.route.navigate(['/']);
        }),error => {
          console.log(error);
        };
    }),error => {
      console.log(error);
    };
    //this.signupForm.reset();
  }

}
