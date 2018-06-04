import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../models/UserModels';
import { CommonService } from '../../shared/services/common.service';
import { AccountService } from '../services/account.service';
import { City } from '../../shared/Models/SharedModels';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  public IsRequesting: boolean = false;
  public UserInfo: UserInfo;
  public AllCity: City[];
  private UserId: string;
  public cityId: string= "";

  public FullName: FormControl;
  public City: FormControl;
  public Address: FormControl;
  public Phone: FormControl;
  public PostCode: FormControl;
  public ProfileForm: FormGroup;

  constructor(private _commonService: CommonService, private _accountService: AccountService) { }

  ngOnInit() {
    this.getUserId()
    this.cresteFormControl();
    this.CreateForm();
    this.getUserInfo(this.UserId);
    this.getAllCity();
  }

  private getUserId() {
    this.UserId = this._commonService.getUserId();
  }

  private getUserInfo(id: string) {
    this.IsRequesting = true;
    this._accountService.getUserInfo(id).subscribe(data => {
      this.UserInfo = data;
      this.cityId = data.cityId;
      console.log("UserInfo Success");
      this.IsRequesting = false;
    }, error => {
      console.log(error);
      this.IsRequesting = false;
    });
  }

  private getAllCity() {
    this.IsRequesting = true;
    this._commonService.getAllCity().subscribe(data => {
      this.AllCity = data;
      console.log("city Success");
      this.IsRequesting = false;
    }, error => {
      console.log(error);
      this.IsRequesting = false;
    });
  }

  private cresteFormControl() {
    this.FullName = new FormControl('', [
      Validators.required,
      Validators.maxLength(49)
    ]);
    this.City = new FormControl('', [
      Validators.required
    ]);
    this.Address = new FormControl('', [
      Validators.required,
      Validators.maxLength(499)
    ])
    this.Phone = new FormControl('', [
      Validators.required,
      Validators.maxLength(49)
    ]);
    this.PostCode = new FormControl('', [
      Validators.required,
      Validators.maxLength(19)
    ]);
  }

  private CreateForm() {
    this.ProfileForm = new FormGroup({
      FullName: this.FullName,
      City: this.City,
      PostCode: this.PostCode,
      Address: this.Address,
      Phone: this.Phone
    });
  }

  onSubmit(){
    console.log(this.ProfileForm.value);
  }
}
