import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';
import { CommonService } from '../shared/services/common.service';
import { error } from 'util';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchContent, ProductHome } from '../shared/Models/Home';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../environments/environment';

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
  public lastBidID: string = null; //for global check
  public baseUrl;

  public selectedId: string = "sdad:dasdad";
  public bidStatus: number;

  public length = 0;
  public pageSize = 16;
  public pageSizeOptions = [8, 16, 24];
  public pageEvent: PageEvent;

  constructor(public dialog: MatDialog, public _commonService: CommonService) { }


  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.createForm()
    this.getAllCategory();
    this.getAllCity();
    this.searchContent = new SearchContent();
    this.getProducts(this.searchContent);
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
}
