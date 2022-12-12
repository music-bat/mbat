import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'mbat-add-group-slider',
  template: `
    <swiper #swiper [slidesPerView]="1" [spaceBetween]="50" [navigation]="true" [pagination]="{ clickable: true }">
      <ng-template swiperSlide>
        <ng-content select=".slide1"></ng-content>
      </ng-template>
      <ng-template swiperSlide>
        <ng-content select=".slide2"></ng-content>
      </ng-template>
      <ng-template swiperSlide>
        <ng-content select=".slide3"></ng-content>
      </ng-template>
    </swiper>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AddGroupSliderComponent {
  @ViewChild('swiper') swiper?: SwiperComponent;
}
