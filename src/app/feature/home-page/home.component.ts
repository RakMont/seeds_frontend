import { Component } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  items = [
    { img: 'https://picsum.photos/900/500?random=1' },
    { img: 'https://picsum.photos/900/500?random=2' },
    { img: 'https://picsum.photos/900/500?random=3' },
    { img: 'https://picsum.photos/900/500?random=4' },
    { img: 'https://picsum.photos/900/500?random=5' },
    { img: 'https://picsum.photos/900/500?random=6' },
  ];
}
