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
  public NewBid: NewBid;
  public baseUrl;

  public lastBidID: string = null; //for global check
  private selectedId: string = null;
  private currentPrice: number;

  private _hubConnection: HubConnection;

  public length = 0;
  public pageSize = 16;
  public pageSizeOptions = [8, 16, 24];
  public pageEvent: PageEvent;
  
  constructor(public dialog: MatDialog, public _commonService: CommonService, public router: Router) { }


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
        if (this._commonService.isAuthenticated()) {
          console.log(this._commonService.getUserId());
          this.TryBid(result, this.selectedId, this._commonService.getUserId());
        } else {
          this.router.navigate(['/signin']);
        }
      }
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

  public onSubmit() {
    if (this.searchForm.value.city || this.searchForm.value.category || this.searchForm.value.searchName) {
      this.searchContent = new SearchContent();

      this.searchContent.Category = this.searchForm.value.category;
      this.searchContent.City = this.searchForm.value.city;
      this.searchContent.searchName = this.searchForm.value.searchName;

      console.log(this.searchContent);
      // this.searchForm.reset();
    }
  }

  private getProducts(model: SearchContent) {
    this._commonService.getAllProducts(model).subscribe(
      data => {
        console.log("All Products received");
        this.AllProducts = data;
        this.length = this.AllProducts.length;
        console.log(this.AllProducts);
      },
      error => {
        console.log(error);
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

    this._commonService.makeNewBid(this.NewBid).subscribe(
      data => {
        console.log('Bid Success');
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  private makeHubConnection() {
    this._hubConnection = new HubConnectionBuilder().withUrl(`${this.baseUrl}/updateBidList`).build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection establish!'))
      .catch(err => {
        console.log("Can't connect.");
        console.log(err);
      });
  }

  public IsAuctionRunning(date: string): boolean{
    var date1 = new Date(date);
    var date2 = new Date();
    if(date1> date2) return true
    return false;
  }
}
