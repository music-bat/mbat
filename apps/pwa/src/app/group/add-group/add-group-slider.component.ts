import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'mbat-add-group-slider',
  template: `
    <swiper #swiper [config]="config" [navigation]="true" [pagination]="{ clickable: true }">
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
  styles: [
    `
      /* Without setting height the slides will take up the height of the slide's content */
      ion-slides {
        height: 100%;
      }

      ion-slide {
        flex-direction: column;
        justify-content: space-between;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AddGroupSliderComponent {
  config: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  @ViewChild('swiper') swiper?: SwiperComponent;
}
