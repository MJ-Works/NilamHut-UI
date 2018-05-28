import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public selectedId: string="sdad:dasdad";
  public bidStatus: number;

  constructor(public dialog: MatDialog) { }

  
  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(BidDialogComponent, {
      width: '250px',
      data: { id: this.selectedId}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The bid  closed');
      // this.bidStatus = result;
      // console.log(result);
    });
  }

}
