import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from "../../environments/environment";

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
        <ion-button (click)="authorize()" expand="block" color="success"
          >Login mit Spotify
        </ion-button>
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
        background: var(--ion-background-color)
          url('/assets/img/login-background.jpg') no-repeat center center /
          cover;

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

  constructor(route: ActivatedRoute, private navCtl: NavController) {
    if (Parse.User.current()) {
      navCtl.navigateRoot('/');
    } else {
      route.fragment
        .pipe(untilDestroyed(this))
        .subscribe((fragment) =>
          this.logIn(new URLSearchParams(fragment).get('access_token'))
        );
    }
  }

  async logIn(token: string) {
    if (!token) return;

    if (!this.#spotifyUser) {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.#spotifyUser = await response.json();
    }

    Parse.User.logInWith(
      'spotify',
      {
        authData: {
          id: this.#spotifyUser.id,
          access_token: token,
        },
      },
      {}
    )
      .then((user) => {
        user.setUsername(this.#spotifyUser.display_name);
        return user.save();
      })
      .then(() => this.navCtl.navigateRoot('/'))
      .catch(console.error);
  }

  authorize() {
    const url: URL = new URL(
      'authorize',
      'https://accounts.spotify.com/authorize'
    );
    url.search = new URLSearchParams({
      response_type: 'token',
      client_id: environment.spotify.clientId,
      scope: ['user-read-private'].join(' '),
      redirect_uri: 'http://localhost:4200/login',
      // TODO: generate and verify state
      state: 'test',
    }).toString();

    window.location.replace(url.toString());
  }
}
