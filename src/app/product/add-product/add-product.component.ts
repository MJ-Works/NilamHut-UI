import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Tag } from '../models/Tag';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  
  productForm: FormGroup;
  tags: string[];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.getTags();
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
        CountryId : ['', [Validators.required]],
        CityId : ['', [Validators.required]],
        Image : ['', [Validators.required]],
        Tags : ['', [Validators.required]]
      });
  }
  getTags()
  {
    this.tags = new Array();
    this.tags.push("asdf");
    this.tags.push("asdfasdfa");
    this.tags.push("axvcsdfgsd");
  }
  onFileSelected($event)
  {
    console.log("yes");
      console.log(this.productForm.controls.StartDateTime.value);
  }

}
