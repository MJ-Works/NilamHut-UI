import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';
import { CommonService } from '../shared/services/common.service';
import { error } from 'util';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allCity: object = [];
  public allCategory: object = []
  public searchForm: FormGroup;

  public selectedId: string = "sdad:dasdad";
  public bidStatus: number;

  constructor(public dialog: MatDialog, public _commonService: CommonService) { }


  ngOnInit() {
    this.createForm()
    this.getAllCategory();
    this.getAllCity();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(BidDialogComponent, {
      width: '250px',
      data: { id: this.selectedId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The bid  closed');
      // this.bidStatus = result;
      // console.log(result);
    });
  }

  private getAllCity() {
    this._commonService.getAllCity().subscribe(
      data => {
        this.allCity = data;
        console.log('City success');
      },
      error => {
        console.log(error);
      }
    );
  }

  private getAllCategory() {
    this._commonService.getAllCategory().subscribe(
      data => {
        this.allCategory = data;
        console.log('Category Success');
      },
      error => {
        console.log(error);
      }
    );
  }

  private createForm() {
    this.searchForm = new FormGroup({
      city: new FormControl(),
      category: new FormControl(),
      searchName: new FormControl()
    });
  }

  public onSubmit()
  {
    console.log(this.searchForm.value);
  }

}
