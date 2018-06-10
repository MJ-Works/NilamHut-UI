import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';
import { CommonService } from '../shared/services/common.service';
import { error } from 'util';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchContent, ProductHome } from '../shared/Models/Home';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NewBid } from '../shared/Models/SharedModels';
import { ThrowStmt } from '@angular/compiler';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Bid } from '../product/models/Bid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allCity: object = [];
  public allCategory: object = []
  public searchForm: FormGroup;
  private searchContent: SearchContent;// for search value
  public AllProducts: ProductHome[] = [];
  public PageProducts: ProductHome[] = [];
  public NewBid: NewBid;
  public baseUrl;
  public IsRequesting: boolean = false;

  public lastBidID: string = null; //for global check
  private selectedId: string = null;
  private currentPrice: number;

  private _hubConnection: HubConnection;

  public length = 0;
  public pageSize = 16;
  public pageSizeOptions = [8, 16, 24];

  constructor(public dialog: MatDialog, public _commonService: CommonService, public router: Router, private toastr: ToastrService) { }


  ngOnInit() {
    this.baseUrl = environment.baseUrl;

    this.createForm()
    this.getAllCategory();
    this.getAllCity();
    this.searchContent = new SearchContent();
    this.NewBid = new NewBid();
    this.getProducts(this.searchContent);
    this.makeHubConnection();

  }

  openDialog(id: string, min_price: number): void {
    this.selectedId = id;
    this.currentPrice = min_price;
    let dialogRef = this.dialog.open(BidDialogComponent, {
      width: '250px',
      data: { price: min_price }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result && result > this.currentPrice) {
        this.IsRequesting = true;
        if (this._commonService.isAuthenticated()) {
          console.log(this._commonService.getUserId());
          this.TryBid(result, this.selectedId, this._commonService.getUserId());
          this.IsRequesting = false;
        } else {
          this.IsRequesting = false;
          this.router.navigate(['/signin']);
        }
      }else if(result){
        this.toastr.warning('Your bid must be grater than current bid.');
      }
    });
  }

  private getAllCity() {
    this.IsRequesting = true;
    this._commonService.getAllCity().subscribe(
      data => {
        this.allCity = data;
        this.IsRequesting = false;
        // console.log('City success');
      },
      error => {
        this.IsRequesting = false;
        this.toastr.error(error);
      }
    );
  }

  private getAllCategory() {
    this.IsRequesting = true;
    this._commonService.getAllCategory().subscribe(
      data => {
        this.allCategory = data;
        // console.log('Category Success');
        this.IsRequesting = false;
      },
      error => {
        this.IsRequesting = false;
        this.toastr.error(error);
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

  public onSubmit() {
    if (this.searchForm.value.city || this.searchForm.value.category || this.searchForm.value.searchName) {
      this.searchContent = new SearchContent();

      this.searchContent.Category = this.searchForm.value.category;
      this.searchContent.City = this.searchForm.value.city;
      this.searchContent.searchName = this.searchForm.value.searchName;

      console.log(this.searchContent);
      this.getProducts(this.searchContent);
    }
  }

  private getProducts(model: SearchContent) {
    this.IsRequesting = true;
    this._commonService.getAllProducts(model).subscribe(
      data => {
        console.log("All Products received");
        this.AllProducts = data;
        this.length = this.AllProducts.length;
        this.IsRequesting = false;
        this.makeSlice(0, this.pageSize, this.length);
      },
      error => {
        this.toastr.error(error);
        this.IsRequesting = false;
      }
    );
  }

  private TryBid(Price: number, productId: string, userId: string) {
    this.NewBid.BidPrice = Price;
    this.NewBid.ProductId = productId;
    this.NewBid.ApplicationUserId = userId;
    var d = new Date();
    this.NewBid.BidTime = d.toISOString();

    console.log(this.NewBid);
    this.IsRequesting = true;
    this._commonService.makeNewBid(this.NewBid).subscribe(
      data => {
        console.log('Bid Success');
        // console.log(data);
        this.IsRequesting = false;
      },
      error => {
        this.toastr.error(error);
        this.IsRequesting = false;
      }
    );
  }

  private makeHubConnection() {
    this._hubConnection = new HubConnectionBuilder().withUrl(`${this.baseUrl}/updateBidList`).build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection establish!'))
      .catch(err => {
        this.toastr.error('canont connect to server.');
        console.log(err);
      });

    this._hubConnection.on('SendMessageToProductView', (bid: Bid) => {

      var i = this.AllProducts.findIndex(x => x.productId == bid.productId)
      if (i >= 0) {
        this.AllProducts[i].bidPrice = bid.bidPrice;
        this.AllProducts[i].bidderName = bid.userName;
      }

      var i = this.PageProducts.findIndex(x => x.productId == bid.productId)
      if (i >= 0) {
        this.PageProducts[i].bidPrice = bid.bidPrice;
        this.PageProducts[i].bidderName = bid.userName;
      }

    });
  }

  public IsAuctionEnd(end: string): boolean {
    var date1 = new Date(end);
    var date2 = new Date();
    if (date1 < date2) return true;
    return false;
  }

  public IsAuctionStart(start: string) {
    var date1 = new Date(start);
    var date2 = new Date();
    if (date1 > date2) return true;
    return false;
  }
  public pageChangeEvent(pageEvent: PageEvent) {
    this.makeSlice(pageEvent.pageIndex, pageEvent.pageSize, pageEvent.length);
  }

  private makeSlice(index: number, pageSize: number, length: number) {
    this.IsRequesting = true;
    var start = index * pageSize;
    var end = start + pageSize;
    this.PageProducts = this.AllProducts.slice(start, end);
    this.IsRequesting = false;
    // console.log(this.PageProducts);
  }
}
