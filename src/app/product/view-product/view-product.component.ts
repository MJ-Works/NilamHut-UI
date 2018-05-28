import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  public bigPicture = "assets/image/14358915_10207878050809041_5592658587766789579_n.jpg";
  constructor() { 
  }

  ngOnInit() {
    
  }
  onImageClick($event)
  {
    this.bigPicture = $event.srcElement.attributes.src.value;
  }

}
