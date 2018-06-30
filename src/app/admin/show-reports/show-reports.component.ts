import { Component, OnInit } from '@angular/core';
import { Report } from '../../account/models/Report';
import { CommonService } from '../../shared/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-reports',
  templateUrl: './show-reports.component.html',
  styleUrls: ['./show-reports.component.css']
})
export class ShowReportsComponent implements OnInit {
  reports:Report[];
  public IsRequesting: boolean = false;
  constructor(private _commonService: CommonService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllReport();
  }

  getAllReport()
  {
    this.IsRequesting = true;
      this._commonService.getAllReport().subscribe( data => {
          this.reports = data;
          console.log(this.reports);
          this.IsRequesting = false;
      },error => {
        this.toastr.error(error);
        this.IsRequesting = false;
      });
  }

  deleteButton(report)
  {
    this.IsRequesting = true;
    this._commonService.deleteFromReport(report).subscribe( data => {
        this.getAllReport();
        this.IsRequesting = false;
    },error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
  }

}
