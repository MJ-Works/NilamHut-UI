import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _commonService: CommonService) { }

  ngOnInit() {
  }

  logOut()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

}
