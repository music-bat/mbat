import { Component } from '@angular/core';
import * as Parse from 'parse'
import { NavController } from "@ionic/angular";

@Component({
  selector: 'mbat-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private navCtrl: NavController) {}

  async logOut(){
    await Parse.User.logOut()
    await this.navCtrl.navigateRoot('/account/login')
  }
}
