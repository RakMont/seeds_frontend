import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-title-banner',
  templateUrl: './title-banner.component.html',
  styleUrls: ['./title-banner.component.scss']
})
export class TitleBannerComponent {
  @Input() title;
  @Input() hasTranslate;
}
