import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../shared/Models/SharedModels';
import { CommonService } from '../../shared/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm : FormGroup;
  category : Category[];
  public IsRequesting: boolean = false;
  
  constructor(private fb: FormBuilder, private _commonService : CommonService,
              private toastr: ToastrService) { }

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
      this.IsRequesting = true;
      this._commonService.getAllCategory().subscribe( data => {
          this.category = data;
          this.IsRequesting = false;
      },error => {
        this.toastr.error(error);
        this.IsRequesting = false;
      });
  }



  deleteButton(value)
  {
    this.IsRequesting = true;
    this._commonService.deleteFromCategory(value).subscribe( data => {
        this.getAllCategory();
        this.IsRequesting = false;
    },error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
  }

  submitCategory()
  {
    this.IsRequesting = true;
    var category = new Category();
    category.categoryName = this.categoryForm.controls.CategoryName.value;
    this._commonService.addCategory(category).subscribe( data => {
      this.getAllCategory();
      this.IsRequesting = false;
    },error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
    this.categoryForm.reset();
  }

}
