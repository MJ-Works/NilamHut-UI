import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Category, City } from '../../shared/Models/SharedModels';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  cityForm : FormGroup;
  cities : City[];

  constructor(private fb: FormBuilder, private _commonService : CommonService) { }

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
      this._commonService.getAllCity().subscribe( data => {
          this.cities = data;
      }),error => {
          console.log(error);
      };
  }



  deleteButton(value)
  {
    this._commonService.deleteFromCity(value).subscribe( data => {
        this.getAllCity();
    }),error => {
        console.log(error);
    };
  }

  submitCity()
  {
    var city = new City();
    city.cityName = this.cityForm.controls.CityName.value;
    this._commonService.addCity(city).subscribe( data => {
      this.getAllCity();
    }),error => {
        console.log(error);
    };
  }
}
