import { Component, OnInit } from '@angular/core';
import { UserInfo, UserData } from '../models/UserModels';
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
  private UserData: UserData;
  public cityId: string = "";

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

  onSubmit() {
    if (this.ProfileForm.valid) {
      this.IsRequesting = true;

      this.UserData = new UserData();
      this.UserData.ApplicationUserId = this.UserId;
      this.UserData.FullName = this.FullName.value;
      this.UserData.CityId = this.City.value;
      this.UserData.Phone = this.Phone.value;
      this.UserData.Address = this.Address.value;
      this.UserData.PostCode = this.PostCode.value;

      this._accountService.updateProfileInfo(this.UserData).subscribe(data => {
        console.log(data);
        this.IsRequesting = false;
        this.getUserInfo(this.UserId);
      }, error => {
        console.log(error);
        this.IsRequesting = false;
      });
    }

  }
}
