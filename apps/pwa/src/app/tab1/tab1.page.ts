import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import * as Parse from 'parse';
import { DbService } from '../common/services/db.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Track } from 'spotify-api.js';

type MbatTrack = Pick<Track, 'id' | 'uri' | 'name' | 'duration' | 'popularity' | 'previewURL' | 'explicit'> & {
  image: string;
  artists: string;
  genres: string;
} & { likes: number };

@UntilDestroy({
  arrayName: 'subcriptions',
})
@Component({
  selector: 'mbat-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page {
  #accessToken: string;
  isImportRunning: boolean;
  loading: boolean;
  isLibraryImported = false;

  tracks: Array<MbatTrack> = [];

  get username(): string {
    return Parse.User.current().getUsername();
  }

  constructor(public db: DbService, private cdr: ChangeDetectorRef) {
    this.loading = true;
    const user = Parse.User.current();

    user
      .fetch()
      .then(async (user) => {
        this.loading = false;
        this.#accessToken = user.get('spotifyToken');
        this.isLibraryImported = !!user.get('lastLibraryImport');
        console.log(user.get('lastLibraryImport'));
        this.cdr.markForCheck();

        const job = await this.db.importQuery.first();
        if (job) {
          console.log('job', job);
          this.isImportRunning = true;
        }

        const group = await user.relation('groups').query().first();
        if (!this.isImportRunning) {
          Parse.Cloud.run('fetchGroupPlaylist' , { groupId: group.id }).then((response) => {
            this.tracks = [...response.map(el => ({...el.track.properties, likes: el.likes}))]
            this.cdr.markForCheck()
            console.log(this.tracks)
          });
          
        }
      })
      .catch(() => {
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  async startLibraryImport() {
    this.isImportRunning = true;
    const authData = Parse.User.current().get('authData');
    const accessToken = authData.spotify.access_token;
    if (!accessToken) {
      return;
    }
    try {
      await this.db.importLib(accessToken);
    } catch (err) {
      await Parse.User.logOut();
    }
  }

  fetchNewPage(e) {
    console.log('fetch new page', e);
  }

  trackById(index: number, track: MbatTrack) {
    return track.id;
  }

}
