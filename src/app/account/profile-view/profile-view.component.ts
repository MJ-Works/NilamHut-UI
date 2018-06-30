import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPost, UserBid, UserInfo } from '../models/UserModels';
import { AccountService } from '../services/account.service';
import { error } from 'util';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Wins } from '../models/Wins';
import { CommonService } from '../../shared/services/common.service';
import { Rating } from '../models/Rating';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private _accountService: AccountService, private toastr: ToastrService, private _commonService: CommonService) { }
  public UserId: string;
  public Posts: UserPost[];
  public Bids: UserBid[];
  public UserInfo: UserInfo;
  public baseUrl: string
  public won: Wins[];
  public sold: Wins[];
  public rate: number = 3;
  public rateToggle: boolean = false;
  public formRating: number;
  public loggedInUser: string;
  public rating: Rating;

  public IsRequesting: boolean = false;

  ngOnInit() {
    this.baseUrl = environment.baseUrl;

    this.getuserId();
    this.getLoggedUser();
    console.log(this.UserId);
    this.GetUserInfo(this.UserId);
    this.GetUserBids(this.UserId);
    this.GetUserPosts(this.UserId);
    this.GetUserWins(this.UserId);
    this.GetUserSold(this.UserId);
  }

  private getuserId() {
    this.activeRoute.params.subscribe(param => {
      this.UserId = param['id'];
    });
  }

  private getLoggedUser() {
    this.loggedInUser = this._commonService.getUserId();
  }

  private GetUserPosts(id: string) {
    this.IsRequesting = true;
    this._accountService.getUserPosts(id).subscribe(data => {
      this.Posts = data;
      this.IsRequesting = false;
      // console.log(data);
    }, error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
  }

  public rateChange() {
    this.rateToggle = !this.rateToggle;
  }

  public onSubmit() {
    if (this.UserId == this.loggedInUser) {
      this.toastr.warning("You Can't rate yourself");
    } else if (this.formRating > 0) {
      this.rating = new Rating();
      this.rating.UserId = this.loggedInUser;
      this.rating.TargetUser = this.UserId;
      this.rating.Rating = this.formRating;
      this.IsRequesting = true;
      this._accountService.updateRating(this.rating).subscribe(data => {
        this.toastr.success("Rating Updated");
        this.IsRequesting = false;
      }, error => {
        this.toastr.error(error);
        this.IsRequesting = true;
      });

      this.toastr.success("Implemet" + this.formRating);
    } else {
      this.toastr.warning("Enter a Non Zero Rating");
    }
  }
  private GetUserBids(id: string) {
    this.IsRequesting = true;
    this._accountService.getUserBids(id).subscribe(data => {
      this.Bids = data;
      this.IsRequesting = false;
      // console.log(data);
    }, error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    });
  }

  private GetUserInfo(id: string) {
    this.IsRequesting = true;
    this._accountService.getUserInfo(id).subscribe(data => {
      this.UserInfo = data;
      this.IsRequesting = false;
      // console.log(data)
    }, error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    })
  }

  private GetUserWins(id: string) {
    this.IsRequesting = true;
    this._accountService.GetUserWins(id).subscribe(data => {
      this.won = data;
      this.IsRequesting = false;
      // console.log(data)
    }, error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    })
  }

  private GetUserSold(id: string) {
    this.IsRequesting = true;
    this._accountService.GetUserSold(id).subscribe(data => {
      this.sold = data;
      this.IsRequesting = false;
      // console.log(data)
    }, error => {
      this.toastr.error(error);
      this.IsRequesting = false;
    })
  }

}

