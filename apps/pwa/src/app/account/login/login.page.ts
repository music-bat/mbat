import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from '../../../environments/environment';
import * as Parse from 'parse';
import { AuthService } from '../auth.service';
import { AccessTokenResponse } from "../types/AccessTokenResponse";

@Component({
  selector: 'mbat-login',
  template: `
    <ion-content [fullscreen]="true">
      <div class="background"></div>
      <div class="content ion-justify-content-center ion-align-items-center">
        <div class="slogan">
          <img class="slogan-brush" src="/assets/img/slogan-brush.png" />
          <span>Findet die</span>
          <span>passende Musik</span>
          <span>für Euch</span>
        </div>
        <ion-button (click)="authorize()" expand="block" color="success">Login mit Spotify</ion-button>
      </div>
    </ion-content>
  `,
  styles: [
    `
      ion-button {
        margin: 40px 0;
        text-transform: none;
      }

      .content {
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
        right: 0;

        display: flex;
        flex-direction: column;
      }

      .background {
        background: var(--ion-background-color) url('/assets/img/login-background.jpg') no-repeat center center / cover;

        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
        right: 0;

        filter: blur(5px) brightness(0.7);
      }

      .slogan-brush {
        position: absolute;

        /* TODO: improve positioning */
        left: -11px;
        top: 17px;
        max-width: 100vw;
        z-index: 10;
      }

      .slogan {
        position: relative;

        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 60px;

        padding: 0 24px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;

        color: #f4f3f3;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }

      .slogan span {
        z-index: 50;
      }
    `,
  ],
})
@UntilDestroy()
export class LoginPage {
  #spotifyUser: { id: string; display_name: string };

  constructor(route: ActivatedRoute, private navCtl: NavController, private authService: AuthService) {
    if (Parse.User.current()) {
      navCtl.navigateRoot('/');
      return;
    }

    route.queryParams.subscribe(async (params) => {
      if (params.code) {
        const response = await this.authService.requestAuthorizationToken(params.code);
        return this.logIn(response);
      }
    });

  }

  async logIn(tokenResponse: AccessTokenResponse) {
    if (!tokenResponse) return;

    if (!this.#spotifyUser) {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      this.#spotifyUser = await response.json();
    }

    Parse.User.logInWith(
      'spotify',
      {
        authData: {
          id: this.#spotifyUser.id,
          ...tokenResponse
        },
      },
      {}
    )
      .then((user) => {
        user.setUsername(this.#spotifyUser.display_name);
        return user.save();
      })
      .then((user) => {
        return user.pin();
      })
      .then(() => this.navCtl.navigateRoot('/'))
      .catch(console.error);
  }

  authorize() {
    this.authService.requestAuthorizationCode();
  }
}
