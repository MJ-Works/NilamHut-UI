import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Register } from '../models/Register';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';


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
      Validators.maxLength(100)
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

    //console.log("Ok Boss");
    console.log(this.signupForm);

     this.register = new Register();
     this.register.UserName = this.name.value;
     this.register.Email = this.email.value;
     this.register.Password = this.password.value;
     this.register.ConfirmPassword = this.confirmPassword.value;
    this._accountService.register(this.register).subscribe( data => {
        console.log("suceed");
        this.route.navigate(['/']);
    }),error => {
      console.log(error);
    };
     
  }

}
