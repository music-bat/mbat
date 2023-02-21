import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccessTokenResponse } from './types/AccessTokenResponse';
import * as Parse from 'parse'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  requestAuthorizationCode() {
    const url: URL = new URL('authorize', 'https://accounts.spotify.com/authorize');
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: environment.spotify.clientId,
      scope: ['user-read-private', 'user-library-read'].join(' '),
      redirect_uri: environment.spotify.redirectUri,
      // TODO: generate and verify state
      state: 'test',
    }).toString();
    console.log(url.toString());
    window.location.replace(url.toString());
  }

  requestAuthorizationToken(code): Promise<AccessTokenResponse> {
    return Parse.Cloud.run('requestToken', { code });
    // const url: URL = new URL(
    //   'authorize',
    //   'https://accounts.spotify.com/authorize'
    // );
    // url.search = new URLSearchParams({
    //   response_type: 'token',
    //   code,
    //   client_id: environment.spotify.clientId,
    //   scope: ['user-read-private', 'user-library-read'].join(' '),
    //   redirect_uri: environment.spotify.redirectUri,
    //   // TODO: generate and verify state
    //   state: 'test',
    // }).toString();
    // console.log(url.toString());
    // window.location.replace(url.toString());
  }
}
