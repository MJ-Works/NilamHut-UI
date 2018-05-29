import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

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
