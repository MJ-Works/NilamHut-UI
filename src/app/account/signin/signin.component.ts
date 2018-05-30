import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;
  public name: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  public hide: boolean = true;
  public hide1: boolean = true;

  private CreateForm(): void {
    this.signinForm = new FormGroup({
      name: this.name,
      password: this.password
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
    this.confirmPassword = new FormControl('', [
      Validators.required
    ]);
  }

  constructor() { }

  ngOnInit() {
    this.CreateFormControls();
    this.CreateForm();
  }
  onSubmit() {
    console.log("Ok Boss");
    console.log(this.signinForm.value);
  }

}
