import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../../bid-dialog/bid-dialog.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  public bigPicture = "assets/image/14358915_10207878050809041_5592658587766789579_n.jpg";
  public zoomImage:boolean=false;
  public unZoomImage:boolean=true;
  public selectedId: string="sdad:dasdad";
  public bidStatus: number;

  constructor(public dialog: MatDialog) { 
  }

  ngOnInit() {
    
  }
  onImageClick($event)
  {
    this.bigPicture = $event.srcElement.currentSrc;
  }

  zoom()
  {
    this.zoomImage=true;
    this.unZoomImage=false;
  }
  resetPage()
  {
    this.zoomImage=false;
    this.unZoomImage=true;
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(BidDialogComponent, {
      width: '250px',
      data: { id: this.selectedId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The bid  closed');
      this.bidStatus = result;
      console.log(result);
    });
  }
}
