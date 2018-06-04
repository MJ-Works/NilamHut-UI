import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Category, City } from '../../shared/Models/SharedModels';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  cityForm : FormGroup;
  cities : City[];
  public IsRequesting: boolean = false;

  constructor(private fb: FormBuilder, private _commonService : CommonService,
              private toastr: ToastrService) { }

  ngOnInit() {
      this.getAllCity();
      this.createForm();
  }

  createForm()
  {
    this.cityForm = this.fb.group({
      CityName : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]]
    });
  }

  getAllCity()
  {
    this.IsRequesting = true;
      this._commonService.getAllCity().subscribe( data => {
          this.cities = data;
          this.IsRequesting = false;
      },error => {
          this.toastr.error(error);
          this.IsRequesting = false;
      });
  }



  deleteButton(value)
  {
    this.IsRequesting = true;
    this._commonService.deleteFromCity(value).subscribe( data => {
        this.getAllCity();
        this.IsRequesting = false;
    },error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
  }

  submitCity()
  {
    this.IsRequesting = true;
    var city = new City();
    city.cityName = this.cityForm.controls.CityName.value;
    this._commonService.addCity(city).subscribe( data => {
      this.getAllCity();
      this.IsRequesting = false;
    },error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
  }
}
