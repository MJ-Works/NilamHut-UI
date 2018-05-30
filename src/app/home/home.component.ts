import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public selectedId: string = "sdad:dasdad";
  public bidStatus: number;

  constructor(public dialog: MatDialog, public _commonService: CommonService) { }


  ngOnInit() {
    this._commonService.getAllCategory().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

    this._commonService.getAllCity().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
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

}
