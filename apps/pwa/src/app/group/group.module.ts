import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGroupPage } from './add-group/add-group.page';
import { GroupRoutingModule } from './group-routing.module';
import { ComponentsModule } from '../components/components.module';
import { AddGroupSliderComponent } from './add-group/add-group-slider.component';
import { AddGroupPage01Component } from './add-group/add-group-page-01.component';
import { AddGroupPage02Component } from './add-group/add-group-page-02.component';
import { SwiperModule } from "swiper/angular";
import { AddGroupPage03Component } from "./add-group/add-group-page-03.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  declarations: [
    AddGroupSliderComponent,
    AddGroupPage,
    AddGroupPage01Component,
    AddGroupPage02Component,
    AddGroupPage03Component,
  ],
})
export class GroupModule {}
