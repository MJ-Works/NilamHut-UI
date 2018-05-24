import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  posts = [
    {
      name: 'Photos',
      Started: new Date('1/1/16'),
      Ended: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      Started: new Date('1/1/16'),
      Ended: new Date('1/1/16'),
    },
    {
      name: 'Work',
      Started: new Date('1/1/16'),
      Ended: new Date('1/1/16'),
    }
  ];

}

