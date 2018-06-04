import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag } from '../../shared/Models/SharedModels';
import { CommonService } from '../../shared/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  
  tagForm : FormGroup;
  tags : Tag[];
  public IsRequesting: boolean = false;

  constructor(private fb: FormBuilder, private _commonService : CommonService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllTag();
    this.createForm();
  }

  createForm()
  {
    this.tagForm = this.fb.group({
      TagName : ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]]
    });
  }

  getAllTag()
  {
    this.IsRequesting = true;
      this._commonService.getAllTag().subscribe( data => {
          this.tags = data;
          this.IsRequesting = false;
      },error => {
        this.toastr.error(error);
        this.IsRequesting = false;
      });
  }

  deleteButton(value)
  {
    this.IsRequesting = true;
    this._commonService.deleteFromTag(value).subscribe( data => {
        this.getAllTag();
        this.IsRequesting = false;
    },error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
  }

  submitTag()
  {
    this.IsRequesting = true;
    var tag = new Tag();
    tag.tagName = this.tagForm.controls.TagName.value;
    tag.tagDescription = "none";
    this._commonService.addTag(tag).subscribe( data => {
      this.getAllTag();
      this.IsRequesting = false;
    },error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
    this.tagForm.reset();
  }


}
