import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage,
        pathMatch: 'full',
      },
    ])
  ],
  declarations: [LoginPage],
})
export class LoginModule {}
