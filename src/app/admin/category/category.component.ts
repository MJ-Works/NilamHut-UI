import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../shared/Models/SharedModels';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm : FormGroup;
  category : Category[];
  
  constructor(private fb: FormBuilder, private _commonService : CommonService) { }

  ngOnInit() {
    this.getAllCategory();
    this.createForm();
  }

  createForm()
  {
    this.categoryForm = this.fb.group({
      CategoryName : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]]
    });
  }

  getAllCategory()
  {
      this._commonService.getAllCategory().subscribe( data => {
          console.log(data);
          this.category = data;
      }),error => {
          console.log(error);
      };
  }



  deleteButton(value)
  {
    this._commonService.deleteFromCategory(value).subscribe( data => {
        this.getAllCategory();
    }),error => {
        console.log(error);
    };
  }

  submitCategory()
  {
    var category = new Category();
    category.categoryName = this.categoryForm.controls.CategoryName.value;
    this._commonService.addCategory(category).subscribe( data => {
      this.getAllCategory();
    }),error => {
        console.log(error);
    };
    this.categoryForm.reset();
  }

}
