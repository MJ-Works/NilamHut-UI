import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Report} from '../models/Report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportForm: FormGroup;
 
  public IsRequesting: boolean = false;
  constructor(private fb: FormBuilder, private _commonService: CommonService,
              private route: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.reportForm = this.fb.group({
      ReportDescription: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

 

  onSubmit()
  {
    console.log("yes");
    this.IsRequesting = true;
    var report = new Report();
    report.ApplicationUserId = this._commonService.getUserId();
    report.ReportDescription = this.reportForm.controls.ReportDescription.value;
    this._commonService.addReport(report).subscribe( data => {
      this.route.navigate(['/']);
      this.toastr.success("Report Success");
      this.reportForm.reset();
      this.IsRequesting = false;
    },error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
    
  }

}
