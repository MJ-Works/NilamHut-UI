import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../../bid-dialog/bid-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  public bigPicture = "";
  public zoomImage:boolean=false;
  public unZoomImage:boolean=true;
  public selectedId: string="sdad:dasdad";
  public bidStatus: number;
  public productId: string;
  public product: Product;
  public baseUrl: string;

  constructor(private dialog: MatDialog, private activeRoute: ActivatedRoute
              ,private _productService: ProductService) { 
  }

  ngOnInit() {
     this.baseUrl = environment.baseUrl;
     this.getProductId();
     this.getProductInfo();
  }

  getProductId()
  {
      this.activeRoute.params.subscribe(param=>{
        this.productId = param['id'];
    });
  }

  getProductInfo()
  {
      this.product = new Product(); 
      this._productService.getProduct(this.productId).subscribe( data=> {
      this.product = data;
      this.bigPicture = this.baseUrl+'/'+ this.product.image[0];

      for(var i = 0; i < this.product.image.length; i++)
        this.product.image[i] = this.baseUrl+'/'+ this.product.image[i];

      for(var i = 0; i < this.product.bids.length; i++)
      {
        var dat = new Date(this.product.bids[i].bidTime);
        this.product.bids[i].bidTime = dat.toLocaleDateString() + ' '+dat.toLocaleTimeString()
      }
      
      var date = new Date(this.product.startDateTime);
      this.product.startDateTime = date.toLocaleDateString() + ' '+date.toLocaleTimeString();

      date = new Date(this.product.endDateTime);
      this.product.endDateTime = date.toLocaleDateString() + ' '+date.toLocaleTimeString();

      console.log(data);
    }), error => {
      console.log(error);
    };
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
