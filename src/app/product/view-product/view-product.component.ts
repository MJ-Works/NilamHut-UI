import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../../bid-dialog/bid-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { environment } from '../../../environments/environment';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@aspnet/signalr';
import { Bid } from '../models/Bid';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  private _hubConnection: HubConnection;
  public bigPicture = "";
  public zoomImage:boolean=false;
  public unZoomImage:boolean=true;
  public selectedId: string="sdad:dasdad";
  public bidStatus: number;
  public productId: string;
  public product: Product;
  public baseUrl: string;
  public currentTopBid: Bid;
  public top10Bids: Bid[];

  constructor(private dialog: MatDialog, private activeRoute: ActivatedRoute
              ,private _productService: ProductService) { 
  }

  ngOnInit() {
   
     this.baseUrl = environment.baseUrl;
     this.currentTopBid = new Bid();
      this.top10Bids = new Array<Bid>(10);
      this.product = new Product(); 
     this.getProductId();
     this.getProductInfo();
     this.connectToHub();
  }

  getProductId()
  {
      this.activeRoute.params.subscribe(param=>{
        this.productId = param['id'];
    });
  }

  getProductInfo()
  {
      this._productService.getProduct(this.productId).subscribe( data=> {
      this.product = data;
      this.bigPicture = this.baseUrl+'/'+ this.product.image[0];

      this.top10Bids = this.product.bids;
      
      //sort
      this.top10Bids.sort((a:Bid,b:Bid) => {
        if(a.bidPrice >= b.bidPrice)
            return -1;
          return 1;
      });

      //the first one is the highest bidder
      this.currentTopBid = this.product.bids[0];

      for(var i = 0; i < this.product.image.length; i++)
        this.product.image[i] = this.convertToImageLink(this.product.image[i]);

      for(var i = 0; i < this.top10Bids.length; i++)
      {
        if(this.top10Bids[i].bidTime != null)
          this.top10Bids[i].bidTime = this.convertToViewAbleDate(this.top10Bids[i].bidTime);
        
        if(this.top10Bids[i].userImage != null)
          this.top10Bids[i].userImage = this.convertToImageLink(this.top10Bids[i].userImage);
      }
      
      this.product.startDateTime = this.convertToViewAbleDate(this.product.startDateTime);

      this.product.endDateTime = this.convertToViewAbleDate(this.product.endDateTime);

      //console.log(data);
    }), error => {
      console.log(error);
    };
  }

  convertToViewAbleDate(dateTime : string)
  {
      var dat = new Date(dateTime);
      return  dat.toLocaleDateString() + ' '+dat.toLocaleTimeString();
  }

  convertToImageLink(imageName:string)
  {
    return this.baseUrl+'/'+ imageName;
  }

  connectToHub()
  {
    this._hubConnection = new HubConnectionBuilder().withUrl(`${this.baseUrl}/updateBidList`).build();
     this._hubConnection
       .start()
       .then(() => console.log('Connection started!'))
       .catch(err => console.log('Error while establishing connection :('));
 
       this._hubConnection.on('SendMessageToProductView', (bid:Bid) => {
        
        bid.bidTime = this.convertToViewAbleDate(bid.bidTime);
        bid.userImage = this.convertToImageLink(bid.userImage);

          if(bid.productId != this.productId)
              return;
          //console.log(bid.userImage);

          //update current top bid
          console.log(this.currentTopBid);
          
          //if already exists in top 10 just rearrange
          for(var i = 0; i < this.top10Bids.length; i++)
          {
              if(this.top10Bids[i].userId == bid.userId)
              {
                this.top10Bids[i].bidPrice = bid.bidPrice;
                this.top10Bids[i].bidTime = bid.bidTime;

                this.top10Bids.sort((a:Bid,b:Bid) => {
                    if(a.bidPrice >= b.bidPrice)
                      return -1;
                    return 1;
                });

                this.currentTopBid = this.product.bids[0];
                return;
              }
          }
          
          //if does not already exists add to to array and sort
          var index = 0;
          if(this.top10Bids.length >= 10) index = 10;
          else index = this.top10Bids.length+1;

          for(var i = 1; i < index; i++)
          this.top10Bids[i] = this.top10Bids[i-1];
          
          
          this.top10Bids[0] = bid;

          this.top10Bids.sort((a:Bid,b:Bid) => {
              if(a.bidPrice >= b.bidPrice)
                return -1;
              return 1;
          });

          this.currentTopBid = this.product.bids[0];

       });
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
