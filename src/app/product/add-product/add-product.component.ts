import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Category, City, Tag } from '../../shared/Models/SharedModels';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  
  productForm: FormGroup;
  tags: Tag[];
  cities: City[];
  categories: Category[];
  constructor(private fb: FormBuilder, private _commonService:CommonService) { }

  ngOnInit() {
    this.getTags();
    this.getCity();
    this.getCategory();
    this.createForm();
  }

  createForm()
  {
      this.productForm = this.fb.group({
        StartDateTime : ['', [Validators.required]],
        EndDateTime : ['', [Validators.required]],
        ProductName : ['', [Validators.required,Validators.maxLength(50)]],
        ProductDescription : ['', [Validators.required,Validators.maxLength(1000)]],
        Quantity : ['', [Validators.required,Validators.min(1),Validators.max(100000)]],
        BasePrice : ['', [Validators.required,Validators.min(1),Validators.max(10000000)]],
        ContactInfo : ['', [Validators.required,Validators.maxLength(1000)]],
        CategoryId : ['', [Validators.required]],
        CityId : ['', [Validators.required]],
        Image : ['', [Validators.required]],
        Tags : ['', [Validators.required]]
      });
  }
  getTags()
  {
    this._commonService.getAllTag().subscribe( data => {
      this.tags = data;
    }), error => {
      console.log(error);
    };
  }
  getCity()
  {
      this._commonService.getAllCity().subscribe( data => {
          this.cities = data;
      }), error => {
        console.log(error);
      };
  }
  getCategory()
  {
    this._commonService.getAllCategory().subscribe( data => {
      this.categories = data;
    }), error => {
      console.log(error);
    };
  }
  onFileSelected($event)
  {
    console.log("yes");
      console.log(this.productForm.controls.value);
  }

  onSubmit()
  {
    console.log(this.productForm.controls);
  }

}
