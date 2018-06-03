import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPost, UserBid, UserInfo } from '../models/UserModels';
import { AccountService } from '../services/account.service';
import { error } from 'util';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private _accountService: AccountService) { }
  public UserId: string;
  public Posts: UserPost[];
  public Bids: UserBid[];
  public UserInfo: UserInfo;

  public IsRequesting: boolean = false;

  ngOnInit() {
    this.getuserId();
    this.GetUserInfo(this.UserId);
    this.GetUserBids(this.UserId);
    this.GetUserPosts(this.UserId);
  }

  private getuserId() {
    this.activeRoute.params.subscribe(param => {
      this.UserId = param['id'];
    });
  }

  private GetUserPosts(id: string) {
    this.IsRequesting = true;
    this._accountService.getUserPosts(id).subscribe(data => {
      this.Posts = data;
      this.IsRequesting = false;
      // console.log(data);
    }, error => {
      console.log(error);
      this.IsRequesting = false;
    });
  }

  private GetUserBids(id: string) {
    this.IsRequesting = true;
    this._accountService.getUserBids(id).subscribe(data => {
      this.Bids = data;
      this.IsRequesting = false;
      // console.log(data);
    }, error => {
      console.log(error);
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
      console.log(error);
      this.IsRequesting = false;
    })
  }

}

