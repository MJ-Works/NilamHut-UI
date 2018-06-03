import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Category, City, Tag } from '../../shared/Models/SharedModels';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/services/common.service';
import { ProductService } from '../services/product.service';
import { StartDateValidator } from '../../shared/Directives/StartDateValidator.directive';
import { EndDateValidator } from '../../shared/Directives/EndDateValidator.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  
  productForm: FormGroup;
  imageCount: number;
  tags: Tag[];
  cities: City[];
  categories: Category[];
  selectedFile : File[];
  public IsRequesting: boolean = false;

  constructor(private fb: FormBuilder, private _commonService:CommonService,
     private _productService: ProductService,private route: Router) { }

  ngOnInit() {
    this.imageCount = 0;
    this.getTags();
    this.getCity();
    this.getCategory();
    this.createForm();
  }

  createForm()
  {
      this.productForm = this.fb.group({
        StartDateTime : ['', [Validators.required,StartDateValidator('EndDateTime'),EndDateValidator('EndDateTime')]],
        EndDateTime : ['', [Validators.required,EndDateValidator('StartDateTime')]],
        ProductName : ['', [Validators.required,Validators.maxLength(50)]],
        ProductDescription : ['', [Validators.required,Validators.maxLength(1000)]],
        Quantity : ['', [Validators.required,Validators.min(1),Validators.max(100000),Validators.pattern('^[0-9]*$')]],
        BasePrice : ['', [Validators.required,Validators.min(1),Validators.max(10000000),Validators.pattern('^[0-9]*.[0-9]*?$')]],
        ContactInfo : ['', [Validators.required,Validators.maxLength(1000)]],
        CategoryId : ['', [Validators.required]],
        CityId : ['', [Validators.required]],
        Image : ['', [Validators.required]],
        Tags : ['', [Validators.required]]
      });
  }

  getTags()
  {
    this.IsRequesting = true;
    this._commonService.getAllTag().subscribe( data => {
      this.tags = data;
      this.IsRequesting = false;
    }), error => {
      console.log(error);
      this.IsRequesting = false;
    };
  }

  getCity()
  {
    this.IsRequesting = true;
      this._commonService.getAllCity().subscribe( data => {
          this.cities = data;
          this.IsRequesting = false;
      }), error => {
        console.log(error);
        this.IsRequesting = false;
      };
  }

  getCategory()
  {
    this.IsRequesting = true;
    this._commonService.getAllCategory().subscribe( data => {
      this.categories = data;
      this.IsRequesting = false;
    }), error => {
      console.log(error);
      this.IsRequesting = false;
    };
  }

  onFileSelected($event)
  {
      if($event.target.files.length > 4)
      {
        this.imageCount = $event.target.files.length;
        this.productForm.controls.Image.setErrors({'imageExceed' : true});
      }
      else 
      {
        this.selectedFile = $event.target.files;
        this.imageCount = this.selectedFile.length;
      }
      console.log(this.selectedFile);
  }
  
  onSubmit()
  { 
      this.IsRequesting = true;
      var applicationUserId = this._commonService.getUserId();

      var startDate = new Date(this.productForm.controls.StartDateTime.value);
      var endDate = new Date(this.productForm.controls.EndDateTime.value);

      const fd = new FormData();
      fd.append('ApplicationUserId', applicationUserId);
      fd.append('StartDateTime',startDate.toISOString());
      fd.append('EndDateTime',endDate.toISOString());
      fd.append('ProductName',this.productForm.controls.ProductName.value);
      fd.append('ProductDescription',this.productForm.controls.ProductDescription.value);
      fd.append('Quantity',this.productForm.controls.Quantity.value);
      fd.append('BasePrice',this.productForm.controls.BasePrice.value);
      fd.append('ContactInfo',this.productForm.controls.ContactInfo.value);
      fd.append('CategoryId',this.productForm.controls.CategoryId.value);
      fd.append('CityId',this.productForm.controls.CityId.value);

      for(let tag of this.productForm.controls.Tags.value)
      {
        fd.append('Tags', tag);
      }
      
      for(var img of this.selectedFile)
      {
        fd.append('Image',img, img.name);
      }

      this._productService.addProduct(fd).subscribe( data=> {
          console.log("success!!!");
          this.IsRequesting = false;
          this.route.navigate(['/']);

      }), error => {
        console.log(error);
        this.IsRequesting = false;
      };
  }

}
