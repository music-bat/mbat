import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule } from "@angular/router";
import { AuthService } from "./auth.service";

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
      {
        path: 'login',
        component: LoginPage,
        pathMatch: 'full',
      },
    ])
  ],
  declarations: [LoginPage],
  providers: [
    AuthService
  ]
})
export class AccountModule {}
