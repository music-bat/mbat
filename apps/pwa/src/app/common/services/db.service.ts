import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Track } from 'spotify-api.js';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {}

  get importQuery(): Parse.Query{
    return new Parse.Query('Neo4jSyncJob');
  }

  importLib(accessToken): Promise<Track[]> {
    if (accessToken) {
      return Parse.Cloud.run('importPlaylist', { accessToken: accessToken });
    }
  }

}
